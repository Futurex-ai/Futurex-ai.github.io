import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginLess } from "@rsbuild/plugin-less"; // 1. 导入插件

export default defineConfig({
  output: {
    distPath: {
      root: "docs",
    },
    assetPrefix: "./",
  },
  plugins: [
    pluginReact(),
    pluginLess(), // 2. 添加插件
  ],
  source: {
    entry: {
      index: "./src/entry.tsx",
    },
  },
  html: {
    title: "FutureX",
    favicon: "./src/assets/benchmarking.svg",
    meta: {
      description:
        "Can AI predict future? Join our benchmark leaderboard to evaluate AI models on predicting future events. Explore research papers, compare metrics, and contribute to the FutureX challenge.",
      keywords: "FutureX",
      author: "FutureX Team",
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
