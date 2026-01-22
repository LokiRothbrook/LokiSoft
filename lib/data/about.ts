/**
 * About Page Configuration
 *
 * This file contains all the content for the About page.
 * Update these values to customize the about page for your company.
 */

export interface Value {
  icon: string;
  title: string;
  description: string;
  color: "pink" | "purple" | "blue" | "cyan";
}

export interface Principle {
  icon: string;
  title: string;
  description: string;
}

export interface Scripture {
  text: string;
  reference: string;
}

export interface AboutConfig {
  // Hero Section
  hero: {
    title: string;
    description: string;
  };

  // Our Story Section
  story: {
    title: string;
    subtitle: string;
    paragraphs: string[];
  };

  // Values Section
  values: {
    title: string;
    subtitle: string;
    items: Value[];
  };

  // Principles Section
  principles: {
    title: string;
    subtitle: string;
    items: Principle[];
  };

  // Scripture/Quote Section (optional - set to null to hide)
  scripture: Scripture | null;

  // CTA Section
  cta: {
    title: string;
    description: string;
    primaryButton: {
      text: string;
      href: string;
    };
    secondaryButton: {
      text: string;
      href: string;
    };
  };
}

export const aboutConfig: AboutConfig = {
  // Hero Section
  hero: {
    title: "Building Software That Matters",
    description:
      "We're a Christian values company committed to open source and the freedom of knowledge for everyone. Our mission is to create technology that empowers, educates, and serves.",
  },

  // Our Story Section
  story: {
    title: "Our Story",
    subtitle: "How LokiSoft came to be",
    paragraphs: [
      "LokiSoft was founded with a simple belief: technology should serve people, not the other way around. Too often, we see companies that prioritize profit over people, surveillance over privacy, and proprietary solutions over shared knowledge.",
      "We decided to do things differently. Guided by our Christian faith, we set out to build a company that reflects our values—one that treats every client, contributor, and community member with dignity and respect.",
      "Today, we're building products that help people take control of their digital lives, offering services that empower businesses to succeed, and sharing everything we learn along the way. We believe that when we lift others up, everyone rises together.",
    ],
  },

  // Values Section
  values: {
    title: "Our Values",
    subtitle: "The principles that guide everything we do",
    items: [
      {
        icon: "Heart",
        title: "Faith-Driven",
        description:
          "Our Christian values guide every decision we make. We believe in treating others as we want to be treated, with honesty, respect, and compassion.",
        color: "pink",
      },
      {
        icon: "Code",
        title: "Open Source First",
        description:
          "We believe knowledge should be freely shared. Our tools, libraries, and even this website are open source for everyone to use and learn from.",
        color: "cyan",
      },
      {
        icon: "Shield",
        title: "Integrity Always",
        description:
          "We do what's right, not what's easy or profitable. Your trust is more valuable to us than any contract.",
        color: "purple",
      },
      {
        icon: "Users",
        title: "Community Focused",
        description:
          "We're building more than software—we're building a community of people who share our values and vision.",
        color: "blue",
      },
      {
        icon: "Sparkles",
        title: "Excellence in Craft",
        description:
          "We take pride in our work. Every line of code, every design decision, every interaction reflects our commitment to quality.",
        color: "pink",
      },
      {
        icon: "Target",
        title: "Purpose-Driven",
        description:
          "We exist to serve, not just to profit. Our goal is to create technology that genuinely helps people and glorifies God.",
        color: "cyan",
      },
    ],
  },

  // Principles Section
  principles: {
    title: "What We Believe",
    subtitle: "The foundations of our work",
    items: [
      {
        icon: "BookOpen",
        title: "Freedom of Knowledge",
        description:
          "Everyone deserves access to the tools and knowledge they need to succeed. We share what we learn and build tools that empower others.",
      },
      {
        icon: "Lightbulb",
        title: "Innovation with Purpose",
        description:
          "We don't build technology for its own sake. Every project we take on solves a real problem and makes a meaningful difference.",
      },
      {
        icon: "Shield",
        title: "Privacy Respected",
        description:
          "Your data is yours. We design our products with privacy first, never selling or exploiting user information.",
      },
    ],
  },

  // Scripture/Quote Section
  scripture: {
    text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
    reference: "Colossians 3:23",
  },

  // CTA Section
  cta: {
    title: "Let's Work Together",
    description:
      "Whether you need custom software, want to use our products, or just want to be part of our community—we'd love to connect with you.",
    primaryButton: {
      text: "Get in Touch",
      href: "/contact",
    },
    secondaryButton: {
      text: "View Our Services",
      href: "/services",
    },
  },
};
