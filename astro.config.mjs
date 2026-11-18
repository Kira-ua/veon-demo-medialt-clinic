// VEON demo base: technical setup only. Visual design comes from design/concept.md of each client.
// SITE_URL (and optional BASE_PATH) are the only difference between the preview address and the main domain.
import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || undefined,
  build: { inlineStylesheets: "always" },
  compressHTML: true,
  devToolbar: { enabled: false },
});
