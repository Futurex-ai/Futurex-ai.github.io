// 示例：src/components/Doc.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// 假设用 raw-loader 读取到字符串
import content from "../data/content.md"; // 有的打包器需要 ?raw，raw-loader 不需要也可以：'../docs/readme.md'

export default function Doc() {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        // 允许 Markdown 中的 HTML 被解析
        rehypePlugins={[rehypeRaw]}
        // 支持 GFM（表格、任务列表等）
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
