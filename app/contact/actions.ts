"use server";

import { headers, cookies } from "next/headers";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";
import {
  escapeHtml,
  sanitizeText,
  sanitizeEmail,
  sanitizeName,
  sanitizeTextField,
  isValidEmail,
  validateAllowedValue,
} from "@/lib/sanitize";

const resend = new Resend(process.env.RESEND_API_KEY);

// Session cookie name for rate limiting
const SESSION_COOKIE_NAME = "lokisoft_session";

// Allowed project types
const ALLOWED_PROJECT_TYPES = [
  "",
  "web-development",
  "app-development",
  "mobile-app",
  "ecommerce",
  "custom-software",
  "consultation",
  "other",
] as const;

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  projectType: string;
  message: string;
  turnstileToken?: string;
}

export interface ContactFormResult {
  success: boolean;
  error?: string;
  rateLimited?: boolean;
  retryAfter?: number;
}

/**
 * Get or create a session ID for rate limiting
 */
async function getOrCreateSessionId(): Promise<string> {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId) {
    // Generate a new session ID
    sessionId = crypto.randomUUID();
    cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
  }

  return sessionId;
}

/**
 * Get client IP from request headers
 */
async function getClientIp(): Promise<string | null> {
  const headersList = await headers();

  // Check common proxy headers in order of preference
  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, get the first one (original client)
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = headersList.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  const cfConnectingIp = headersList.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  return null;
}

export async function submitContactForm(
  formData: ContactFormData
): Promise<ContactFormResult> {
  // Get client identifiers for rate limiting
  const [clientIp, sessionId] = await Promise.all([
    getClientIp(),
    getOrCreateSessionId(),
  ]);

  // Check rate limit FIRST before any processing
  const rateLimitResult = checkRateLimit(clientIp, sessionId);
  if (!rateLimitResult.allowed) {
    const retryAfter = Math.ceil(rateLimitResult.resetIn / 1000);
    return {
      success: false,
      error: `Too many requests. Please wait ${retryAfter} seconds before trying again.`,
      rateLimited: true,
      retryAfter,
    };
  }

  // Verify Turnstile CAPTCHA
  const turnstileResult = await verifyTurnstileToken(
    formData.turnstileToken || "",
    clientIp || undefined
  );
  if (!turnstileResult.success) {
    return {
      success: false,
      error: turnstileResult.error || "CAPTCHA verification failed.",
    };
  }

  // Sanitize all inputs
  const sanitizedData = {
    name: sanitizeName(formData.name, 100),
    email: sanitizeEmail(formData.email),
    subject: sanitizeTextField(formData.subject, 200),
    projectType: validateAllowedValue(
      formData.projectType,
      ALLOWED_PROJECT_TYPES,
      ""
    ),
    message: sanitizeTextField(formData.message, 5000),
  };

  // Server-side validation on sanitized data
  if (!sanitizedData.name || sanitizedData.name.length < 2) {
    return { success: false, error: "Please provide a valid name (at least 2 characters)." };
  }

  if (!isValidEmail(sanitizedData.email)) {
    return { success: false, error: "Please provide a valid email address." };
  }

  if (!sanitizedData.message || sanitizedData.message.length < 10) {
    return {
      success: false,
      error: "Please provide a message with at least 10 characters.",
    };
  }

  // Check if Resend API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return {
      success: false,
      error: "Email service is not configured. Please try again later.",
    };
  }

  const contactEmail = process.env.CONTACT_EMAIL || "contact@lokisoft.dev";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "LokiSoft";

  // Format project type for display
  const projectTypeLabels: Record<string, string> = {
    "web-development": "Web Development",
    "app-development": "App Development",
    "mobile-app": "Mobile App Development",
    ecommerce: "E-Commerce Solution",
    "custom-software": "Custom Software",
    consultation: "General Consultation",
    other: "Other",
  };
  const projectTypeDisplay = sanitizedData.projectType
    ? projectTypeLabels[sanitizedData.projectType] || sanitizedData.projectType
    : "Not specified";

  try {
    // Send email notification with HTML-escaped values
    const { error } = await resend.emails.send({
      from: `${siteName} Contact Form <noreply@${process.env.RESEND_DOMAIN || "lokisoft.dev"}>`,
      to: [contactEmail],
      replyTo: sanitizedData.email,
      subject: sanitizedData.subject
        ? `[Contact] ${sanitizeText(sanitizedData.subject)}`
        : `[Contact] New message from ${sanitizeText(sanitizedData.name)}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ec4899;">New Contact Form Submission</h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #333; color: #888; width: 120px;">Name</td>
              <td style="padding: 10px; border-bottom: 1px solid #333;">${escapeHtml(sanitizedData.name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #333; color: #888;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #333;">
                <a href="mailto:${escapeHtml(sanitizedData.email)}" style="color: #22d3ee;">${escapeHtml(sanitizedData.email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #333; color: #888;">Project Type</td>
              <td style="padding: 10px; border-bottom: 1px solid #333;">${escapeHtml(projectTypeDisplay)}</td>
            </tr>
            ${
              sanitizedData.subject
                ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #333; color: #888;">Subject</td>
              <td style="padding: 10px; border-bottom: 1px solid #333;">${escapeHtml(sanitizedData.subject)}</td>
            </tr>
            `
                : ""
            }
          </table>

          <h3 style="color: #a855f7;">Message</h3>
          <div style="background: #1a1a2e; padding: 20px; border-radius: 8px; border-left: 4px solid #ec4899; white-space: pre-wrap;">${escapeHtml(sanitizedData.message)}</div>

          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This message was sent via the ${escapeHtml(siteName)} contact form.
            ${clientIp ? `<br>Client IP: ${escapeHtml(clientIp)}` : ""}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        error: "Failed to send message. Please try again later.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
