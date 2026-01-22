import { Metadata } from "next";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { SectionTitle, GlassCard } from "@/components/ui/hero-card";
import { ContactForm } from "./contact-form";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}. We'd love to hear from you about your project, questions, or just to say hello.`,
};

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Drop us a line anytime",
      value: siteConfig.contact.email,
      color: "pink",
    },
    {
      icon: MessageSquare,
      title: "Discord",
      description: "Join our community",
      value: siteConfig.contact.discord,
      color: "purple",
    },
    {
      icon: MapPin,
      title: "Location",
      description: "Based remotely",
      value: siteConfig.contact.location,
      color: "cyan",
    },
  ];

  const colorClasses = {
    pink: "bg-neon-pink/10 text-neon-pink",
    purple: "bg-neon-purple/10 text-neon-purple",
    cyan: "bg-neon-cyan/10 text-neon-cyan",
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <SectionTitle
          title="Get in Touch"
          subtitle="Have a project in mind? Questions about our services? Or just want to say hello? We'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-4">
            {contactInfo.map((info) => (
              <GlassCard
                key={info.title}
                glow={info.color as "pink" | "purple" | "cyan"}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl ${colorClasses[info.color as keyof typeof colorClasses]}`}
                  >
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{info.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      {info.description}
                    </p>
                    <p className="text-sm text-foreground">{info.value}</p>
                  </div>
                </div>
              </GlassCard>
            ))}

            {/* Hours */}
            <GlassCard glow="blue">
              <h3 className="font-semibold mb-3">Response Time</h3>
              <p className="text-sm text-muted-foreground">
                We typically respond within 24-48 hours during business days.
                For urgent matters, reach out on Discord for faster responses.
              </p>
            </GlassCard>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <GlassCard glow="pink">
              <h2 className="text-2xl font-bold mb-6 gradient-text">Send Us a Message</h2>
              <ContactForm />
            </GlassCard>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <GlassCard glow="purple">
            <h3 className="text-xl font-semibold mb-4">Looking for Something Specific?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-neon-pink font-medium mb-1">General Inquiries</p>
                <p className="text-muted-foreground">{siteConfig.contact.email}</p>
              </div>
              <div>
                <p className="text-neon-purple font-medium mb-1">Technical Support</p>
                <p className="text-muted-foreground">{siteConfig.contact.supportEmail}</p>
              </div>
              <div>
                <p className="text-neon-cyan font-medium mb-1">Partnerships</p>
                <p className="text-muted-foreground">{siteConfig.contact.partnershipsEmail}</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
