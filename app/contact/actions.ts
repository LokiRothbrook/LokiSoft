"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  projectType: string;
  message: string;
}

export interface ContactFormResult {
  success: boolean;
  error?: string;
}

export async function submitContactForm(
  formData: ContactFormData
): Promise<ContactFormResult> {
  // Server-side validation
  if (!formData.name || formData.name.trim().length < 2) {
    return { success: false, error: "Please provide a valid name." };
  }

  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    return { success: false, error: "Please provide a valid email address." };
  }

  if (!formData.message || formData.message.trim().length < 10) {
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
  const projectTypeDisplay = formData.projectType
    ? projectTypeLabels[formData.projectType] || formData.projectType
    : "Not specified";

  try {
    // Send email notification
    const { error } = await resend.emails.send({
      from: `${siteName} Contact Form <noreply@${process.env.RESEND_DOMAIN || "lokisoft.dev"}>`,
      to: [contactEmail],
      replyTo: formData.email,
      subject: formData.subject
        ? `[Contact] ${formData.subject}`
        : `[Contact] New message from ${formData.name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ec4899;">New Contact Form Submission</h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #333; color: #888; width: 120px;">Name</td>
              <td style="padding: 10px; border-bottom: 1px solid #333;">${escapeHtml(formData.name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #333; color: #888;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #333;">
                <a href="mailto:${escapeHtml(formData.email)}" style="color: #22d3ee;">${escapeHtml(formData.email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #333; color: #888;">Project Type</td>
              <td style="padding: 10px; border-bottom: 1px solid #333;">${escapeHtml(projectTypeDisplay)}</td>
            </tr>
            ${
              formData.subject
                ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #333; color: #888;">Subject</td>
              <td style="padding: 10px; border-bottom: 1px solid #333;">${escapeHtml(formData.subject)}</td>
            </tr>
            `
                : ""
            }
          </table>

          <h3 style="color: #a855f7;">Message</h3>
          <div style="background: #1a1a2e; padding: 20px; border-radius: 8px; border-left: 4px solid #ec4899; white-space: pre-wrap;">${escapeHtml(formData.message)}</div>

          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This message was sent via the ${siteName} contact form.
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

// Helper function to escape HTML and prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
