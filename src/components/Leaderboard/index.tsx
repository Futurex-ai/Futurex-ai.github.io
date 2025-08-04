/**
 * 榜单组件
 * 负责展示排行榜数据，包括模型信息和各项评分，支持横向滚动
 */
import React from 'react';
import { TimePeriodType } from '../../types';
import { useLeaderboardData } from './leaderboardData';

interface LeaderboardProps {
  timePeriodType: TimePeriodType;
  selectedTime: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  timePeriodType,
  selectedTime
}) => {
  const { getLeaderboardData } = useLeaderboardData();
  const data = getLeaderboardData(timePeriodType, selectedTime);

  // 首先定义所有样式
  const containerStyle: React.CSSProperties = {
    height: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1rem 2rem',
    display: 'flex',
    flexDirection: 'column'
  };

  const tableContainerStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    boxShadow: 'none',
    flex: 1,
    minHeight: 0,
    height: '400px',
    position: 'relative'
  };

  const scrollWrapperStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    position: 'relative'
  };

  const tableStyle: React.CSSProperties = {
    minWidth: '1380px',
    width: 'max-content'
  };

  const stickyHeaderStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    background: 'white',
    borderBottom: '1px solid #e5e7eb'
  };

  const headerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '80px 280px 250px 130px 120px 140px 100px 100px 100px 110px',
    background: '#f9fafb',
    borderBottom: '0.5px solid #e5e7eb',
    color: '#374151',
    fontWeight: '600'
  };

  // 固定列的表头样式
  const stickyHeaderCellStyle: React.CSSProperties = {
    padding: '1rem 0.5rem',
    textAlign: 'center',
    fontSize: '0.8125rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    lineHeight: 1.3,
    background: '#f9fafb',
    position: 'sticky',
    zIndex: 15,
    borderRight: '1px solid #e5e7eb'
  };

  const rankHeaderStyle: React.CSSProperties = {
    ...stickyHeaderCellStyle,
    left: 0
  };

  const nameHeaderStyle: React.CSSProperties = {
    ...stickyHeaderCellStyle,
    left: '80px'
  };

  const headerCellStyle: React.CSSProperties = {
    padding: '1rem 0.5rem',
    textAlign: 'center',
    fontSize: '0.8125rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    lineHeight: 1.3,
    background: '#f9fafb'
  };

  const rowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '80px 280px 250px 130px 120px 140px 100px 100px 100px 110px',
    borderBottom: '1px solid #f3f4f6'
  };

  // 固定列的单元格样式
  const stickyCellStyle: React.CSSProperties = {
    padding: '1rem 0.5rem',
    textAlign: 'center',
    color: '#111827',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '400',
    lineHeight: 1.4,
    position: 'sticky',
    background: 'white',
    zIndex: 5,
    borderRight: '1px solid #f3f4f6'
  };

  const rankCellStyle: React.CSSProperties = {
    ...stickyCellStyle,
    left: 0
  };

  const nameCellStyle: React.CSSProperties = {
    ...stickyCellStyle,
    left: '80px',
    paddingLeft: '1rem',
    fontWeight: '600',
    color: '#111827',
    letterSpacing: '0.0125em'
  };

  const cellStyle: React.CSSProperties = {
    padding: '1rem 0.5rem',
    textAlign: 'center',
    color: '#111827',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '400',
    lineHeight: 1.4
  };

  const getRankBadgeStyle = (rank: number): React.CSSProperties => {
    let background = '#f3f4f6';
    let color = '#6b7280';
    let fontWeight = '500';
    
    if (rank === 1) {
      background = '#fbbf24';
      color = 'white';
      fontWeight = '700';
    } else if (rank === 2) {
      background = '#9ca3af';
      color = 'white';
      fontWeight = '600';
    } else if (rank === 3) {
      background = '#d97706';
      color = 'white';
      fontWeight = '600';
    }

    return {
      padding: rank <= 3 ? '0.25rem 0.5rem' : '0.25rem 0.5rem',
      borderRadius: '4px',
      fontWeight,
      fontSize: '0.75rem',
      background,
      color,
      minWidth: '32px',
      lineHeight: 1.2,
      letterSpacing: rank === 1 ? '0.025em' : '0'
    };
  };

  const scoreValueStyle: React.CSSProperties = {
    fontWeight: '700',
    fontSize: '0.875rem',
    color: '#111827',
    lineHeight: 1.3,
    letterSpacing: '0.0125em'
  };

  const levelScoreStyle: React.CSSProperties = {
    color: '#374151',
    fontWeight: '600',
    fontSize: '0.875rem',
    lineHeight: 1.3,
    letterSpacing: '0.0125em'
  };

  const getRankContent = (rank: number) => {
    return rank;
  };

  const getDisplayName = (modelName: string, agentFramework: string) => {
    return <div>
      <div>{modelName}</div>
      <span style={{color: '#6b7280', fontWeight: '400', letterSpacing: '0.0125em'}}>({agentFramework})</span>
    </div>
  };

  const getModelName = (modelName: string): string => {
    // 处理一些特殊情况，如果模型名称不公开则显示"Undisclosed"
    const undisclosedModels = ['Manus', 'OpenAI-Deepreasearch', 'Genspark'];
    if (undisclosedModels.includes(modelName)) {
      return 'Undisclosed';
    }
    return modelName;
  };

  // 数据检查，现在containerStyle已经定义好了
  if (!data || data.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          padding: '4rem 2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* 空状态图标 */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.5rem'
          }}>
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              style={{ color: '#9ca3af' }}
            >
              <path 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* 空状态标题 */}
          <h3 style={{ 
            color: '#374151', 
            fontSize: '1.25rem', 
            fontWeight: '600',
            margin: 0,
            lineHeight: 1.3
          }}>
            No Data Available
          </h3>
          
          {/* 空状态描述 */}
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1rem', 
            margin: 0,
            lineHeight: 1.5,
            maxWidth: '400px'
          }}>
            {timePeriodType === 'monthly' 
              ? "Monthly data is not available yet. Please try selecting Weekly view to see available data."
              : "There is currently no leaderboard data available for the selected time period. Please try selecting a different time range."
            }
          </p>

          {/* 提示信息 */}
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem 1rem',
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            💡 {timePeriodType === 'monthly' 
              ? "Monthly data will be available in the future. Currently only Weekly data is available."
              : "Weekly data is available for: July Week 3, July Week 4, August Week 1"
            }
          </div>
        </div>
      </div>
    );
  }

  // 渲染正常的榜单表格
  return (
    <div style={containerStyle}>
      <div style={tableContainerStyle}>
        <div style={scrollWrapperStyle}>
          <div style={tableStyle}>
            {/* 固定表头 */}
            <div style={stickyHeaderStyle}>
              <div style={headerStyle}>
                <div style={rankHeaderStyle}>Rank</div>
                <div style={nameHeaderStyle}>NAME (Agent Framework)</div>
                <div style={headerCellStyle}>Model Name</div>
                <div style={headerCellStyle}>Organization</div>
                <div style={headerCellStyle}>Overall</div>
                <div style={headerCellStyle}>Events</div>
                <div style={headerCellStyle}>Level 1</div>
                <div style={headerCellStyle}>Level 2</div>
                <div style={headerCellStyle}>Level 3</div>
                <div style={headerCellStyle}>Level 4</div>
              </div>
            </div>
            
            {/* 数据行 */}
            {data && data.length > 0 && data.map((entry, index) => (
              <div key={`${entry.modelName}-${index}`} style={rowStyle}>
                <div style={rankCellStyle}>
                  <span style={getRankBadgeStyle(index + 1)}>{getRankContent(index + 1)}</span>
                </div>
                <div style={nameCellStyle}>
                  {getDisplayName(entry.modelName, entry.agentFramework)}
                </div>
                <div style={{...cellStyle, color: '#6b7280', fontWeight: '500', letterSpacing: '0.0125em'}}>
                  {getModelName(entry.modelName)}
                </div>
                <div style={{...cellStyle, color: '#6b7280', fontWeight: '500', letterSpacing: '0.0125em'}}>
                  {entry.organization}
                </div>
                <div style={cellStyle}>
                  <span style={scoreValueStyle}>{entry.overallScore.toFixed(1)}</span>
                </div>
                <div style={{...cellStyle, color: '#6b7280', fontWeight: '400', letterSpacing: '0.0125em'}}>
                  {entry.numberOfEvents.toLocaleString()}
                </div>
                <div style={cellStyle}>
                  <span style={levelScoreStyle}>{entry.level1Score}</span>
                </div>
                <div style={cellStyle}>
                  <span style={levelScoreStyle}>{entry.level2Score}</span>
                </div>
                <div style={cellStyle}>
                  <span style={levelScoreStyle}>{entry.level3Score}</span>
                </div>
                <div style={cellStyle}>
                  <span style={levelScoreStyle}>{entry.level4Score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};