"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight, Github } from "lucide-react";
import { NeonLogo } from "@/components/ui/neon-logo";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data/services";
import { products } from "@/lib/data/products";
import { getIcon } from "@/lib/icons";

const GITHUB_REPO_URL = process.env.NEXT_PUBLIC_GITHUB_REPO_URL || "https://github.com/LokiRothbrook/lokisoft";

interface NavbarProps {
  posts?: {
    slug: string;
    title: string;
    excerpt?: string;
    categories?: string[];
  }[];
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "About", href: "/about" },
];

function DropdownItem({
  href,
  icon,
  name,
  description,
  color,
  onClick,
}: {
  href: string;
  icon: string;
  name: string;
  description: string;
  color: string;
  onClick?: () => void;
}) {
  const IconComponent = getIcon(icon);

  // Colors are always shown, hover only adds glow effect
  const colorClasses = {
    pink: {
      icon: "text-neon-pink",
      text: "text-neon-pink",
      glow: "group-hover:shadow-[0_0_10px_rgba(236,72,153,0.5)]",
    },
    purple: {
      icon: "text-neon-purple",
      text: "text-neon-purple",
      glow: "group-hover:shadow-[0_0_10px_rgba(168,85,247,0.5)]",
    },
    blue: {
      icon: "text-neon-blue",
      text: "text-neon-blue",
      glow: "group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]",
    },
    cyan: {
      icon: "text-neon-cyan",
      text: "text-neon-cyan",
      glow: "group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]",
    },
  };

  const classes = colorClasses[color as keyof typeof colorClasses];

  return (
    <Link href={href} onClick={onClick}>
      <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all">
        <div
          className={`p-2 rounded-lg bg-muted/50 transition-all ${classes.icon} ${classes.glow}`}
        >
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className={`font-medium text-sm transition-colors ${classes.text}`}>{name}</p>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{description}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all mt-1" />
      </div>
    </Link>
  );
}

export function Navbar({ posts = [] }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const handleMouseEnter = (label: string) => {
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-strong shadow-lg backdrop-blur-md" : "backdrop-blur-md"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <NeonLogo size="md" />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.hasDropdown && handleMouseEnter(link.label)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={link.href}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === link.href
                    ? "text-neon-pink bg-neon-pink/10"
                    : "text-neon-purple hover:bg-neon-purple/10"
                }`}
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`}
                  />
                )}
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {link.hasDropdown && openDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 glass-strong rounded-xl shadow-xl overflow-hidden"
                  >
                    <div className="p-2 text-neon-blue backdrop-blur-sm">
                      {/* All Services/Products Link */}
                      <Link href={link.href}>
                        <div className="group flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-neon-pink/10 to-neon-purple/10 hover:from-neon-pink/20 hover:to-neon-purple/20 transition-all mb-2">
                          <span className="font-medium text-sm">
                            All {link.label}
                          </span>
                          <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>

                      <div className="h-px bg-border/50 my-2" />

                      {/* Items */}
                      {link.label === "Services" &&
                        services.map((service) => (
                          <DropdownItem
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            icon={service.icon}
                            name={service.name}
                            description={service.shortDescription}
                            color={service.color}
                          />
                        ))}

                      {link.label === "Products" &&
                        products.map((product) => (
                          <DropdownItem
                            key={product.slug}
                            href={`/products/${product.slug}`}
                            icon={product.icon}
                            name={product.name}
                            description={product.shortDescription}
                            color={product.color}
                          />
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <SearchBar posts={posts} />
          <Link href="/contact" className="hidden sm:block">
            <Button variant="default" size="sm" className="bg-neon-pink hover:bg-neon-pink/80">
              Contact Us
            </Button>
          </Link>

          {/* Source Button with Tooltip */}
          <div className="relative group hidden sm:block">
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-foreground/90 hover:text-foreground bg-zinc-700/80 hover:bg-zinc-600/80 border border-zinc-600/50 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>Source</span>
            </a>
            {/* Tooltip */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
              <div className="glass-strong px-3 py-2 rounded-lg text-xs text-foreground whitespace-nowrap shadow-lg border border-neon-purple/30">
                <span className="text-neon-cyan">View this website&apos;s source code on GitHub</span>
              </div>
              {/* Tooltip arrow */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 glass-strong border-l border-t border-neon-purple/30" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-border/50 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      pathname === link.href
                        ? "text-neon-pink bg-neon-pink/10"
                        : "text-foreground hover:bg-muted/50"
                    }`}
                    onClick={() => !link.hasDropdown && setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openDropdown === link.label ? "rotate-180" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenDropdown(openDropdown === link.label ? null : link.label);
                        }}
                      />
                    )}
                  </Link>

                  {/* Mobile Dropdown */}
                  <AnimatePresence>
                    {link.hasDropdown && openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 overflow-hidden"
                      >
                        {link.label === "Services" &&
                          services.map((service) => (
                            <DropdownItem
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              icon={service.icon}
                              name={service.name}
                              description={service.shortDescription}
                              color={service.color}
                              onClick={() => setIsMobileMenuOpen(false)}
                            />
                          ))}

                        {link.label === "Products" &&
                          products.map((product) => (
                            <DropdownItem
                              key={product.slug}
                              href={`/products/${product.slug}`}
                              icon={product.icon}
                              name={product.name}
                              description={product.shortDescription}
                              color={product.color}
                              onClick={() => setIsMobileMenuOpen(false)}
                            />
                          ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Mobile Contact & Source Buttons */}
              <div className="pt-2 space-y-2 sm:hidden">
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full bg-neon-pink hover:bg-neon-pink/80">
                    Contact Us
                  </Button>
                </Link>
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg text-sm font-medium text-foreground/90 bg-zinc-700/80 hover:bg-zinc-600/80 border border-zinc-600/50 transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>View Source on GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
