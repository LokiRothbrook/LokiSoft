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
    slug: "lokiasam",
    name: "LokiASAM",
    tagline: "Manage your ARK: Survival Ascended servers like a pro",
    shortDescription: "A free, open-source desktop manager for ARK: Survival Ascended dedicated servers on Windows and Linux",
    description:
      "LokiASAM is a full-featured desktop application for managing dedicated ARK: Survival Ascended servers. Built with Tauri, Next.js, and Rust — it runs natively on Windows and Linux with no browser required, no monthly subscription, and no cloud dependency. Create and manage multiple servers, install mods, automate backups, and monitor live logs all from one unified interface. Cluster support, Discord notifications, Proton-GE integration on Linux, and auto-updates are all built in.",
    icon: "Server",
    features: [
      {
        title: "Server Management",
        description:
          "Create, start, stop, restart, clone, and delete dedicated ASA servers with a clean, unified dashboard.",
        icon: "Server",
      },
      {
        title: "Mod Manager",
        description:
          "Install mods by ID, drag to reorder, toggle per-server, and browse CurseForge directly from the app.",
        icon: "Package",
      },
      {
        title: "RCON Console",
        description:
          "Live terminal with command history, saved presets, and broadcast support to reach all servers at once.",
        icon: "Terminal",
      },
      {
        title: "Scheduled Automation",
        description:
          "Cron-based schedules for backups, updates, restarts, and RCON broadcasts — set it and forget it.",
        icon: "Clock",
      },
      {
        title: "Backup & Restore",
        description:
          "Create, restore, and prune ZIP backups per server with configurable retention policies.",
        icon: "HardDrive",
      },
      {
        title: "SteamCMD Integration",
        description:
          "Automated SteamCMD install, update, and validation with a shared cache to speed up multi-server setups.",
        icon: "Download",
      },
      {
        title: "Cluster Support",
        description:
          "Group servers into clusters with a shared directory for seamless cross-server gameplay.",
        icon: "Network",
      },
      {
        title: "Notifications",
        description:
          "Discord webhooks, email (SMTP), and desktop notifications keep you informed of server events.",
        icon: "Bell",
      },
    ],
    status: "beta",
    color: "pink",
  },
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
    slug: "lokiNotes",
    name: "LokiNotes",
    tagline: "Documentation that developers love",
    shortDescription: "Beautiful documentation generator for your open source projects",
    description:
      "Create stunning documentation for your projects with LokiNotes. Write in Markdown, get beautiful, searchable notes that your users will love. With built-in versioning, API reference generation, and full customization, LokiNotes makes documentation a joy instead of a chore.",
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
