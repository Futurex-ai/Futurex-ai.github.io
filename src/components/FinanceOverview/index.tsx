// src/components/MarkdownView.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "github-markdown-css";

import defaultMarkdownContent from "../../data/newFinancePage/financeContent.md";

// 打包进来的图片映射（确保 key 与 md/HTML 里写的相对路径一致）
import image1 from "../../data/newFinancePage/mape1.png";
import image2 from "../../data/newFinancePage/mape2.png";
import image3 from "../../data/newFinancePage/tier1.png";
import image4 from "../../data/newFinancePage/tier2.png";
import image5 from "../../data/newFinancePage/win-rate1.png";
import image6 from "../../data/newFinancePage/win-rate2.png";

const imageMap: Record<string, string> = {
  "./mape1.png": image1,
  "./mape2.png": image2,
  "./tier1.png": image3,
  "./tier2.png": image4,
  "./win-rate1.png": image5,
  "./win-rate2.png": image6,
};

export const FinanceOverview: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "4rem 2rem 2rem",
  };
  const contentStyle: React.CSSProperties = {
    background: "transparent",
    padding: "0rem 0rem",
    lineHeight: 1.6,
  };

  const components = {
    img: ({ src, alt, ...props }) => {
      const resolvedSrc = imageMap[src] || src;
      return (
        <img
          style={{ height: "auto", width: "100%" }}
          src={resolvedSrc}
          alt={alt}
          {...props}
        />
      );
    },
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <ReactMarkdown
          className="markdown-body"
          rehypePlugins={[rehypeRaw]} // ★ 关键：让内嵌 HTML 生效
          components={components}
        >
          {defaultMarkdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};
