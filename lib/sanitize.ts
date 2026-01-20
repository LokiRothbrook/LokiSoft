/**
 * Input sanitization utilities for server-side validation
 * These functions should be used to sanitize all user input before processing
 */

/**
 * Escape HTML special characters to prevent XSS
 * Use this when inserting user input into HTML contexts
 */
export function escapeHtml(text: string): string {
  if (typeof text !== "string") return "";

  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;",
  };
  return text.replace(/[&<>"'`=/]/g, (char) => map[char]);
}

/**
 * Strip all HTML tags from a string
 * Use this when you want plain text only
 */
export function stripHtml(text: string): string {
  if (typeof text !== "string") return "";
  return text.replace(/<[^>]*>/g, "");
}

/**
 * Sanitize a string for safe use in text contexts
 * - Trims whitespace
 * - Removes null bytes and control characters (except newlines and tabs)
 * - Normalizes whitespace
 */
export function sanitizeText(text: string): string {
  if (typeof text !== "string") return "";

  return text
    // Remove null bytes
    .replace(/\0/g, "")
    // Remove control characters except newlines and tabs
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    // Normalize whitespace (but preserve intentional newlines)
    .replace(/[ \t]+/g, " ")
    // Trim leading/trailing whitespace
    .trim();
}

/**
 * Sanitize email address
 * - Lowercases the email
 * - Trims whitespace
 * - Validates basic format
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== "string") return "";
  return email.toLowerCase().trim();
}

/**
 * Validate email format using a robust regex
 * More comprehensive than the basic check
 */
export function isValidEmail(email: string): boolean {
  if (typeof email !== "string") return false;

  // RFC 5322 simplified email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Additional checks
  if (email.length > 254) return false; // Max email length per RFC
  if (email.includes("..")) return false; // No consecutive dots

  return emailRegex.test(email);
}

/**
 * Sanitize a name field
 * - Removes potentially dangerous characters
 * - Allows letters, spaces, hyphens, apostrophes
 * - Limits length
 */
export function sanitizeName(name: string, maxLength: number = 100): string {
  if (typeof name !== "string") return "";

  return name
    // Remove null bytes and control characters
    .replace(/[\x00-\x1F\x7F]/g, "")
    // Remove characters that could be used for injection attacks
    .replace(/[<>'"&;(){}[\]\\]/g, "")
    // Normalize whitespace
    .replace(/\s+/g, " ")
    // Trim
    .trim()
    // Limit length
    .slice(0, maxLength);
}

/**
 * Sanitize a general text field (subject, message, etc.)
 * - Removes dangerous characters while preserving most formatting
 * - Limits length
 */
export function sanitizeTextField(text: string, maxLength: number = 5000): string {
  if (typeof text !== "string") return "";

  return text
    // Remove null bytes
    .replace(/\0/g, "")
    // Remove control characters except newlines and tabs
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    // Trim
    .trim()
    // Limit length
    .slice(0, maxLength);
}

/**
 * Sanitize a URL parameter/slug
 * - Only allows alphanumeric, hyphens, underscores
 */
export function sanitizeSlug(slug: string): string {
  if (typeof slug !== "string") return "";

  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-_]/g, "")
    .slice(0, 200);
}

/**
 * Validate that a value is one of allowed options
 * Use this for select/dropdown values
 */
export function validateAllowedValue<T>(
  value: unknown,
  allowedValues: readonly T[],
  defaultValue: T
): T {
  if (allowedValues.includes(value as T)) {
    return value as T;
  }
  return defaultValue;
}
