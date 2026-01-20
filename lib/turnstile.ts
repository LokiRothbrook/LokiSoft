/**
 * Cloudflare Turnstile verification utility
 * https://developers.cloudflare.com/turnstile/
 */

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

export interface TurnstileResult {
  success: boolean;
  error?: string;
}

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Verify a Turnstile token server-side
 * @param token The token received from the Turnstile widget
 * @param remoteip Optional client IP address for additional validation
 */
export async function verifyTurnstileToken(
  token: string,
  remoteip?: string
): Promise<TurnstileResult> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // If Turnstile is not configured, allow the request (for development)
  if (!secretKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Turnstile secret key not configured - skipping verification in development");
      return { success: true };
    }
    return { success: false, error: "CAPTCHA verification is not configured." };
  }

  // Empty token means user didn't complete the challenge
  if (!token) {
    return { success: false, error: "Please complete the CAPTCHA verification." };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteip) {
      formData.append("remoteip", remoteip);
    }

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      console.error("Turnstile API error:", response.status, response.statusText);
      return { success: false, error: "CAPTCHA verification failed. Please try again." };
    }

    const result: TurnstileVerifyResponse = await response.json();

    if (!result.success) {
      const errorCodes = result["error-codes"] || [];
      console.warn("Turnstile verification failed:", errorCodes);

      // Map error codes to user-friendly messages
      if (errorCodes.includes("timeout-or-duplicate")) {
        return { success: false, error: "CAPTCHA expired. Please refresh and try again." };
      }
      if (errorCodes.includes("invalid-input-response")) {
        return { success: false, error: "Invalid CAPTCHA. Please try again." };
      }

      return { success: false, error: "CAPTCHA verification failed. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return { success: false, error: "CAPTCHA verification failed. Please try again." };
  }
}
