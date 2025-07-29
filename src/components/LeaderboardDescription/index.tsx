/**
 * 榜单描述组件
 * 用于显示榜单的介绍信息和相关说明
 */
import React from 'react';

export const LeaderboardDescription: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    background: '#fafafa',
    padding: '2rem 0'
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: '1480px',
    margin: '0 auto',
    padding: '0 2rem'
  };

  const textStyle: React.CSSProperties = {
    fontSize: '1rem',
    lineHeight: 1.7,
    color: '#374151',
    fontWeight: '400',
    letterSpacing: '0.0125em',
    marginBottom: '1.5rem'
  };

  const linkStyle: React.CSSProperties = {
    color: '#3b82f6',
    textDecoration: 'underline',
    fontWeight: '500'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <p style={textStyle}>
          GAIA is made of more than 450 non-trivial question with an unambiguous answer, requiring different levels of tooling and autonomy to solve. It is therefore divided in 3 levels, where level 1 should be breakable by very good LLMs, and level 3 indicate a strong jump in model capabilities. Each level is divided into a fully public dev set for validation, and a test set with private answers and metadata.
        </p>
        
        <p style={{...textStyle, marginBottom: 0}}>
          GAIA data can be found in{' '}
          <span style={linkStyle}>this dataset</span>. Questions are contained in{' '}
          <code style={{
            background: '#f3f4f6',
            padding: '0.125rem 0.375rem',
            borderRadius: '4px',
            fontSize: '0.875rem',
            fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            color: '#1f2937'
          }}>
            metadata.jsonl
          </code>. Some questions come with an additional file, that can be found in the same folder and whose id is given in the field{' '}
          <code style={{
            background: '#f3f4f6',
            padding: '0.125rem 0.375rem',
            borderRadius: '4px',
            fontSize: '0.875rem',
            fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            color: '#1f2937'
          }}>
            file_name
          </code>.
        </p>
      </div>
    </div>
  );
};