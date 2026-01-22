import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NeonLogo } from "@/components/ui/neon-logo";
import { SectionTitle, GlassCard } from "@/components/ui/hero-card";
import { Button } from "@/components/ui/button";
import { getIcon } from "@/lib/icons";
import { siteConfig } from "@/lib/data/site";
import { aboutConfig } from "@/lib/data/about";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name} - ${siteConfig.description}`,
};

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
            {aboutConfig.hero.title}
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {aboutConfig.hero.description}
          </p>
        </div>

        {/* Our Story */}
        <section className="mb-20">
          <SectionTitle
            title={aboutConfig.story.title}
            subtitle={aboutConfig.story.subtitle}
          />

          <div className="max-w-3xl mx-auto">
            <GlassCard glow="pink">
              <div className="prose prose-cyberpunk">
                {aboutConfig.story.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-20">
          <SectionTitle
            title={aboutConfig.values.title}
            subtitle={aboutConfig.values.subtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {aboutConfig.values.items.map((value) => {
              const IconComponent = getIcon(value.icon);
              const colorClasses = {
                pink: "bg-neon-pink/10 text-neon-pink",
                purple: "bg-neon-purple/10 text-neon-purple",
                blue: "bg-neon-blue/10 text-neon-blue",
                cyan: "bg-neon-cyan/10 text-neon-cyan",
              };

              return (
                <GlassCard key={value.title} glow={value.color}>
                  <div className={`p-3 rounded-xl ${colorClasses[value.color]} w-fit mb-4`}>
                    <IconComponent className="w-6 h-6" />
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
            title={aboutConfig.principles.title}
            subtitle={aboutConfig.principles.subtitle}
          />

          <div className="max-w-4xl mx-auto space-y-6">
            {aboutConfig.principles.items.map((principle, index) => {
              const IconComponent = getIcon(principle.icon);
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
                      <IconComponent className="w-6 h-6" />
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
        {aboutConfig.scripture && (
          <section className="mb-20">
            <div className="max-w-2xl mx-auto text-center">
              <GlassCard glow="purple">
                <blockquote className="text-xl italic text-muted-foreground mb-4">
                  &ldquo;{aboutConfig.scripture.text}&rdquo;
                </blockquote>
                <p className="text-neon-purple font-medium">— {aboutConfig.scripture.reference}</p>
              </GlassCard>
            </div>
          </section>
        )}

        {/* CTA */}
        <section>
          <div className="glass rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text-animated mb-4">
              {aboutConfig.cta.title}
            </h2>
            <p className="text-muted-foreground mb-8">
              {aboutConfig.cta.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href={aboutConfig.cta.primaryButton.href}>
                <Button size="lg" className="bg-neon-pink hover:bg-neon-pink/80 group">
                  {aboutConfig.cta.primaryButton.text}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href={aboutConfig.cta.secondaryButton.href}>
                <Button size="lg" variant="outline">
                  {aboutConfig.cta.secondaryButton.text}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
