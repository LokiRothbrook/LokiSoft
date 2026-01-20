import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Code,
  Users,
  BookOpen,
  Shield,
  Sparkles,
  Target,
  Lightbulb,
} from "lucide-react";
import { NeonLogo } from "@/components/ui/neon-logo";
import { SectionTitle, GlassCard } from "@/components/ui/hero-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about LokiSoft - a Christian values company committed to open source and the freedom of knowledge for everyone.",
};

const values = [
  {
    icon: Heart,
    title: "Faith-Driven",
    description:
      "Our Christian values guide every decision we make. We believe in treating others as we want to be treated, with honesty, respect, and compassion.",
    color: "pink",
  },
  {
    icon: Code,
    title: "Open Source First",
    description:
      "We believe knowledge should be freely shared. Our tools, libraries, and even this website are open source for everyone to use and learn from.",
    color: "cyan",
  },
  {
    icon: Shield,
    title: "Integrity Always",
    description:
      "We do what's right, not what's easy or profitable. Your trust is more valuable to us than any contract.",
    color: "purple",
  },
  {
    icon: Users,
    title: "Community Focused",
    description:
      "We're building more than software—we're building a community of people who share our values and vision.",
    color: "blue",
  },
  {
    icon: Sparkles,
    title: "Excellence in Craft",
    description:
      "We take pride in our work. Every line of code, every design decision, every interaction reflects our commitment to quality.",
    color: "pink",
  },
  {
    icon: Target,
    title: "Purpose-Driven",
    description:
      "We exist to serve, not just to profit. Our goal is to create technology that genuinely helps people and glorifies God.",
    color: "cyan",
  },
];

const principles = [
  {
    icon: BookOpen,
    title: "Freedom of Knowledge",
    description:
      "Everyone deserves access to the tools and knowledge they need to succeed. We share what we learn and build tools that empower others.",
  },
  {
    icon: Lightbulb,
    title: "Innovation with Purpose",
    description:
      "We don't build technology for its own sake. Every project we take on solves a real problem and makes a meaningful difference.",
  },
  {
    icon: Shield,
    title: "Privacy Respected",
    description:
      "Your data is yours. We design our products with privacy first, never selling or exploiting user information.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <NeonLogo size="xl" href={undefined} />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text-animated">
            Building Software That Matters
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We&apos;re a Christian values company committed to open source and the freedom of
            knowledge for everyone. Our mission is to create technology that empowers, educates,
            and serves.
          </p>
        </div>

        {/* Our Story */}
        <section className="mb-20">
          <SectionTitle
            title="Our Story"
            subtitle="How LokiSoft came to be"
          />

          <div className="max-w-3xl mx-auto">
            <GlassCard glow="pink">
              <div className="prose prose-cyberpunk">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  LokiSoft was founded with a simple belief: technology should serve people, not
                  the other way around. Too often, we see companies that prioritize profit over
                  people, surveillance over privacy, and proprietary solutions over shared
                  knowledge.
                </p>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  We decided to do things differently. Guided by our Christian faith, we set out
                  to build a company that reflects our values—one that treats every client,
                  contributor, and community member with dignity and respect.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Today, we&apos;re building products that help people take control of their
                  digital lives, offering services that empower businesses to succeed, and
                  sharing everything we learn along the way. We believe that when we lift
                  others up, everyone rises together.
                </p>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-20">
          <SectionTitle
            title="Our Values"
            subtitle="The principles that guide everything we do"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {values.map((value) => {
              const colorClasses = {
                pink: "bg-neon-pink/10 text-neon-pink",
                purple: "bg-neon-purple/10 text-neon-purple",
                blue: "bg-neon-blue/10 text-neon-blue",
                cyan: "bg-neon-cyan/10 text-neon-cyan",
              };

              return (
                <GlassCard key={value.title} glow={value.color as "pink" | "purple" | "blue" | "cyan"}>
                  <div className={`p-3 rounded-xl ${colorClasses[value.color as keyof typeof colorClasses]} w-fit mb-4`}>
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* Our Principles */}
        <section className="mb-20">
          <SectionTitle
            title="What We Believe"
            subtitle="The foundations of our work"
          />

          <div className="max-w-4xl mx-auto space-y-6">
            {principles.map((principle, index) => {
              const colors = ["pink", "purple", "cyan"] as const;
              const color = colors[index % colors.length];
              const colorClasses = {
                pink: "bg-neon-pink/10 text-neon-pink border-l-neon-pink",
                purple: "bg-neon-purple/10 text-neon-purple border-l-neon-purple",
                cyan: "bg-neon-cyan/10 text-neon-cyan border-l-neon-cyan",
              };

              return (
                <GlassCard key={principle.title} className="border-l-4" glow={color}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${colorClasses[color].split(" ").slice(0, 2).join(" ")}`}>
                      <principle.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{principle.title}</h3>
                      <p className="text-muted-foreground">{principle.description}</p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* Scripture */}
        <section className="mb-20">
          <div className="max-w-2xl mx-auto text-center">
            <GlassCard glow="purple">
              <blockquote className="text-xl italic text-muted-foreground mb-4">
                &ldquo;Whatever you do, work at it with all your heart, as working for the Lord,
                not for human masters.&rdquo;
              </blockquote>
              <p className="text-neon-purple font-medium">— Colossians 3:23</p>
            </GlassCard>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="glass rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text-animated mb-4">
              Let&apos;s Work Together
            </h2>
            <p className="text-muted-foreground mb-8">
              Whether you need custom software, want to use our products, or just want to be
              part of our community—we&apos;d love to connect with you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-neon-pink hover:bg-neon-pink/80 group">
                  Get in Touch
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline">
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
