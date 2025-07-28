import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  output: {
    distPath: {
      root: "docs",
    },
    assetPrefix: "./",
  },
  plugins: [pluginReact()],
  source: {
    entry: {
      index: "./src/entry.tsx",
    },
  },
  tools: {
    rspack: (config) => {
      config.module?.rules?.push({
        test: /\.md$/,
        use: ["markdown-loader"],
      });
      return config;
    },
    postcss: {
      postcssOptions: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
  },
});
