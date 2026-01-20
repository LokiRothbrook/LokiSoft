import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, Scale, AlertCircle, Code, Handshake, Mail, ShieldCheck } from "lucide-react";
import { SectionTitle, GlassCard } from "@/components/ui/hero-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read LokiSoft's terms of service. Understand your rights and responsibilities when using our website and services.",
};

const sections = [
  {
    icon: Handshake,
    title: "Acceptance of Terms",
    color: "pink",
    content: `By accessing or using the LokiSoft website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We may update these terms from time to time, and your continued use of our services constitutes acceptance of any changes.`,
  },
  {
    icon: Code,
    title: "Open Source & Licensing",
    color: "purple",
    content: `Much of our code and content is released under open source licenses. When you use, modify, or distribute our open source materials, you must comply with the applicable license terms (typically MIT or Apache 2.0). Attribution requirements vary by license—please check the specific repository for details. Our brand assets (logo, name) are not included in open source licenses and require separate permission for use.`,
  },
  {
    icon: ShieldCheck,
    title: "Acceptable Use",
    color: "cyan",
    content: `You agree to use our services only for lawful purposes. You may not use our website or services to: violate any laws or regulations, infringe on intellectual property rights, transmit malicious code or attempt to gain unauthorized access, harass, abuse, or harm others, or misrepresent your identity or affiliation. We reserve the right to terminate access for violations of these terms.`,
  },
  {
    icon: FileText,
    title: "Service Agreements",
    color: "blue",
    content: `Custom development and consulting services are governed by separate service agreements. These agreements will specify project scope, deliverables, timelines, payment terms, and intellectual property ownership. In case of any conflict between these Terms of Service and a specific service agreement, the service agreement shall prevail for that engagement.`,
  },
  {
    icon: Scale,
    title: "Intellectual Property",
    color: "pink",
    content: `Unless explicitly released under an open source license, all content on this website—including text, graphics, logos, and software—is the property of LokiSoft or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without permission, except as permitted by applicable open source licenses.`,
  },
  {
    icon: AlertCircle,
    title: "Disclaimers & Limitations",
    color: "purple",
    content: `Our services are provided "as is" without warranties of any kind. While we strive for excellence, we cannot guarantee that our website will be uninterrupted, error-free, or free of harmful components. To the maximum extent permitted by law, LokiSoft shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.`,
  },
];

const colorClasses = {
  pink: "bg-neon-pink/10 text-neon-pink",
  purple: "bg-neon-purple/10 text-neon-purple",
  cyan: "bg-neon-cyan/10 text-neon-cyan",
  blue: "bg-neon-blue/10 text-neon-blue",
};

export default function TermsPage() {
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
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-neon-cyan/10 mb-6">
            <FileText className="w-10 h-10 text-neon-cyan" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-text-animated">
            Terms of Service
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Clear, fair terms that reflect our commitment to honesty and transparency. No hidden clauses, no surprises.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: January 2026
          </p>
        </div>

        {/* Our Approach */}
        <section className="mb-12">
          <div className="max-w-3xl mx-auto">
            <GlassCard glow="cyan">
              <h2 className="text-xl font-semibold mb-4 text-neon-cyan">Our Approach to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe legal documents should be understandable. These terms are written to be clear and fair to everyone. Our Christian values guide us to treat others as we&apos;d want to be treated—that includes how we write our terms of service. If something isn&apos;t clear, just ask us.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="mb-12">
          <SectionTitle
            title="Terms & Conditions"
            subtitle="Please read these terms carefully"
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
                    <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Open Source Commitment */}
        <section className="mb-12">
          <SectionTitle
            title="Open Source Commitment"
            subtitle="Our dedication to the community"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <GlassCard glow="pink">
              <h3 className="font-semibold mb-2 text-neon-pink">Free to Use</h3>
              <p className="text-sm text-muted-foreground">
                Our open source projects are free for personal, educational, and commercial use under their respective licenses.
              </p>
            </GlassCard>
            <GlassCard glow="purple">
              <h3 className="font-semibold mb-2 text-neon-purple">Free to Modify</h3>
              <p className="text-sm text-muted-foreground">
                You can fork, modify, and adapt our code to fit your needs. That&apos;s the beauty of open source.
              </p>
            </GlassCard>
            <GlassCard glow="cyan">
              <h3 className="font-semibold mb-2 text-neon-cyan">Free to Share</h3>
              <p className="text-sm text-muted-foreground">
                Distribute our open source work freely, as long as you include the original license and attribution.
              </p>
            </GlassCard>
            <GlassCard glow="blue">
              <h3 className="font-semibold mb-2 text-neon-blue">Community Driven</h3>
              <p className="text-sm text-muted-foreground">
                We welcome contributions, bug reports, and feature suggestions from the community.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Governing Law */}
        <section className="mb-12">
          <div className="max-w-3xl mx-auto">
            <GlassCard glow="blue">
              <h2 className="text-xl font-semibold mb-4">Governing Law & Disputes</h2>
              <p className="text-muted-foreground mb-4">
                These terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms or your use of our services shall first be attempted to be resolved through good-faith negotiation.
              </p>
              <p className="text-muted-foreground">
                We believe most disagreements can be resolved through open, honest communication. If you have a concern, please reach out to us directly before taking any formal action.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Contact */}
        <section>
          <div className="max-w-2xl mx-auto text-center">
            <GlassCard glow="purple">
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-neon-pink/10 mb-4">
                <Mail className="w-6 h-6 text-neon-pink" />
              </div>
              <h2 className="text-xl font-semibold mb-4">Questions About These Terms?</h2>
              <p className="text-muted-foreground mb-6">
                If anything in these terms is unclear or you have questions, we&apos;re happy to explain. Reach out anytime.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/contact">
                  <Button className="bg-neon-pink hover:bg-neon-pink/80">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/privacy">
                  <Button variant="outline">
                    View Privacy Policy
                  </Button>
                </Link>
              </div>
            </GlassCard>
          </div>
        </section>
      </div>
    </div>
  );
}
