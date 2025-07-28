/**
 * 顶部 Banner 组件
 * 包含页面标题和 Tab 切换功能，负责 UI 渲染和用户交互
 */
import React from 'react';

interface BannerProps {
  activeTab: 'overview' | 'leaderboard';
  onTabChange: (tab: 'overview' | 'leaderboard') => void;
}

export const Banner: React.FC<BannerProps> = ({ activeTab, onTabChange }) => {
  const bannerStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #8892e8 0%, #9282a6 100%)', // 降低饱和度的紫色渐变
    color: 'white',
    padding: '2rem 0',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '0 0 0.5rem 0'
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    opacity: 0.9,
    margin: 0
  };

  const tabSwitcherStyle: React.CSSProperties = {
    display: 'flex',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '4px'
  };

  const getTabButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '0.75rem 1.5rem',
    border: 'none',
    background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    boxShadow: isActive ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none'
  });

  return (
    <div style={bannerStyle}>
      <div style={contentStyle}>
        <div>
          <h1 style={titleStyle}>LiveCodeBench</h1>
          <p style={subtitleStyle}>Holistic and Contamination Free Evaluation of LLMs for Code</p>
        </div>
        <div style={tabSwitcherStyle}>
          <button
            style={getTabButtonStyle(activeTab === 'overview')}
            onClick={() => onTabChange('overview')}
          >
            Overview
          </button>
          <button
            style={getTabButtonStyle(activeTab === 'leaderboard')}
            onClick={() => onTabChange('leaderboard')}
          >
            Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};