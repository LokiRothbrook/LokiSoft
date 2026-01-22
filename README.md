# LokiSoft Website

This is the official codebase for the [LokiSoft website](https://lokisoft.dev).

LokiSoft is an open-source focused technology company guided by Christian values. We believe that knowledge should be freely accessible to everyone. In that spirit, we have open-sourced our entire website, excluding sensitive credentials like API keys. We encourage you to explore, learn from, and adapt our work for your own projects.

A modern, cyberpunk-themed company website built with Next.js 15, React 19, and TypeScript. Features a full blog system with markdown support, interactive components, and a striking neon aesthetic.

## Features

- **Cyberpunk Neon Theme** - Dark theme with vibrant neon colors (pink, purple, blue, cyan)
- **Full Blog System** - Markdown-based posts with syntax highlighting, math equations (KaTeX), and interactive components
- **Responsive Design** - Mobile-first approach with glass morphism effects
- **Fast Performance** - Built on Next.js App Router with static generation
- **Type Safe** - Full TypeScript throughout the codebase

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui + Radix UI
- **Animations:** Framer Motion
- **Blog:** gray-matter + remark/rehype
- **Icons:** Lucide React
- **Math:** KaTeX
- **Code Highlighting:** Prism React Renderer

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/LokiRothbrook/lokisoft.git
cd lokisoft

# Install dependencies
pnpm install

# Set up your environment variables (see Configuration section)
cp env.example .env.local

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Configuration and Customization

This project is designed to be easily customized. You can re-theme it, change the content, and make it your own.

### Environment Variables

Configuration for external services and site-specific settings is managed through environment variables.

1.  **Create a `.env.local` file:** Copy the example file `env.example` to a new file named `.env.local`.
    ```bash
    cp env.example .env.local
    ```
2.  **Edit `.env.local`:** Open the file and fill in the required values. The example file contains comments explaining each variable. Key variables include:
    *   `RESEND_API_KEY`: For the contact form functionality.
    *   `CONTACT_EMAIL`: The email address to receive messages.
    *   `NEXT_PUBLIC_SITE_URL`: Your website's public URL.
    *   `NEXT_PUBLIC_GISCUS_*`: Configuration for blog comments.

### Theming and Styling

You can easily change the website's color scheme and appearance.

1.  **Colors:** The primary color variables are defined at the top of `app/globals.css`. The site uses hex color values for maximum browser compatibility.
    ```css
    /* In app/globals.css */
    --neon-pink: #ec4899;
    --neon-purple: #a855f7;
    --neon-blue: #3b82f6;
    --neon-cyan: #22d3ee;
    ```
    Simply change these values to whatever you prefer.

    > **Note:** We use hex/rgba colors instead of OKLCH for Firefox compatibility. OKLCH colors can cause rendering issues with backdrop-filter and gradient text in Firefox.

2.  **Logo:** The site logo is an SVG file located at `public/lokisoft-logo.svg`. Replace this file with your own logo.

3.  **Fonts:** The project uses Fira Code Nerd Font, located in `public/fonts/`. You can replace these with your own font files and update the font references in `app/globals.css`.

4.  **UI Components:** The site uses `shadcn/ui`. You can modify the existing components in `components/ui/` or add new ones.

### Site Configuration (White-Label Ready)

The site is designed to be easily white-labeled for your own company. All configurable content is centralized in the `lib/data/` directory:

#### Core Site Config (`lib/data/site.ts`)

This is the main configuration file containing:

- **Company Information:** Name, tagline, description, author
- **URLs:** Base URL, GitHub repo URL, blog repo URL
- **Contact Information:** Email addresses, Discord, location
- **Social Media Links:** Twitter, YouTube, GitHub, Discord
- **SEO & Metadata:** Keywords, OG image, Twitter card type
- **Branding:** Logo, favicon, theme colors
- **Legal:** Copyright holder

```typescript
// Example: Update your company name and contact info
export const siteConfig: SiteConfig = {
  name: "YourCompany",
  tagline: "Your Company Tagline",
  contact: {
    email: "hello@yourcompany.com",
    // ...
  },
  social: {
    twitter: "https://x.com/yourcompany",
    // ...
  },
  // ...
};
```

#### About Page Config (`lib/data/about.ts`)

Customize your About page content:

- **Hero Section:** Title and description
- **Our Story:** Title, subtitle, and paragraph content
- **Values:** Array of value cards with icons, titles, descriptions, and colors
- **Principles:** Array of principle items
- **Scripture/Quote:** Optional inspirational quote (set to `null` to hide)
- **CTA Section:** Call-to-action content and buttons

#### Homepage Config (`lib/data/homepage.ts`)

Customize homepage sections:

- **Hero:** Tagline and highlighted text
- **Announcements:** Section title and subtitle
- **Featured Posts:** Section title and subtitle
- **About Cards:** Mission, values, and feature cards
- **Services/Products:** Section titles and subtitles
- **CTA:** Title and description

#### Other Data Files

| File | Description |
|------|-------------|
| `lib/data/services.ts` | Services offered (name, description, features, pricing) |
| `lib/data/products.ts` | Products catalog (name, tagline, features, status) |
| `lib/data/showcase.ts` | Demo templates and portfolio items |

### Content and Data

1.  **Pages:** The main pages of the site are located in the `app/` directory. Page content is driven by the config files above.
2.  **Blog Posts:** Blog posts are Markdown files in the `posts/` directory. Add, edit, or delete files here to manage your blog.
3.  **Products and Services:** Modify `lib/data/products.ts` and `lib/data/services.ts` to change offerings.
4.  **Showcase:** Modify `lib/data/showcase.ts` to update demo templates and portfolio items.

## Project Structure

```
lokisoft/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog listing and post pages
│   ├── contact/           # Contact form
│   ├── products/          # Products showcase
│   ├── services/          # Services pages
│   ├── showcase/          # Demo templates and portfolio
│   └── about/             # About page
├── components/
│   ├── blog/              # Blog-specific components
│   ├── home/              # Homepage components
│   ├── layout/            # Navbar, Footer
│   └── ui/                # Reusable UI components
├── lib/
│   ├── blog.ts            # Blog utilities (markdown parsing)
│   ├── data/              # Site configuration and content
│   │   ├── site.ts        # Core site config (company, contact, social)
│   │   ├── about.ts       # About page content
│   │   ├── homepage.ts    # Homepage section content
│   │   ├── services.ts    # Services data
│   │   ├── products.ts    # Products data
│   │   └── showcase.ts    # Demo templates and portfolio
│   ├── icons.ts           # Icon helper
│   └── utils.ts           # Utility functions
├── posts/                  # Markdown blog posts
└── public/                 # Static assets
```

## Blog System

Blog posts are markdown files in the `posts/` directory with YAML frontmatter:

```markdown
---
title: "Your Post Title"
date: "2025-01-14"
author: "Author Name"
excerpt: "A brief description of the post"
categories: "Development, Tutorial"
difficulty: 3
featured: true
coverImage: "/images/cover.png"
---

Your content here...
```

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title |
| `date` | string | Yes | Publication date (YYYY-MM-DD) |
| `author` | string | No | Author name (default: "LokiSoft Team") |
| `excerpt` | string | No | Short description for cards |
| `categories` | string | No | Comma-separated categories |
| `difficulty` | number | No | 1-5 difficulty rating |
| `featured` | boolean | No | Show in featured section |
| `announcement` | boolean | No | Mark as announcement |
| `coverImage` | string | No | Path to cover image |

### Blog Features

- **Syntax Highlighting** - Code blocks with language detection and copy button
- **Math Equations** - LaTeX support via KaTeX (`$inline$` and `$$block$$`)
- **Info Boxes** - Callouts for tips, warnings, notes
- **Toggle Boxes** - Collapsible content sections
- **Quizzes** - Interactive multiple-choice questions
- **Auto Reading Time** - Calculated from content length

### Cover Images

Optimal size: **800 x 400 pixels** (2:1 aspect ratio)

Place images in `public/images/` and reference as `/images/your-image.png`

## Styling

The site uses a custom cyberpunk theme with CSS variables defined in `app/globals.css`:

### Neon Colors

```css
--neon-pink: #ec4899;
--neon-purple: #a855f7;
--neon-blue: #3b82f6;
--neon-cyan: #22d3ee;
```

### Firefox Compatibility

This project prioritizes cross-browser compatibility. Key considerations:

- **Colors:** Use hex (`#ec4899`) or rgba (`rgba(236, 72, 153, 0.5)`) instead of OKLCH. Firefox has issues with OKLCH colors when combined with `backdrop-filter` and gradient text.
- **Scrollbars:** Custom scrollbar styling uses both `-webkit-scrollbar` (Chrome/Safari/Edge) and `scrollbar-color` (Firefox).
- **Gradient Text:** The `-moz-` prefixes are included for gradient text effects, with fallback colors for unsupported browsers.
- **Glass Effects:** The `.glass` classes include `transform: translateZ(0)` to prevent flickering in Firefox.

### Utility Classes

| Class | Description |
|-------|-------------|
| `.glass` | Glass morphism background |
| `.glass-strong` | Stronger glass effect |
| `.neon-glow-*` | Text glow effects (pink, purple, blue, cyan) |
| `.box-glow-*` | Box shadow glow effects |
| `.gradient-text` | Static gradient text |
| `.gradient-text-animated` | Animated gradient text |

## Adding UI Components

This project uses shadcn/ui. To add new components:

```bash
pnpm dlx shadcn@latest add <component-name>
```

## Services

Services are defined in `lib/data/services.ts`. Each service has:

- Slug, name, descriptions
- Icon (from Lucide)
- Feature list
- Color theme
- Price range

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LokiRothbrook/lokisoft)

### Other Platforms

```bash
# Build for production
pnpm build

# The output is in .next/
# Configure your platform to run: pnpm start
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide](https://lucide.dev/) - Icons
- [Framer Motion](https://www.framer.com/motion/) - Animations

---

Built with care by [LokiSoft](https://lokisoft.dev)
