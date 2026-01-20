import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, DollarSign } from "lucide-react";
import { services, getServiceBySlug } from "@/lib/data/services";
import { GlassCard } from "@/components/ui/hero-card";
import { Button } from "@/components/ui/button";
import { getIcon } from "@/lib/icons";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.name,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const IconComponent = getIcon(service.icon);
  const colorClasses = {
    pink: {
      bg: "bg-neon-pink/10",
      text: "text-neon-pink",
      glow: "shadow-[0_0_50px_rgba(236,72,153,0.3)]",
    },
    purple: {
      bg: "bg-neon-purple/10",
      text: "text-neon-purple",
      glow: "shadow-[0_0_50px_rgba(168,85,247,0.3)]",
    },
    blue: {
      bg: "bg-neon-blue/10",
      text: "text-neon-blue",
      glow: "shadow-[0_0_50px_rgba(59,130,246,0.3)]",
    },
    cyan: {
      bg: "bg-neon-cyan/10",
      text: "text-neon-cyan",
      glow: "shadow-[0_0_50px_rgba(34,211,238,0.3)]",
    },
  };
  const colors = colorClasses[service.color];

  // Get related services (exclude current)
  const relatedServices = services.filter((s) => s.slug !== service.slug).slice(0, 2);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <Link href="/services">
          <Button variant="ghost" className="mb-8 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Button>
        </Link>

        {/* Header */}
        <header className="text-center mb-16">
          <div className={`inline-flex p-6 rounded-3xl ${colors.bg} ${colors.glow} mb-6`}>
            <IconComponent className={`w-16 h-16 ${colors.text}`} />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-animated mb-4">
            {service.name}
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            {service.shortDescription}
          </p>

          {/* Price Range */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.bg} border border-current/20`}>
            <DollarSign className={`w-5 h-5 ${colors.text}`} />
            <span className="font-semibold">
              {service.priceRange.low} – {service.priceRange.high}
            </span>
          </div>
        </header>

        {/* Description */}
        <section className="mb-12">
          <GlassCard glow={service.color}>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">{service.description}</p>
          </GlassCard>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 gradient-text">What&apos;s Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features.map((feature, index) => (
              <div
                key={feature}
                className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <CheckCircle className={`w-5 h-5 ${colors.text} shrink-0 mt-0.5`} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-16">
          <GlassCard className="text-center" glow="pink">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Let&apos;s discuss your project and see how we can help bring your vision to life.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-neon-pink hover:bg-neon-pink/80 group">
                  Get a Quote
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Schedule a Call
                </Button>
              </Link>
            </div>
          </GlassCard>
        </section>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Other Services You Might Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedServices.map((related) => {
                const RelatedIcon = getIcon(related.icon);
                const relatedColors = colorClasses[related.color];

                return (
                  <Link key={related.slug} href={`/services/${related.slug}`}>
                    <GlassCard className="h-full group cursor-pointer" glow={related.color}>
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${relatedColors.bg}`}>
                          <RelatedIcon className={`w-6 h-6 ${relatedColors.text}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1 group-hover:text-neon-pink transition-colors">
                            {related.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {related.shortDescription}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-neon-pink group-hover:translate-x-1 transition-all" />
                      </div>
                    </GlassCard>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
