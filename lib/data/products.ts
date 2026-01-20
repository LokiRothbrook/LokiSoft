export interface Product {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  status: "available" | "coming-soon" | "beta";
  color: "pink" | "purple" | "blue" | "cyan";
}

export const products: Product[] = [
  {
    slug: "lokimoney",
    name: "LokiMoney",
    tagline: "Take control of your finances",
    shortDescription: "A comprehensive financial management app that helps you understand and control your money",
    description:
      "LokiMoney is your personal financial command center. Stop wondering where your money goes and start taking control. Our intelligent financial management app analyzes your spending patterns, tracks recurring payments, finds forgotten subscriptions, and helps you plan for the future with powerful forecasting tools. Whether you're saving for a goal, paying off debt, or just want to understand your finances better, LokiMoney gives you the insights you need to make smarter decisions.",
    icon: "Wallet",
    features: [
      {
        title: "Future Forecasting",
        description:
          "Visualize your financial future with predictive graphs that show where you're headed based on current spending patterns.",
        icon: "TrendingUp",
      },
      {
        title: "Recurring Analysis",
        description:
          "Automatically detect and categorize recurring charges so you always know what's coming out of your account.",
        icon: "RefreshCw",
      },
      {
        title: "Subscription Finder",
        description:
          "Discover forgotten subscriptions and services you're still paying for but no longer use.",
        icon: "Search",
      },
      {
        title: "Complete Reporting",
        description:
          "Generate detailed reports on spending, income, and savings with customizable date ranges and categories.",
        icon: "FileText",
      },
      {
        title: "Transaction Registry",
        description:
          "Keep a complete, searchable history of all your transactions with smart tagging and notes.",
        icon: "List",
      },
      {
        title: "Budget Planning",
        description:
          "Set budgets for different categories and get alerts when you're approaching your limits.",
        icon: "Target",
      },
    ],
    status: "coming-soon",
    color: "cyan",
  },
  {
    slug: "lokicloud",
    name: "LokiCloud",
    tagline: "Your data, your control",
    shortDescription: "Self-hosted cloud storage and sync solution with end-to-end encryption",
    description:
      "LokiCloud gives you the convenience of cloud storage without sacrificing privacy. Host your own cloud infrastructure with our easy-to-deploy solution that syncs across all your devices. With end-to-end encryption and zero-knowledge architecture, your data stays yours.",
    icon: "Cloud",
    features: [
      {
        title: "End-to-End Encryption",
        description: "Your files are encrypted before they leave your device. Only you can read them.",
        icon: "Lock",
      },
      {
        title: "Cross-Platform Sync",
        description: "Seamlessly sync files across Windows, Mac, Linux, iOS, and Android.",
        icon: "RefreshCw",
      },
      {
        title: "Easy Self-Hosting",
        description: "Deploy on your own hardware or VPS with our simple setup wizard.",
        icon: "Server",
      },
      {
        title: "File Versioning",
        description: "Never lose work with automatic version history and easy restoration.",
        icon: "History",
      },
    ],
    status: "coming-soon",
    color: "purple",
  },
  {
    slug: "lokidocs",
    name: "LokiDocs",
    tagline: "Documentation that developers love",
    shortDescription: "Beautiful documentation generator for your open source projects",
    description:
      "Create stunning documentation for your projects with LokiDocs. Write in Markdown, get beautiful, searchable docs that your users will love. With built-in versioning, API reference generation, and full customization, LokiDocs makes documentation a joy instead of a chore.",
    icon: "BookOpen",
    features: [
      {
        title: "Markdown-First",
        description: "Write documentation in familiar Markdown with extended syntax for callouts and tabs.",
        icon: "FileText",
      },
      {
        title: "Instant Search",
        description: "Lightning-fast full-text search helps users find what they need.",
        icon: "Search",
      },
      {
        title: "Version Management",
        description: "Maintain documentation for multiple versions of your software.",
        icon: "GitBranch",
      },
      {
        title: "API Reference",
        description: "Automatically generate API documentation from your code comments.",
        icon: "Code",
      },
    ],
    status: "coming-soon",
    color: "blue",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}
