export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: string[];
  color: "pink" | "purple" | "blue" | "cyan";
  priceRange: {
    low: string;
    high: string;
  };
}

export const services: Service[] = [
  {
    slug: "basic-business-portal",
    name: "Basic Business Portal",
    shortDescription: "Simple, professional websites for small businesses just getting started",
    description:
      "Get your business online quickly and affordably. Perfect for startups and small businesses that need a professional web presence without the complexity. We use proven templates to deliver a polished site fast, so you can focus on what matters—running your business.",
    icon: "Rocket",
    features: [
      "Professional template-based design",
      "Mobile responsive layout",
      "Contact form setup",
      "Basic SEO configuration",
      "Fast turnaround time",
      "Easy to update content",
    ],
    color: "cyan",
    priceRange: {
      low: "$99",
      high: "$299",
    },
  },
  {
    slug: "web-development",
    name: "Web Development",
    shortDescription: "Modern, responsive websites built with cutting-edge technologies",
    description:
      "We craft stunning, high-performance websites using the latest web technologies. From simple landing pages to complex web applications, our team delivers solutions that are fast, secure, and scalable. We specialize in React, Next.js, and modern JavaScript frameworks to create experiences that users love.",
    icon: "Globe",
    features: [
      "Custom website design and development",
      "Progressive Web Apps (PWA)",
      "API development and integration",
      "Performance optimization",
      "SEO-friendly architecture",
      "Responsive design for all devices",
    ],
    color: "pink",
    priceRange: {
      low: "$500",
      high: "$15,000+",
    },
  },
  {
    slug: "app-development",
    name: "App Development",
    shortDescription: "Powerful desktop and web applications for your business",
    description:
      "Transform your ideas into powerful applications that solve real problems. We build robust desktop and web applications with intuitive interfaces and reliable backends. Our development process focuses on user experience, maintainability, and long-term scalability.",
    icon: "AppWindow",
    features: [
      "Cross-platform desktop applications",
      "Electron-based solutions",
      "Cloud-native applications",
      "Real-time collaboration features",
      "Offline-first capabilities",
      "Enterprise-grade security",
    ],
    color: "purple",
    priceRange: {
      low: "$5,000",
      high: "$50,000+",
    },
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    shortDescription: "Native and cross-platform mobile apps for iOS and Android",
    description:
      "Reach your customers wherever they are with beautifully designed mobile applications. We develop native and cross-platform apps using React Native and Flutter that feel natural on any device. Our mobile solutions are optimized for performance, battery life, and user engagement.",
    icon: "Smartphone",
    features: [
      "iOS and Android development",
      "React Native & Flutter expertise",
      "Push notifications",
      "Offline data synchronization",
      "App Store optimization",
      "Analytics and crash reporting",
    ],
    color: "blue",
    priceRange: {
      low: "$8,000",
      high: "$75,000+",
    },
  },
  {
    slug: "ecommerce-solutions",
    name: "E-Commerce Solutions",
    shortDescription: "Complete online store solutions to grow your business",
    description:
      "Launch and scale your online business with our comprehensive e-commerce solutions. From custom storefronts to payment integration and inventory management, we build platforms that drive sales and delight customers. Our solutions are designed for conversion, security, and scalability.",
    icon: "ShoppingCart",
    features: [
      "Custom storefront development",
      "Payment gateway integration",
      "Inventory management systems",
      "Order processing automation",
      "Customer analytics dashboard",
      "Multi-currency support",
    ],
    color: "cyan",
    priceRange: {
      low: "$2,500",
      high: "$40,000+",
    },
  },
  {
    slug: "custom-software",
    name: "Custom Software",
    shortDescription: "Tailored software solutions for your unique challenges",
    description:
      "When off-the-shelf solutions don't fit, we build custom software tailored to your exact needs. Our team works closely with you to understand your workflows, challenges, and goals, then creates software that transforms how you work. From internal tools to customer-facing platforms, we deliver solutions that make a difference.",
    icon: "Code",
    features: [
      "Requirements analysis and planning",
      "Custom business logic implementation",
      "Legacy system modernization",
      "Third-party integrations",
      "Automated testing and QA",
      "Ongoing maintenance and support",
    ],
    color: "pink",
    priceRange: {
      low: "$10,000",
      high: "$100,000+",
    },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServices(): Service[] {
  return services;
}
