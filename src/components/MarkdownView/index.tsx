// src/components/MarkdownView.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import 'github-markdown-css';

import defaultMarkdownContent from '../../data/content.md';

// 打包进来的图片映射（确保 key 与 md/HTML 里写的相对路径一致）
import image1 from '../../data/image-20250805153538154.png';
import image2 from '../../data/image-20250805150803688.png';
import image3 from '../../data/image-20250805150712400.png';
import image4 from '../../data/image-20250805150617761.png';
import image5 from '../../data/image-20250805150459250.png';
import image6 from '../../data/image-20250805150328286.png';
import image7 from '../../data/image-20250805153707628.png';

const imageMap: Record<string, string> = {
  './image-20250805153538154.png': image1,
  './image-20250805150803688.png': image2,
  './image-20250805150712400.png': image3,
  './image-20250805150617761.png': image4,
  './image-20250805150459250.png': image5,
  './image-20250805150328286.png': image6,
  './image-20250805153707628.png': image7,
};

export const MarkdownView: React.FC = () => {
  const containerStyle: React.CSSProperties = { maxWidth: '1400px', margin: '0 auto', padding: '2rem' };
  const contentStyle: React.CSSProperties = { background: 'transparent', padding: '3rem', lineHeight: 1.6 };

  const components = {
    // 统一处理所有 <img>（包括 md 语法渲染出来的和原生 HTML 的）
    img: ({ src = '', alt, ...props }: any) => {
      const resolvedSrc = imageMap[src] ?? src;
      // 你之前给某张图单独 90% 宽度，这里也保留
      const width = src.includes('20250805150617761') ? '90%' : '100%';
      return (
        <img
          src={resolvedSrc}
          alt={alt}
          style={{ width, height: 'auto', display: 'block', margin: '0 auto' }} // 居中
          {...props}
        />
      );
    },
    // 如果你的 md 里仍有 <div align="center"> 想兼容，也可以这样把 align 转成样式
    div: ({ align, style, ...props }: any) => (
      <div style={{ textAlign: align === 'center' ? 'center' : undefined, ...style }} {...props} />
    ),
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <ReactMarkdown
          className="markdown-body"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}   // ★ 关键：让内嵌 HTML 生效
          components={components}
        >
          {defaultMarkdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};
