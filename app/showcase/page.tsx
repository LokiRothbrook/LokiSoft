import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Github, CheckCircle } from "lucide-react";
import { demos, portfolio } from "@/lib/data/showcase";
import { SectionTitle, GlassCard } from "@/components/ui/hero-card";
import { Button } from "@/components/ui/button";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Showcase",
  description:
    "Explore our demo templates and portfolio of client work. See real examples of our web development and design capabilities.",
};

export default function ShowcasePage() {
  const colorClasses = {
    pink: {
      bg: "bg-neon-pink/10",
      text: "text-neon-pink",
      border: "border-neon-pink/30",
    },
    purple: {
      bg: "bg-neon-purple/10",
      text: "text-neon-purple",
      border: "border-neon-purple/30",
    },
    blue: {
      bg: "bg-neon-blue/10",
      text: "text-neon-blue",
      border: "border-neon-blue/30",
    },
    cyan: {
      bg: "bg-neon-cyan/10",
      text: "text-neon-cyan",
      border: "border-neon-cyan/30",
    },
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <SectionTitle
          title="Showcase"
          subtitle="Explore our demo templates and see real examples of our work with clients. Each project demonstrates our commitment to quality and attention to detail."
        />

        {/* Demo Templates Section */}
        <section className="mb-20" id="demos">
          <h3 className="text-2xl md:text-3xl font-bold text-neon-purple mb-2 text-center">
            Demo Templates
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl text-center mx-auto">
            Browse our collection of ready-to-customize templates. Each demo is
            open source and available on GitHub.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {demos.map((demo) => {
              const IconComponent = getIcon(demo.icon);
              const colors = colorClasses[demo.color];

              return (
                <GlassCard key={demo.slug} className="group" glow={demo.color}>
                  {/* Image placeholder */}
                  <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-muted/30 border border-border/50">
                    <Image
                      src={demo.image}
                      alt={`${demo.name} screenshot`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Fallback overlay for missing images */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted/80">
                      <div className={`p-4 rounded-xl ${colors.bg}`}>
                        <IconComponent className={`w-12 h-12 ${colors.text}`} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${colors.bg}`}>
                      <IconComponent className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold mb-1 group-hover:text-neon-pink transition-colors">
                        {demo.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {demo.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {demo.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle
                          className={`w-4 h-4 ${colors.text} shrink-0`}
                        />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <a
                      href={demo.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        variant="default"
                        className="w-full bg-neon-pink hover:bg-neon-pink/80 group/btn"
                      >
                        Live Demo
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                    <a
                      href={demo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full group/btn">
                        <Github className="w-4 h-4 mr-2" />
                        Source
                      </Button>
                    </a>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="mb-16" id="portfolio">
          <h3 className="text-2xl md:text-3xl font-bold text-neon-cyan mb-2 text-center">
            Portfolio
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl text-center mx-auto">
            Real projects we&apos;ve built for real clients. These showcase our
            ability to deliver professional, tailored solutions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {portfolio.map((item) => {
              const IconComponent = getIcon(item.icon);
              const colors = colorClasses[item.color];

              return (
                <GlassCard key={item.slug} className="group" glow={item.color}>
                  {/* Image placeholder */}
                  <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden bg-muted/30 border border-border/50">
                    <Image
                      src={item.image}
                      alt={`${item.name} screenshot`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Fallback overlay for missing images */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted/80">
                      <div className={`p-3 rounded-xl ${colors.bg}`}>
                        <IconComponent className={`w-8 h-8 ${colors.text}`} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${colors.bg}`}>
                      <IconComponent className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold group-hover:text-neon-pink transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.shortDescription}
                      </p>
                    </div>
                  </div>

                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full group/btn">
                      Visit Site
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <div className="glass rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold gradient-text-animated mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-muted-foreground mb-8">
            Whether you need a custom solution or want to customize one of our
            templates, we&apos;re here to help bring your vision to life.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-neon-pink hover:bg-neon-pink/80 group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
