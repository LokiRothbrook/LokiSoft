"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Turnstile } from "@/components/ui/turnstile";
import { submitContactForm, ContactFormData } from "./actions";

const projectTypes = [
  { value: "", label: "Select a project type" },
  { value: "web-development", label: "Web Development" },
  { value: "app-development", label: "App Development" },
  { value: "mobile-app", label: "Mobile App Development" },
  { value: "ecommerce", label: "E-Commerce Solution" },
  { value: "custom-software", label: "Custom Software" },
  { value: "consultation", label: "General Consultation" },
  { value: "other", label: "Other" },
];

// Maximum lengths for form fields (enforced client and server side)
const MAX_LENGTHS = {
  name: 100,
  email: 254,
  subject: 200,
  message: 5000,
};

export function ContactForm() {
  const [formData, setFormData] = useState<Omit<ContactFormData, "turnstileToken">>({
    name: "",
    email: "",
    subject: "",
    projectType: "",
    message: "",
  });
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitedUntil, setRateLimitedUntil] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const maxLength = MAX_LENGTHS[name as keyof typeof MAX_LENGTHS];

    // Enforce max length on client side
    const trimmedValue = maxLength ? value.slice(0, maxLength) : value;

    setFormData((prev) => ({ ...prev, [name]: trimmedValue }));
    setError(null);
  };

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
    setError(null);
  }, []);

  const handleTurnstileError = useCallback(() => {
    setError("CAPTCHA verification failed. Please refresh the page and try again.");
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken("");
    setError("CAPTCHA expired. Please complete the verification again.");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if rate limited
    if (rateLimitedUntil && Date.now() < rateLimitedUntil) {
      const secondsLeft = Math.ceil((rateLimitedUntil - Date.now()) / 1000);
      setError(`Please wait ${secondsLeft} seconds before trying again.`);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Client-side validation
    if (!formData.name || formData.name.trim().length < 2) {
      setError("Please provide a valid name (at least 2 characters).");
      setIsSubmitting(false);
      return;
    }

    if (!formData.email) {
      setError("Please provide your email address.");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.message || formData.message.trim().length < 10) {
      setError("Please provide a message with at least 10 characters.");
      setIsSubmitting(false);
      return;
    }

    // Check Turnstile token (only if Turnstile is configured)
    const turnstileConfigured = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (turnstileConfigured && !turnstileToken) {
      setError("Please complete the CAPTCHA verification.");
      setIsSubmitting(false);
      return;
    }

    // Submit via server action
    const result = await submitContactForm({
      ...formData,
      turnstileToken,
    });

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setError(result.error || "Something went wrong. Please try again.");

      // Handle rate limiting
      if (result.rateLimited && result.retryAfter) {
        setRateLimitedUntil(Date.now() + result.retryAfter * 1000);
      }

      // Reset Turnstile on error so user can try again
      setTurnstileToken("");
    }

    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
        >
          <CheckCircle className="w-8 h-8 text-green-400" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for reaching out. We&apos;ll get back to you as soon as possible.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: "",
              email: "",
              subject: "",
              projectType: "",
              message: "",
            });
            setTurnstileToken("");
          }}
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name <span className="text-neon-pink">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={MAX_LENGTHS.name}
            autoComplete="name"
            className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-pink/50 focus:ring-1 focus:ring-neon-pink/30 transition-all"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email <span className="text-neon-pink">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            maxLength={MAX_LENGTHS.email}
            autoComplete="email"
            className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-pink/50 focus:ring-1 focus:ring-neon-pink/30 transition-all"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            maxLength={MAX_LENGTHS.subject}
            className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-pink/50 focus:ring-1 focus:ring-neon-pink/30 transition-all"
            placeholder="What's this about?"
          />
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium mb-2">
            Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground focus:outline-none focus:border-neon-pink/50 focus:ring-1 focus:ring-neon-pink/30 transition-all appearance-none cursor-pointer"
          >
            {projectTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message <span className="text-neon-pink">*</span>
          <span className="text-muted-foreground text-xs ml-2">
            ({formData.message.length}/{MAX_LENGTHS.message})
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          maxLength={MAX_LENGTHS.message}
          className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-pink/50 focus:ring-1 focus:ring-neon-pink/30 transition-all resize-none"
          placeholder="Tell us about your project, questions, or just say hello..."
        />
      </div>

      {/* Turnstile CAPTCHA */}
      <div className="flex justify-center">
        <Turnstile
          onVerify={handleTurnstileVerify}
          onError={handleTurnstileError}
          onExpire={handleTurnstileExpire}
        />
      </div>

      {/* Submit */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          <span className="text-neon-pink">*</span> Required fields
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting || (rateLimitedUntil !== null && Date.now() < rateLimitedUntil)}
          className="bg-neon-pink hover:bg-neon-pink/80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        By submitting this form, you agree to our privacy policy. We&apos;ll never share your
        information with third parties.
      </p>
    </form>
  );
}
