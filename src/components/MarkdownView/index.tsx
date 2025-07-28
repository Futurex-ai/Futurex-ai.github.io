/**
 * Markdown 渲染组件
 * 负责渲染传入的 markdown 内容
 */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import defaultMarkdownContent from '../../data/content.md';

export const MarkdownView: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  };

  const contentStyle: React.CSSProperties = {
    background: 'transparent',
    padding: '3rem',
    lineHeight: '1.6'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <ReactMarkdown>{defaultMarkdownContent}</ReactMarkdown>
      </div>
    </div>
  );
};