export interface Demo {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: string;
  color: "pink" | "purple" | "blue" | "cyan";
  liveUrl: string;
  githubUrl: string;
  image: string;
  features: string[];
}

export interface PortfolioItem {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: string;
  color: "pink" | "purple" | "blue" | "cyan";
  liveUrl: string;
  image: string;
}

export const demos: Demo[] = [
  {
    slug: "business-portal",
    name: "Business Portal",
    shortDescription: "Professional business website template",
    description:
      "A clean, modern business portal template perfect for small to medium businesses. Features a professional design with contact forms, service showcases, and about sections.",
    icon: "Building2",
    color: "blue",
    liveUrl: "https://business.demo.lokisoft.xyz/",
    githubUrl: "https://github.com/LokiRothbrook/Business-Portal-Template",
    image: "/images/demos/business-portal.png",
    features: [
      "Responsive design",
      "Contact form integration",
      "Service showcase",
      "Modern UI/UX",
    ],
  },
  {
    slug: "lawn-care",
    name: "Lawn Care Portal",
    shortDescription: "Service-based business template for lawn care companies",
    description:
      "A specialized template designed for lawn care and landscaping businesses. Includes service listings, booking functionality, and testimonials sections.",
    icon: "TreePine",
    color: "cyan",
    liveUrl: "https://lawncare.demo.lokisoft.xyz/",
    githubUrl: "https://github.com/LokiRothbrook/Lawn-Portal-Template",
    image: "/images/demos/lawn-care.png",
    features: [
      "Service booking system",
      "Testimonials section",
      "Service area display",
      "Seasonal pricing",
    ],
  },
  {
    slug: "power-wash",
    name: "Power Wash Portal",
    shortDescription: "Template for power washing and cleaning services",
    description:
      "A bold, professional template designed for power washing and exterior cleaning businesses. Features before/after galleries, service packages, and quote request forms.",
    icon: "Droplets",
    color: "purple",
    liveUrl: "https://powerwash.demo.lokisoft.xyz/",
    githubUrl: "https://github.com/LokiRothbrook/PowerWash-Portal-Template",
    image: "/images/demos/power-wash.png",
    features: [
      "Before/after gallery",
      "Service packages",
      "Quote request form",
      "Portfolio showcase",
    ],
  },
  {
    slug: "ecommerce",
    name: "E-Commerce Store",
    shortDescription: "Full-featured online store template",
    description:
      "A complete e-commerce solution with product catalogs, shopping cart, and checkout functionality. Perfect for businesses looking to sell products online.",
    icon: "ShoppingBag",
    color: "pink",
    liveUrl: "https://ecom.demo.lokisoft.xyz/",
    githubUrl: "https://github.com/LokiRothbrook/ecom-template",
    image: "/images/demos/ecommerce.png",
    features: [
      "Product catalog",
      "Shopping cart",
      "Checkout system",
      "Inventory management",
    ],
  },
];

export const portfolio: PortfolioItem[] = [
  {
    slug: "cherished-memories",
    name: "Cherished Memories",
    shortDescription: "Memorial and keepsake services website",
    description:
      "A heartfelt website designed for a memorial and keepsake services company, featuring elegant design and easy navigation for clients during sensitive times.",
    icon: "Heart",
    color: "pink",
    liveUrl: "https://memories.lokisoft.xyz/",
    image: "/images/portfolio/cherished-memories.png",
  },
  {
    slug: "lawncare-pro",
    name: "Lawncare Pro",
    shortDescription: "Professional lawn care company website",
    description:
      "A custom-built website for a professional lawn care company, showcasing their services, service areas, and easy booking options.",
    icon: "TreePine",
    color: "cyan",
    liveUrl: "https://lawncare.lokisoft.xyz/",
    image: "/images/portfolio/lawncare-pro.png",
  },
  {
    slug: "powerpros",
    name: "PowerPro's",
    shortDescription: "Power washing services website",
    description:
      "A dynamic website for a power washing company featuring service showcases, gallery, and contact integration.",
    icon: "Droplets",
    color: "blue",
    liveUrl: "https://powerwash.lokisoft.xyz/",
    image: "/images/portfolio/powerpros.png",
  },
];

export function getDemoBySlug(slug: string): Demo | undefined {
  return demos.find((d) => d.slug === slug);
}

export function getPortfolioItemBySlug(slug: string): PortfolioItem | undefined {
  return portfolio.find((p) => p.slug === slug);
}

export function getAllDemos(): Demo[] {
  return demos;
}

export function getAllPortfolioItems(): PortfolioItem[] {
  return portfolio;
}
