// src/components/MarkdownView.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import 'github-markdown-css';

import defaultMarkdownContent from '../../data/financeContent.md';



export const FinanceOverview: React.FC = () => {
  const containerStyle: React.CSSProperties = { maxWidth: '1400px', margin: '0 auto', padding: '4rem 2rem 2rem' };
  const contentStyle: React.CSSProperties = { background: 'transparent', padding: '0rem 0rem', lineHeight: 1.6 };

 
  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <ReactMarkdown
          className="markdown-body"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}   // ★ 关键：让内嵌 HTML 生效
        >
          {defaultMarkdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};
