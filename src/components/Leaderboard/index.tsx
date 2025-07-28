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

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  };

  const tableContainerStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  };

  const scrollWrapperStyle: React.CSSProperties = {
    overflowX: 'auto',
    overflowY: 'hidden'
  };

  const tableStyle: React.CSSProperties = {
    minWidth: '1100px',
    width: '100%'
  };

  const headerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '80px 220px 150px 120px 140px 100px 100px 100px 110px',
    background: 'linear-gradient(135deg, #8892e8 0%, #9282a6 100%)', // 更柔和的表头背景
    color: 'white',
    fontWeight: '600'
  };

  const headerCellStyle: React.CSSProperties = {
    padding: '1rem 0.5rem',
    textAlign: 'center',
    fontSize: '0.9rem',
    borderRight: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const lastHeaderCellStyle: React.CSSProperties = {
    padding: '1rem 0.5rem',
    textAlign: 'center',
    fontSize: '0.9rem',
    borderRight: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const rowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '80px 220px 150px 120px 140px 100px 100px 100px 110px',
    borderBottom: '1px solid #e2e8f0'
  };

  const cellStyle: React.CSSProperties = {
    padding: '1rem 0.5rem',
    textAlign: 'center',
    color: '#2d3748',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const getRankBadgeStyle = (rank: number): React.CSSProperties => {
    let background = '#f7fafc';
    let color = '#4a5568';
    
    if (rank === 1) {
      background = 'linear-gradient(45deg, #ffd700, #ffed4e)';
      color = '#744210';
    } else if (rank === 2) {
      background = 'linear-gradient(45deg, #c0c0c0, #e2e8f0)';
      color = '#2d3748';
    } else if (rank === 3) {
      background = 'linear-gradient(45deg, #cd7f32, #d69e2e)';
      color = 'white';
    }

    return {
      padding: '0.3rem 0.6rem',
      borderRadius: '20px',
      fontWeight: 'bold',
      fontSize: '0.8rem',
      background,
      color
    };
  };

  const scoreValueStyle: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#2d3748'
  };

  const levelScoreStyle: React.CSSProperties = {
    color: '#2d3748',
    fontWeight: '600',
    fontSize: '0.9rem'
  };

  if (!data || data.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '3rem',
          textAlign: 'center'
        }}>
          <p style={{ color: '#718096', fontSize: '1.2rem', margin: 0 }}>
            No data available for the selected time period.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={tableContainerStyle}>
        <div style={scrollWrapperStyle}>
          <div style={tableStyle}>
            <div style={headerStyle}>
              <div style={headerCellStyle}>Rank</div>
              <div style={headerCellStyle}>Model Name</div>
              <div style={headerCellStyle}>Agent Framework</div>
              <div style={headerCellStyle}>Overall Score</div>
              <div style={headerCellStyle}>Number of Events</div>
              <div style={headerCellStyle}>Level-1 Score</div>
              <div style={headerCellStyle}>Level-2 Score</div>
              <div style={headerCellStyle}>Level-3 Score</div>
              <div style={lastHeaderCellStyle}>Level-4 Score</div>
            </div>
            
            <div>
              {data.map((entry, index) => (
                <div key={`${entry.modelName}-${index}`} style={rowStyle}>
                  <div style={cellStyle}>
                    <span style={getRankBadgeStyle(index + 1)}>#{index + 1}</span>
                  </div>
                  <div style={{...cellStyle, justifyContent: 'flex-start', paddingLeft: '1rem', fontWeight: '600'}}>
                    {entry.modelName}
                  </div>
                  <div style={{...cellStyle, color: '#8892e8', fontWeight: '500'}}>
                    {entry.agentFramework}
                  </div>
                  <div style={cellStyle}>
                    <span style={scoreValueStyle}>{entry.overallScore.toFixed(1)}</span>
                  </div>
                  <div style={{...cellStyle, color: '#4a5568', fontWeight: '500'}}>
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
    </div>
  );
};