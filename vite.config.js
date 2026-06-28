import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ssgPaths } from "./src/routes.jsx";

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    // Never emit source maps in production — don't ship readable source.
    sourcemap: false,
    minify: "esbuild",
    // Don't ship build manifests (they leak the source-file graph + local
    // absolute paths). vite-react-ssg needs them mid-build, so the build
    // script also deletes dist/.vite afterwards (see scripts/postbuild.mjs).
    manifest: false,
    ssrManifest: false,
    // Inline assets <4kb; keep small JSON-LD/critical bits lean.
    assetsInlineLimit: 4096,
  },
  // Strip console.* and debugger from the production bundle.
  esbuild: {
    drop: ["console", "debugger"],
  },
  ssgOptions: {
    script: "async",
    formatting: "minify",
    includedRoutes() {
      // Explicit list of routes to prerender to static HTML.
      return ssgPaths;
    },
  },
});
