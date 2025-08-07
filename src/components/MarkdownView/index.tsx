/**
 * Markdown 渲染组件
 * 负责渲染传入的 markdown 内容
 */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';
import defaultMarkdownContent from '../../data/content.md';
import image1 from '../../data/image-20250805153538154.png'; 
import image2 from '../../data/image-20250805150803688.png';
import image3 from '../../data/image-20250805150712400.png';
import image4 from '../../data/image-20250805150617761.png';
import image5 from '../../data/image-20250805150459250.png';
import image6 from '../../data/image-20250805150328286.png'; 
import image7 from '../../data/image-20250805153707628.png';

export const MarkdownView: React.FC = () => {

  const containerStyle: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem'
  };

  const contentStyle: React.CSSProperties = {
    background: 'transparent',
    padding: '3rem',
    lineHeight: '1.6'
  };

// 创建图片映射
const imageMap = {
  './image-20250805153538154.png': image1,
  './image-20250805150803688.png': image2,
  './image-20250805150712400.png': image3,
  './image-20250805150617761.png': image4,
  './image-20250805150459250.png': image5,
  './image-20250805150328286.png': image6,
  './image-20250805153707628.png': image7,
  
  // 添加更多图片映射
};

// 自定义图片渲染器
const components = {
  img: ({ src, alt, ...props }) => {
    const resolvedSrc = imageMap[src] || src;
    const width = src?.includes('20250805150617761') ? '90%' : '100%';
    return <img  style={{  height: 'auto', width }}  src={resolvedSrc} alt={alt} {...props} />;
  }
};


  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <ReactMarkdown  className="markdown-body"   components={components}>
          {defaultMarkdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};