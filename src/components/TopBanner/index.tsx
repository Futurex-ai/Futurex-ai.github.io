/**
 * 顶部Banner组件 - 应用级导航
 * 包含FutureX Logo和分类切换（General/Finance）
 */
import React from 'react';

export type CategoryType = 'general' | 'finance';

interface TopBannerProps {
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

export const TopBanner: React.FC<TopBannerProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  const bannerStyle: React.CSSProperties = {
    background: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    padding: '0.55rem 0',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '1rem', // 左侧贴边
    paddingRight: 'max(2rem, calc((100vw - 1400px) / 2 + 2rem))' // 动态计算右侧padding以与Banner对齐
  };

  const logoContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const logoIconStyle: React.CSSProperties = {
    width: '24px',
    height: '24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'white'
  };

  const logoTextStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#111827',
    letterSpacing: '-0.025em'
  };

  const categoryTabsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.5rem'
  };

  const getCategoryButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem',
    border: 'none',
    background: 'transparent',
    color: isActive ? '#667eea' : '#6b7280',
    fontSize: '0.875rem',
    fontWeight: isActive ? '600' : '500',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    letterSpacing: '0.0125em',
    lineHeight: 1.4
  });

  return (
    <div style={bannerStyle}>
      <div style={contentStyle}>
        {/* 左侧Logo */}
        <div style={logoContainerStyle}>
          <div style={logoIconStyle}>F</div>
          <span style={logoTextStyle}>FutureX</span>
        </div>

        {/* 右侧分类切换 */}
        <div style={categoryTabsStyle}>
          <button
            style={getCategoryButtonStyle(activeCategory === 'general')}
            onClick={() => onCategoryChange('general')}
          >
            General
          </button>
          <button
            style={getCategoryButtonStyle(activeCategory === 'finance')}
            onClick={() => onCategoryChange('finance')}
          >
            Finance
          </button>
          
        </div>
        
      </div>
    </div>
  );
};