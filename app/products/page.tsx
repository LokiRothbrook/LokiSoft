import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data/products";
import { SectionTitle, GlassCard } from "@/components/ui/hero-card";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/dynamic-icon";

export const metadata: Metadata = {
  title: "Products",
  description: "Discover our software products designed to make your life easier - from financial management to cloud storage.",
};

export default function ProductsPage() {
  const colorClasses = {
    pink: {
      bg: "bg-neon-pink/10",
      text: "text-neon-pink",
    },
    purple: {
      bg: "bg-neon-purple/10",
      text: "text-neon-purple",
    },
    blue: {
      bg: "bg-neon-blue/10",
      text: "text-neon-blue",
    },
    cyan: {
      bg: "bg-neon-cyan/10",
      text: "text-neon-cyan",
    },
  };

  const statusClasses = {
    available: "bg-green-500/20 text-green-400 border-green-500/30",
    "coming-soon": "bg-neon-purple/20 text-neon-purple border-neon-purple/30",
    beta: "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30",
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <SectionTitle
          title="Our Products"
          subtitle="Software solutions designed to solve real problems. Built with care, quality, and a commitment to your success."
        />

        {/* Products List */}
        <div className="space-y-8 max-w-4xl mx-auto mb-16">
          {products.map((product) => {
            const colors = colorClasses[product.color];

            return (
              <Link key={product.slug} href={`/products/${product.slug}`}>
                <GlassCard className="group cursor-pointer" glow={product.color}>
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Icon */}
                    <div className={`p-4 rounded-2xl ${colors.bg} shrink-0 w-fit`}>
                      <DynamicIcon name={product.icon} className={`w-10 h-10 ${colors.text}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold group-hover:text-neon-pink transition-colors">
                          {product.name}
                        </h2>
                        <span
                          className={`text-xs px-2 py-1 rounded-full border ${statusClasses[product.status]}`}
                        >
                          {product.status === "coming-soon" ? "Coming Soon" : product.status}
                        </span>
                      </div>

                      <p className={`text-sm ${colors.text} mb-2`}>{product.tagline}</p>

                      <p className="text-muted-foreground mb-4">{product.shortDescription}</p>

                      {/* Features Preview */}
                      <div className="flex flex-wrap gap-2">
                        {product.features.slice(0, 4).map((feature) => (
                          <span
                            key={feature.title}
                            className="text-xs px-3 py-1 rounded-full bg-muted/50 text-muted-foreground"
                          >
                            {feature.title}
                          </span>
                        ))}
                        {product.features.length > 4 && (
                          <span className="text-xs px-3 py-1 rounded-full bg-muted/50 text-muted-foreground">
                            +{product.features.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-neon-pink group-hover:translate-x-1 transition-all shrink-0 hidden md:block" />
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="glass rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold gradient-text-animated mb-4">
            Have a Product Idea?
          </h2>
          <p className="text-muted-foreground mb-8">
            We&apos;re always looking for new projects. If you have an idea for a product or want
            to collaborate, we&apos;d love to hear from you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-neon-pink hover:bg-neon-pink/80 group">
                Get in Touch
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" className="bg-neon-purple hover:bg-neon-purple/80 group">
                View Our Services
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
