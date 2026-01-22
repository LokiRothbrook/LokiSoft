import { MetadataRoute } from "next";
import { siteConfig, getPageTitle } from "@/lib/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: getPageTitle(),
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.branding.backgroundColor,
    theme_color: siteConfig.branding.themeColor,
    icons: [
      {
        src: siteConfig.branding.favicon,
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: siteConfig.branding.logo,
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
