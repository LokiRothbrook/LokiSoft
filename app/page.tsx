import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Heart,
  Users,
  BookOpen,
} from "lucide-react";
import { NeonLogoAnimated } from "@/components/ui/neon-logo";
import { HeroCard, GlassCard, SectionTitle } from "@/components/ui/hero-card";
import { Button } from "@/components/ui/button";
import { FeaturedPosts } from "@/components/home/featured-posts";
import { Announcements } from "@/components/home/announcements";
import { getAllPosts, getAnnouncements, getFeaturedPosts } from "@/lib/blog";
import { services } from "@/lib/data/services";
import { products } from "@/lib/data/products";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "LokiSoft - Open Source Software Built on Christian Values",
};

export default function HomePage() {
  const allPosts = getAllPosts();
  const announcements = getAnnouncements(3);
  const featuredPosts = getFeaturedPosts(6);

  return (
    <div className="relative">
      {/* Hero Section - Logo */}
      <HeroCard gradient="mixed">
        <div className="container mx-auto px-4 text-center">
          <NeonLogoAnimated />

          <p className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Open source software built on{" "}
            <span className="text-neon-pink">Christian values</span> and the{" "}
            <span className="text-neon-cyan">freedom of knowledge</span> for everyone.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/services">
              <Button size="lg" className="bg-neon-pink hover:bg-neon-pink/80 group">
                Explore Services
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button size="lg" className="bg-neon-purple hover:bg-neon-purple/80 group py-6 text-lg">
                Explore Blog
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" className="bg-neon-blue hover:bg-neon-blue/80 group">
                View Products
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <div className="w-8 h-12 mx-auto rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-neon-pink rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </HeroCard>

      {/* Announcements Section */}
      <HeroCard gradient="pink">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Announcements"
            subtitle="Stay up to date with the latest news from LokiSoft"
          />
          <div className="max-w-3xl mx-auto">
            <Announcements announcements={announcements} />
          </div>
        </div>
      </HeroCard>

      {/* Featured Posts Section */}
      <HeroCard gradient="purple">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Featured Posts"
            subtitle="Explore our latest articles, tutorials, and insights"
          />
          <FeaturedPosts initialPosts={featuredPosts} allPosts={allPosts} />

          <div className="mt-8 text-center">
            <Link href="/blog">
              <Button variant="outline" size="lg" className="group">
                View All Posts
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </HeroCard>

      {/* About Section */}
      <HeroCard gradient="blue">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="About LokiSoft"
            subtitle="Building software that makes a difference"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <GlassCard glow="cyan">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-neon-cyan/10">
                  <Heart className="w-8 h-8 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                  <p className="text-muted-foreground">
                    We&apos;re a Christian values company committed to creating open source
                    software that empowers individuals and businesses. We believe technology
                    should be accessible to everyone, and knowledge should be freely shared.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard glow="pink">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-neon-pink/10">
                  <Sparkles className="w-8 h-8 text-neon-pink" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                  <p className="text-muted-foreground">
                    Integrity, excellence, and service guide everything we do. We build software
                    with care, treat our clients like family, and always strive to do what&apos;s
                    right—not just what&apos;s profitable.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard glow="purple">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-neon-purple/10">
                  <BookOpen className="w-8 h-8 text-neon-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Open Source First</h3>
                  <p className="text-muted-foreground">
                    We believe in the power of open source. Our tools and libraries are available
                    for everyone to use, modify, and learn from. Knowledge shared is knowledge
                    multiplied.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard glow="blue">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-neon-blue/10">
                  <Users className="w-8 h-8 text-neon-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                  <p className="text-muted-foreground">
                    We&apos;re building more than software—we&apos;re building a community. Join us on
                    Discord, contribute to our projects, or just say hello. Everyone is welcome
                    here.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="mt-8 text-center">
            <Link href="/about">
              <Button variant="outline" size="lg" className="group">
                Learn More About Us
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </HeroCard>

      {/* Services Section */}
      <HeroCard gradient="cyan">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Services"
            subtitle="Professional solutions tailored to your needs"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const IconComponent = getIcon(service.icon);
              const colorClasses = {
                pink: "bg-neon-pink/10 text-neon-pink",
                purple: "bg-neon-purple/10 text-neon-purple",
                blue: "bg-neon-blue/10 text-neon-blue",
                cyan: "bg-neon-cyan/10 text-neon-cyan",
              };

              return (
                <Link key={service.slug} href={`/services/${service.slug}`}>
                  <GlassCard className="h-full group cursor-pointer" glow={service.color}>
                    <div className={`p-3 rounded-xl ${colorClasses[service.color]} w-fit mb-4`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-neon-pink transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{service.shortDescription}</p>
                    <div className="mt-4 flex items-center text-sm text-muted-foreground group-hover:text-neon-pink transition-colors">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link href="/services">
              <Button variant="outline" size="lg" className="group">
                View All Services
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </HeroCard>

      {/* Products Section */}
      <HeroCard gradient="mixed">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Products"
            subtitle="Software solutions designed to make your life easier"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {products.map((product) => {
              const IconComponent = getIcon(product.icon);
              const colorClasses = {
                pink: "bg-neon-pink/10 text-neon-pink",
                purple: "bg-neon-purple/10 text-neon-purple",
                blue: "bg-neon-blue/10 text-neon-blue",
                cyan: "bg-neon-cyan/10 text-neon-cyan",
              };
              const statusClasses = {
                available: "bg-green-500/20 text-green-400",
                "coming-soon": "bg-neon-purple/20 text-neon-purple",
                beta: "bg-neon-cyan/20 text-neon-cyan",
              };

              return (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  <GlassCard className="h-full group cursor-pointer" glow={product.color}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${colorClasses[product.color]}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${statusClasses[product.status]}`}
                      >
                        {product.status === "coming-soon" ? "Coming Soon" : product.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-neon-pink transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-neon-cyan mb-2">{product.tagline}</p>
                    <p className="text-sm text-muted-foreground">{product.shortDescription}</p>
                    <div className="mt-4 flex items-center text-sm text-muted-foreground group-hover:text-neon-pink transition-colors">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link href="/products">
              <Button variant="outline" size="lg" className="group">
                View All Products
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </HeroCard>

      {/* CTA Section */}
      <HeroCard gradient="pink">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text-animated mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you need custom software, want to explore our products, or just want to
              chat about your project—we&apos;re here to help.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-neon-pink hover:bg-neon-pink/80 group">
                  Contact Us
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="group">
                  Explore Services
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </HeroCard>
    </div>
  );
}
