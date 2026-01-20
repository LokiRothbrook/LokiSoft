import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Eye, Lock, Database, Cookie, Mail } from "lucide-react";
import { SectionTitle, GlassCard } from "@/components/ui/hero-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how LokiSoft collects, uses, and protects your personal information. Your privacy matters to us.",
};

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    color: "pink",
    content: [
      {
        subtitle: "Information You Provide",
        text: "When you contact us through our website, subscribe to our newsletter, or use our services, we may collect your name, email address, and any other information you choose to provide.",
      },
      {
        subtitle: "Automatically Collected Information",
        text: "We may automatically collect certain information when you visit our website, including your IP address, browser type, operating system, and pages visited. This helps us improve our services and user experience.",
      },
    ],
  },
  {
    icon: Database,
    title: "How We Use Your Information",
    color: "purple",
    content: [
      {
        subtitle: "Service Delivery",
        text: "We use your information to respond to your inquiries, provide requested services, and communicate with you about projects and updates.",
      },
      {
        subtitle: "Improvement & Analytics",
        text: "We analyze usage patterns to improve our website, services, and user experience. This data is aggregated and anonymized whenever possible.",
      },
    ],
  },
  {
    icon: Lock,
    title: "How We Protect Your Information",
    color: "cyan",
    content: [
      {
        subtitle: "Security Measures",
        text: "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.",
      },
      {
        subtitle: "Data Minimization",
        text: "We only collect and retain the information necessary to provide our services. We do not sell, trade, or rent your personal information to third parties.",
      },
    ],
  },
  {
    icon: Cookie,
    title: "Cookies & Tracking",
    color: "blue",
    content: [
      {
        subtitle: "Essential Cookies",
        text: "We use essential cookies to ensure our website functions properly. These cookies do not collect personal information and are necessary for basic site functionality.",
      },
      {
        subtitle: "Analytics",
        text: "We may use privacy-respecting analytics tools to understand how visitors interact with our website. You can opt out of analytics tracking through your browser settings.",
      },
    ],
  },
];

const colorClasses = {
  pink: "bg-neon-pink/10 text-neon-pink",
  purple: "bg-neon-purple/10 text-neon-purple",
  cyan: "bg-neon-cyan/10 text-neon-cyan",
  blue: "bg-neon-blue/10 text-neon-blue",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-neon-purple/10 mb-6">
            <Shield className="w-10 h-10 text-neon-purple" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-text-animated">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            At LokiSoft, we believe privacy is a fundamental right. This policy explains how we handle your information with integrity and transparency.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: January 2026
          </p>
        </div>

        {/* Our Commitment */}
        <section className="mb-12">
          <div className="max-w-3xl mx-auto">
            <GlassCard glow="pink">
              <h2 className="text-xl font-semibold mb-4 text-neon-pink">Our Commitment to You</h2>
              <p className="text-muted-foreground leading-relaxed">
                As a Christian values company, we treat your data the way we&apos;d want our own data treated—with respect and care. We don&apos;t sell your information, we don&apos;t exploit your data, and we only collect what we need to serve you better. Your trust is sacred to us.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Policy Sections */}
        <section className="mb-12">
          <SectionTitle
            title="What You Should Know"
            subtitle="A clear breakdown of our privacy practices"
          />

          <div className="max-w-4xl mx-auto space-y-6">
            {sections.map((section) => (
              <GlassCard
                key={section.title}
                glow={section.color as "pink" | "purple" | "cyan" | "blue"}
                className="border-l-4"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl shrink-0 ${colorClasses[section.color as keyof typeof colorClasses]}`}>
                    <section.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                    <div className="space-y-4">
                      {section.content.map((item) => (
                        <div key={item.subtitle}>
                          <h4 className="font-medium text-foreground mb-1">{item.subtitle}</h4>
                          <p className="text-sm text-muted-foreground">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Your Rights */}
        <section className="mb-12">
          <SectionTitle
            title="Your Rights"
            subtitle="You have control over your information"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <GlassCard glow="pink">
              <h3 className="font-semibold mb-2 text-neon-pink">Access</h3>
              <p className="text-sm text-muted-foreground">
                You can request a copy of any personal information we hold about you at any time.
              </p>
            </GlassCard>
            <GlassCard glow="purple">
              <h3 className="font-semibold mb-2 text-neon-purple">Correction</h3>
              <p className="text-sm text-muted-foreground">
                If any information we have is inaccurate, let us know and we&apos;ll correct it promptly.
              </p>
            </GlassCard>
            <GlassCard glow="cyan">
              <h3 className="font-semibold mb-2 text-neon-cyan">Deletion</h3>
              <p className="text-sm text-muted-foreground">
                You can request that we delete your personal information from our systems.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Third Parties */}
        <section className="mb-12">
          <div className="max-w-3xl mx-auto">
            <GlassCard glow="blue">
              <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground mb-4">
                Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
              <p className="text-muted-foreground">
                We may use third-party service providers to help operate our website and services. These providers are contractually obligated to protect your information and use it only for the purposes we specify.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Contact */}
        <section>
          <div className="max-w-2xl mx-auto text-center">
            <GlassCard glow="purple">
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-neon-cyan/10 mb-4">
                <Mail className="w-6 h-6 text-neon-cyan" />
              </div>
              <h2 className="text-xl font-semibold mb-4">Questions About Privacy?</h2>
              <p className="text-muted-foreground mb-6">
                If you have any questions about this Privacy Policy or how we handle your information, please don&apos;t hesitate to reach out.
              </p>
              <Link href="/contact">
                <Button className="bg-neon-pink hover:bg-neon-pink/80">
                  Contact Us
                </Button>
              </Link>
            </GlassCard>
          </div>
        </section>
      </div>
    </div>
  );
}
