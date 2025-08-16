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
  html: {
    title: "futurex",
    favicon: "./src/assets/benchmarking.svg",
    meta: {
      description:
        "Comprehensive benchmark leaderboard for research papers and technical evaluations",
      keywords: "benchmark, leaderboard, research, papers, evaluation, metrics",
      author: "Research Team",
      viewport: "width=device-width, initial-scale=1.0",
    },
  },
  tools: {
    rspack: (config) => {
      config.module?.rules?.push({
        test: /\.md$/,
        type: "javascript/auto",
        use: ["raw-loader"],
      });

      config.module?.rules?.push({
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset/resource", // 关键配置
        generator: {
          filename: "static/images/[name].[hash][ext]", // 输出路径
        },
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
