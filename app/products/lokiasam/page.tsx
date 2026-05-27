import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import { getProductBySlug, products } from "@/lib/data/products";
import { GlassCard } from "@/components/ui/hero-card";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { LokiASAMDownloads } from "@/components/ui/lokiasam-downloads";
import { LokiASAMGallery } from "@/components/ui/lokiasam-gallery";

export const metadata: Metadata = {
  title: "LokiASAM — ARK: Survival Ascended Server Manager",
  description:
    "A free, open-source desktop manager for ARK: Survival Ascended dedicated servers on Windows and Linux. Server management, mod browser, RCON console, automated backups, and more.",
};

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
} as const;

export default function LokiASAMPage() {
  const product = getProductBySlug("lokiasam")!;
  const colors = colorClasses[product.color];

  const relatedProducts = products
    .filter((p) => p.slug !== "lokiasam")
    .slice(0, 2);

  const featureColors = ["pink", "purple", "blue", "cyan"] as const;

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
          <div className={`inline-flex p-4 rounded-3xl ${colors.bg} ${colors.glow} mb-6`}>
            <Image
              src="/images/lokiasam-icon.svg"
              alt="LokiASAM icon"
              width={96}
              height={96}
              className="w-24 h-24"
              priority
            />
          </div>

          <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-animated">
              LokiASAM
            </h1>
            <span className="text-sm px-3 py-1 rounded-full border bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30">
              Beta
            </span>
          </div>

          <p className={`text-xl ${colors.text} mb-4`}>{product.tagline}</p>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {product.shortDescription}
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://github.com/LokiRothbrook/LokiASAM"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="border-white/20 hover:border-white/40 group">
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </Button>
            </a>
            <a
              href="https://github.com/LokiRothbrook/LokiASAM/releases"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="border-white/20 hover:border-white/40 group">
                All Releases
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </header>

        {/* Downloads */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center gradient-text">Download LokiASAM</h2>
          <LokiASAMDownloads />
        </section>

        {/* Screenshots */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center gradient-text">Screenshots</h2>
          <LokiASAMGallery />
        </section>

        {/* About */}
        <section className="mb-16">
          <GlassCard glow={product.color}>
            <h2 className="text-2xl font-bold mb-4">About LokiASAM</h2>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            <ul className="mt-4 space-y-1.5 text-muted-foreground text-sm list-disc list-inside">
              <li>Built with Tauri v2, Next.js, and Rust — native performance on Windows and Linux</li>
              <li>No browser required, no monthly subscription, no cloud dependency</li>
              <li>Free and open-source under the GNU GPL v3.0</li>
              <li>Auto-updates keep the app current without any manual reinstalls</li>
              <li>Proton-GE support on Linux to run the Windows server binary natively</li>
            </ul>
          </GlassCard>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center gradient-text">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.features.map((feature, index) => {
              const fc = featureColors[index % featureColors.length];
              const fColors = colorClasses[fc];
              return (
                <GlassCard key={feature.title} glow={fc}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${fColors.bg} shrink-0`}>
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
                        <div className={`p-3 rounded-xl ${relatedColors.bg} shrink-0`}>
                          <DynamicIcon
                            name={related.icon}
                            className={`w-6 h-6 ${relatedColors.text}`}
                          />
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
