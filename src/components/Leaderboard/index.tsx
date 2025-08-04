/**
 * 榜单组件
 * 负责展示排行榜数据，包括模型信息和各项评分，支持横向滚动
 * 支持对Level分数进行排序
 */
import React, { useState, useMemo } from 'react';
import { TimePeriodType } from '../../types';
import { useLeaderboardData } from './leaderboardData';
import './index.css';

interface LeaderboardProps {
  timePeriodType: TimePeriodType;
  selectedTime: string;
}

type SortField = 'level1Score' | 'level2Score' | 'level3Score' | 'level4Score' | 'overallScore';
type SortDirection = 'asc' | 'desc';

interface SortConfig {
  field: SortField | null;
  direction: SortDirection;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  timePeriodType,
  selectedTime
}) => {
  const { getLeaderboardData } = useLeaderboardData();
  const data = getLeaderboardData(timePeriodType, selectedTime);

  // 排序状态
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: null,
    direction: 'desc'
  });

  // 排序后的数据
  const sortedData = useMemo(() => {
    if (!data || !sortConfig.field) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.field!];
      const bValue = b[sortConfig.field!];
      
      if (sortConfig.direction === 'desc') {
        return bValue - aValue;
      } else {
        return aValue - bValue;
      }
    });
  }, [data, sortConfig]);

  // 排序处理函数
  const handleSort = (field: SortField) => {
    setSortConfig(prev => {
      if (prev.field === field) {
        // 如果点击同一列，切换排序方向
        return {
          field,
          direction: prev.direction === 'desc' ? 'asc' : 'desc'
        };
      } else {
        // 如果点击不同列，默认降序
        return {
          field,
          direction: 'desc'
        };
      }
    });
  };

  // 渲染排序图标
  const renderSortIcon = (field: SortField) => {
    const isActive = sortConfig.field === field;
    
    if (!isActive) {
      return (
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="leaderboard__sort-icon--inactive"
        >
          <path 
            d="M8 9l4-4 4 4M16 15l-4 4-4-4" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    return (
      <svg 
        width="12" 
        height="12" 
        viewBox="0 0 24 24" 
        fill="none"
        className={`leaderboard__sort-icon--active ${
          sortConfig.direction === 'asc' ? 'leaderboard__sort-icon--asc' : 'leaderboard__sort-icon--desc'
        }`}
      >
        <path 
          d="M7 14l5-5 5 5" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  // 获取排名徽章的CSS类名
  const getRankBadgeClass = (index: number) => {
    if (index === 0) return 'leaderboard__rank-badge leaderboard__rank-badge--first';
    if (index === 1) return 'leaderboard__rank-badge leaderboard__rank-badge--second';
    if (index === 2) return 'leaderboard__rank-badge leaderboard__rank-badge--third';
    return 'leaderboard__rank-badge leaderboard__rank-badge--other';
  };

  // 数据检查
  if (!data || data.length === 0) {
    return (
      <div className="leaderboard__container">
        <div className="leaderboard__empty">
          {/* 空状态图标 */}
          <div className="leaderboard__empty-icon">
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none"
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
          <h3 className="leaderboard__empty-title">
            No Data Available
          </h3>
          
          {/* 空状态描述 */}
          <p className="leaderboard__empty-description">
            {timePeriodType === 'monthly' 
              ? "Monthly data is not available yet. Please try selecting Weekly view to see available data."
              : "There is currently no leaderboard data available for the selected time period. Please try selecting a different time range."
            }
          </p>

          {/* 提示信息 */}
          <div className="leaderboard__empty-tip">
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
    <div className="leaderboard__container">
      <div className="leaderboard__table-container">
        <div className="leaderboard__scroll-wrapper">
          <div className="leaderboard__table">
            {/* 固定表头 */}
            <div className="leaderboard__sticky-header">
              <div className="leaderboard__header">
                <div className="leaderboard__header-cell leaderboard__header-cell--sticky leaderboard__header-cell--rank">
                  Rank
                </div>
                <div className="leaderboard__header-cell leaderboard__header-cell--sticky leaderboard__header-cell--name">
                  NAME (Agent Framework)
                </div>
                <div className="leaderboard__header-cell">
                  Model Name
                </div>
                <div className="leaderboard__header-cell">
                  Organization
                </div>
                <div 
                  className={`leaderboard__header-cell leaderboard__header-cell--sortable ${
                    sortConfig.field === 'overallScore' ? 'active' : ''
                  }`}
                  onClick={() => handleSort('overallScore')}
                >
                  Overall
                  {renderSortIcon('overallScore')}
                </div>
                <div className="leaderboard__header-cell">
                  Events
                </div>
                <div 
                  className={`leaderboard__header-cell leaderboard__header-cell--sortable ${
                    sortConfig.field === 'level1Score' ? 'active' : ''
                  }`}
                  onClick={() => handleSort('level1Score')}
                >
                  Level 1
                  {renderSortIcon('level1Score')}
                </div>
                <div 
                  className={`leaderboard__header-cell leaderboard__header-cell--sortable ${
                    sortConfig.field === 'level2Score' ? 'active' : ''
                  }`}
                  onClick={() => handleSort('level2Score')}
                >
                  Level 2
                  {renderSortIcon('level2Score')}
                </div>
                <div 
                  className={`leaderboard__header-cell leaderboard__header-cell--sortable ${
                    sortConfig.field === 'level3Score' ? 'active' : ''
                  }`}
                  onClick={() => handleSort('level3Score')}
                >
                  Level 3
                  {renderSortIcon('level3Score')}
                </div>
                <div 
                  className={`leaderboard__header-cell leaderboard__header-cell--sortable ${
                    sortConfig.field === 'level4Score' ? 'active' : ''
                  }`}
                  onClick={() => handleSort('level4Score')}
                >
                  Level 4
                  {renderSortIcon('level4Score')}
                </div>
              </div>
            </div>
            
            {/* 数据行 */}
            {sortedData && sortedData.length > 0 && sortedData.map((entry, index) => (
              <div key={`${entry.modelName}-${index}`} className="leaderboard__row">
                <div className="leaderboard__cell leaderboard__cell--rank">
                  <span className={getRankBadgeClass(index)}>
                    {index + 1}
                  </span>
                </div>
                <div className="leaderboard__cell leaderboard__cell--name">
                  <div>
                    <div>{entry.modelName}</div>
                    <span className="leaderboard__framework">({entry.agentFramework})</span>
                  </div>
                </div>
                <div className="leaderboard__cell leaderboard__cell--model">
                  {(() => {
                    const undisclosedModels = ['Manus', 'OpenAI-Deepreasearch', 'Genspark'];
                    return undisclosedModels.includes(entry.modelName) ? 'Undisclosed' : entry.modelName;
                  })()}
                </div>
                <div className="leaderboard__cell leaderboard__cell--organization">
                  {entry.organization}
                </div>
                <div className="leaderboard__cell leaderboard__cell--overall-score">
                  <span className="leaderboard__score">
                    {entry.overallScore.toFixed(1)}
                  </span>
                </div>
                <div className="leaderboard__cell leaderboard__cell--events">
                  {entry.numberOfEvents.toLocaleString()}
                </div>
                <div className="leaderboard__cell leaderboard__cell--level-score">
                  <span className="leaderboard__score">
                    {entry.level1Score}
                  </span>
                </div>
                <div className="leaderboard__cell leaderboard__cell--level-score">
                  <span className="leaderboard__score">
                    {entry.level2Score}
                  </span>
                </div>
                <div className="leaderboard__cell leaderboard__cell--level-score">
                  <span className="leaderboard__score">
                    {entry.level3Score}
                  </span>
                </div>
                <div className="leaderboard__cell leaderboard__cell--level-score">
                  <span className="leaderboard__score">
                    {entry.level4Score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};