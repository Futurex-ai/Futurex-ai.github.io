/**
 * 顶部 Banner 组件
 * 包含页面标题和 Tab 切换功能，负责 UI 渲染和用户交互
 */
import React from 'react';
import Tea from "byted-tea-sdk";

interface BannerProps {
  activeTab: 'overview' | 'leaderboard';
  onTabChange: (tab: 'overview' | 'leaderboard') => void;
}

export const Banner: React.FC<BannerProps> = ({ activeTab, onTabChange }) => {
  const bannerStyle: React.CSSProperties = {
    background: 'white', // 改为纯白背景
    color: '#1a1a1a',
    padding: '3rem 0 2rem 0',
    borderBottom: '1px solid #e5e7eb' // 添加简洁的底部边框
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2.25rem',
    fontWeight: '800',
    margin: '0 0 0.75rem 0',
    color: '#111827',
    lineHeight: 1.2,
    letterSpacing: '-0.025em'
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '1rem',
    fontWeight: '400',
    margin: 0,
    color: '#6b7280',
    lineHeight: 1.5,
    letterSpacing: '0.0125em'
  };

  const tabSwitcherStyle: React.CSSProperties = {
    display: 'flex',
    background: '#f8fafc',
    borderRadius: '8px',
    padding: '4px',
    border: '1px solid #e2e8f0'
  };

  const getTabButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '0.875rem 1.75rem',
    border: 'none',
    background: isActive ? 'white' : 'transparent',
    color: isActive ? '#111827' : '#6b7280',
    fontSize: '0.875rem',
    fontWeight: isActive ? '600' : '500',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    boxShadow: isActive ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
    letterSpacing: '0.0125em',
    lineHeight: 1.4
  });

  return (
    <div style={bannerStyle}>
      <div style={contentStyle}>
        <div>
          <h1 style={titleStyle}>FutureX</h1>
          <p style={subtitleStyle}>An Advanced Live Benchmark for LLM Agents in Future Prediction</p>
        </div>
        <div style={tabSwitcherStyle}>
          <button
            style={getTabButtonStyle(activeTab === 'overview')}
            onClick={() => {
              onTabChange('overview');
              Tea.event('crawl_api_custom', {
                name: '点击Overview',
              });
            }}
          >
            Overview
          </button>
          <button
            style={getTabButtonStyle(activeTab === 'leaderboard')}
            onClick={() => {
              onTabChange('leaderboard');
              Tea.event('crawl_api_custom', {
                name: '点击Leaderboard',
              });
            }}
          >
            Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};