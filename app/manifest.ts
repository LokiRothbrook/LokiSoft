import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LokiSoft - Open Source Software Built on Christian Values",
    short_name: "LokiSoft",
    description:
      "A Christian values company committed to open source and the freedom of knowledge for everyone.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#ff00ff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/lokisoft-logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
