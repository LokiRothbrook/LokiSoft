/**
 * Homepage Configuration
 *
 * This file contains all the content for the homepage.
 * Update these values to customize the homepage for your company.
 */

export interface HeroHighlight {
  text: string;
  className: string;
}

export interface AboutCard {
  icon: string;
  title: string;
  description: string;
  color: "pink" | "purple" | "blue" | "cyan";
}

export interface HomepageConfig {
  // Hero Section
  hero: {
    tagline: string;
    highlights: HeroHighlight[];
  };

  // Announcements Section
  announcements: {
    title: string;
    subtitle: string;
  };

  // Featured Posts Section
  featuredPosts: {
    title: string;
    subtitle: string;
  };

  // About Section (on homepage)
  about: {
    title: string;
    subtitle: string;
    cards: AboutCard[];
  };

  // Services Section
  services: {
    title: string;
    subtitle: string;
  };

  // Products Section
  products: {
    title: string;
    subtitle: string;
  };

  // CTA Section
  cta: {
    title: string;
    description: string;
  };
}

export const homepageConfig: HomepageConfig = {
  // Hero Section
  hero: {
    tagline: "Open source software built on Christian Values and the Freedom of Knowledge for everyone!",
    highlights: [
      { text: "Christian Values", className: "text-neon-pink" },
      { text: "Freedom of Knowledgde", className: "text-neon-cyan" },
    ],
  },

  // Announcements Section
  announcements: {
    title: "Announcements",
    subtitle: "Stay up to date with the latest news",
  },

  // Featured Posts Section
  featuredPosts: {
    title: "Featured Posts",
    subtitle: "Explore our latest articles, tutorials, and insights",
  },

  // About Section (on homepage)
  about: {
    title: "About Us",
    subtitle: "Building software that makes a difference",
    cards: [
      {
        icon: "Heart",
        title: "Our Mission",
        description:
          "Here at LokiSoft, We believe in the freedom of knowledge and a shared love for God. We're committed to creating open source software that empowers individuals and businesses. We believe technology should be accessible to everyone, and knowledge should be freely shared. For everything else, In God we Trust!",
        color: "cyan",
      },
      {
        icon: "Sparkles",
        title: "Our Values",
        description:
          "Integrity, excellence, and God guide everything we do. We build software with care, treat our clients like family, and always strive to do what's right, not just what's profitable.",
        color: "pink",
      },
      {
        icon: "BookOpen",
        title: "Open Source First",
        description:
          "We believe in the power of open source. Our tools and libraries are available for everyone to use, modify, and learn from. Knowledge shared is knowledge multiplied.",
        color: "purple",
      },
      {
        icon: "Users",
        title: "Community Driven",
        description:
          "We're building more than software, we're building a community. Join us on Discord, contribute to our projects, or just say hello. Everyone is welcome here.",
        color: "blue",
      },
    ],
  },

  // Services Section
  services: {
    title: "Our Services",
    subtitle: "Professional solutions tailored to your needs",
  },

  // Products Section
  products: {
    title: "Our Products",
    subtitle: "Software solutions designed to make your life easier",
  },

  // CTA Section
  cta: {
    title: "Ready to Get Started?",
    description:
      "Whether you need custom software, want to explore our products, or just want to chat about your project, we're here to help.",
  },
};
