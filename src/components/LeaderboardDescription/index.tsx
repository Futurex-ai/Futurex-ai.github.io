/**
 * 榜单描述组件
 * 用于显示榜单的介绍信息和相关说明
 */
import React from 'react';

export const LeaderboardDescription: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    background: '#fafafa',
    padding: '1.8rem 0 0.3rem 0'  
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem'
  };

  const textStyle: React.CSSProperties = {
    fontSize: '1rem',     
    lineHeight: 1.5,       
    color: '#374151',
    fontWeight: '400',
    letterSpacing: '0.0125em',
    marginBottom: '0.5rem'  
  };

  const listStyle: React.CSSProperties = {
    fontSize: '1rem',      // 从 1rem 减少到 0.9rem
    lineHeight: 1.5,         // 从 1.7 减少到 1.5
    color: '#374151',
    fontWeight: '400',
    letterSpacing: '0.0125em',
    marginBottom: '0.5rem', 
    paddingLeft: '1.2rem'    // 从 1.5rem 减少到 1.2rem
  };

  const listItemStyle: React.CSSProperties = {
    marginBottom: '0.2rem'   // 从 0.5rem 减少到 0.2rem
  };

  const boldStyle: React.CSSProperties = {
    fontWeight: '600',
    color: '#1f2937'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <p style={textStyle}>
          <strong style={boldStyle}>FutureX</strong> is a dynamic, real-time benchmark designed to predict the unknown future, which fundamentally eliminates data contamination by requiring agents to forecast actual future events. The platform features a fully automated pipeline that integrates 195 high-quality sources across multiple domains to enable continuous, large-scale evaluation of LLM agents.
         Futurex involves 4 difficulty tiers:
        </p>
        <ul style={{...listStyle, marginBottom: '0.6rem'}}>
          <li style={listItemStyle}><strong style={boldStyle}>Level 1:</strong> single-choice questions</li>
          <li style={listItemStyle}><strong style={boldStyle}>Level 2:</strong> multi-choices questions</li>
          <li style={listItemStyle}><strong style={boldStyle}>Level 3:</strong> Open-ended questions with low volatility</li>
          <li style={listItemStyle}><strong style={boldStyle}>Level 4:</strong> Open-ended questions with high volatility</li>
        </ul>

        <p style={{...textStyle, marginBottom: '0.4rem'}}>
        The models under evaluation include various agent frameworks:
        </p>
        <ul style={{...listStyle, marginBottom: '0.4rem'}}>
          <li style={listItemStyle}><strong style={boldStyle}>LLM:</strong> base LLMs with no tool usage</li>
          <li style={listItemStyle}><strong style={boldStyle}>Search:</strong> LLMs with reasoning and search capabilities</li>
          <li style={listItemStyle}><strong style={boldStyle}>Open-Deep-Research:</strong> open-source Deep Research Agent frameworks, like Smolagents and AgentOrchestra</li>
          <li style={listItemStyle}><strong style={boldStyle}>Closed-Deep-Research:</strong> closed-source Deep Research Agents, like Gemini Deep Research</li>
        </ul>

        <p style={{...textStyle, marginBottom: '0', marginTop: '0.6rem'}}>
          for a total of <strong style={boldStyle}>27 models</strong> currently.
        </p>
      </div>
    </div>
  );
};