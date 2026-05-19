import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { products, getProductBySlug } from "@/lib/data/products";
import { GlassCard } from "@/components/ui/hero-card";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/dynamic-icon";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const colorClasses = {
    pink: {
      bg: "bg-neon-pink/10",
      text: "text-neon-pink",
      glow: "shadow-[0_0_50px_rgba(236,72,153,0.3)]",
      border: "border-neon-pink/30",
    },
    purple: {
      bg: "bg-neon-purple/10",
      text: "text-neon-purple",
      glow: "shadow-[0_0_50px_rgba(168,85,247,0.3)]",
      border: "border-neon-purple/30",
    },
    blue: {
      bg: "bg-neon-blue/10",
      text: "text-neon-blue",
      glow: "shadow-[0_0_50px_rgba(59,130,246,0.3)]",
      border: "border-neon-blue/30",
    },
    cyan: {
      bg: "bg-neon-cyan/10",
      text: "text-neon-cyan",
      glow: "shadow-[0_0_50px_rgba(34,211,238,0.3)]",
      border: "border-neon-cyan/30",
    },
  };
  const colors = colorClasses[product.color];

  const statusClasses = {
    available: "bg-green-500/20 text-green-400 border-green-500/30",
    "coming-soon": "bg-neon-purple/20 text-neon-purple border-neon-purple/30",
    beta: "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30",
  };

  // Get related products
  const relatedProducts = products.filter((p) => p.slug !== product.slug).slice(0, 2);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <Link href="/products">
          <Button variant="ghost" className="mb-8 text-neon-purple hover:text-neon-purple group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Button>
        </Link>

        {/* Hero */}
        <header className="text-center mb-16">
          <div className={`inline-flex p-6 rounded-3xl ${colors.bg} ${colors.glow} mb-6`}>
            <DynamicIcon name={product.icon} className={`w-16 h-16 ${colors.text}`} />
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-animated">
              {product.name}
            </h1>
            <span
              className={`text-sm px-3 py-1 rounded-full border ${statusClasses[product.status]}`}
            >
              {product.status === "coming-soon" ? "Coming Soon" : product.status}
            </span>
          </div>

          <p className={`text-xl ${colors.text} mb-4`}>{product.tagline}</p>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {product.shortDescription}
          </p>
        </header>

        {/* Description */}
        <section className="mb-16">
          <GlassCard glow={product.color}>
            <h2 className="text-2xl font-bold mb-4">About {product.name}</h2>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </GlassCard>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center gradient-text">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.features.map((feature, index) => {
              const featureColors = ["pink", "purple", "blue", "cyan"] as const;
              const featureColor = featureColors[index % featureColors.length];
              const fColors = colorClasses[featureColor];

              return (
                <GlassCard key={feature.title} glow={featureColor}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${fColors.bg}`}>
                      <DynamicIcon name={feature.icon} className={`w-6 h-6 ${fColors.text}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-16">
          <GlassCard className="text-center" glow="pink">
            {product.status === "available" ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Download {product.name} now and experience the difference.
                </p>
                <Button size="lg" className="bg-neon-pink hover:bg-neon-pink/80">
                  Download Now
                </Button>
              </>
            ) : product.status === "coming-soon" ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  {product.name} is currently in development. Sign up to be notified when we
                  launch!
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link href="/contact">
                    <Button size="lg" className="bg-neon-pink hover:bg-neon-pink/80 group">
                      Get Notified
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/blog">
                    <Button size="lg" className="bg-neon-purple hover:bg-neon-purple/80 group">
                      Read Our Blog
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Currently in Beta</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  {product.name} is in beta testing. Join our beta program to get early access!
                </p>
                <Link href="/contact">
                  <Button size="lg" className="bg-neon-cyan hover:bg-neon-cyan/80 group">
                    Join Beta Program
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </>
            )}
          </GlassCard>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Other Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProducts.map((related) => {
                const relatedColors = colorClasses[related.color];

                return (
                  <Link key={related.slug} href={`/products/${related.slug}`}>
                    <GlassCard className="h-full group cursor-pointer" glow={related.color}>
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${relatedColors.bg}`}>
                          <DynamicIcon name={related.icon} className={`w-6 h-6 ${relatedColors.text}`} />
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
