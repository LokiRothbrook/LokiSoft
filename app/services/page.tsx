import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { services } from "@/lib/data/services";
import { SectionTitle, GlassCard } from "@/components/ui/hero-card";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/dynamic-icon";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our professional web development, app development, mobile apps, and e-commerce solutions.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <SectionTitle
          title="Our Services"
          subtitle="Professional solutions tailored to your unique needs. We combine technical excellence with a commitment to your success."
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {services.map((service) => {
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
            const colors = colorClasses[service.color];

            return (
              <Link key={service.slug} href={`/services/${service.slug}`} className="block cursor-pointer">
                <GlassCard className="group h-full" glow={service.color}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-4 rounded-xl ${colors.bg}`}>
                      <DynamicIcon name={service.icon} className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2 group-hover:text-neon-pink transition-colors">
                        {service.name}
                      </h2>
                      <p className="text-muted-foreground">{service.shortDescription}</p>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className={`flex items-center gap-2 mb-4 px-3 py-2 rounded-lg ${colors.bg} w-fit`}>
                    <span className="text-sm font-medium">
                      {service.priceRange.low} – {service.priceRange.high}
                    </span>
                  </div>

                  {/* Features Preview */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className={`w-4 h-4 ${colors.text} shrink-0`} />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                    {service.features.length > 3 && (
                      <p className="text-sm text-muted-foreground pl-6">
                        +{service.features.length - 3} more features
                      </p>
                    )}
                  </div>

                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-neon-pink group-hover:bg-neon-pink/80 text-white font-medium transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="glass rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold gradient-text-animated mb-4">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-muted-foreground mb-8">
            We&apos;re happy to discuss your project and help you find the perfect solution.
            Every project is unique, and we&apos;re here to help.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-neon-pink hover:bg-neon-pink/80 group">
                Schedule a Consultation
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" className="bg-neon-purple hover:bg-neon-purple/80 group">
                Learn About Us
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
