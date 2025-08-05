/**
 * 榜单组件
 * 负责展示排行榜数据，包括模型信息和各项评分，支持横向滚动
 * 支持对Level分数进行排序，支持Model Name和Agent Framework筛选
 */
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { TimePeriodType } from '../../types';
import { useLeaderboardData } from './leaderboardData';
import './index.css';

interface LeaderboardProps {
  timePeriodType: TimePeriodType;
  selectedTime: string;
}

type SortField = 'level1Score' | 'level2Score' | 'level3Score' | 'level4Score' | 'overallScore';
type SortDirection = 'asc' | 'desc';
type FilterField = 'modelName' | 'agentFramework';

interface SortConfig {
  field: SortField | null;
  direction: SortDirection;
}

interface FilterConfig {
  modelName: string[];
  agentFramework: string[];
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

  // 筛选状态
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    modelName: [],
    agentFramework: []
  });

  // 筛选下拉框显示状态
  const [showFilters, setShowFilters] = useState<{
    modelName: boolean;
    agentFramework: boolean;
  }>({
    modelName: false,
    agentFramework: false
  });

  // 筛选下拉框引用，用于点击外部关闭
  const modelNameFilterRef = useRef<HTMLDivElement>(null);
  const agentFrameworkFilterRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭筛选下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modelNameFilterRef.current && 
        !modelNameFilterRef.current.contains(event.target as Node)
      ) {
        setShowFilters(prev => ({ ...prev, modelName: false }));
      }
      if (
        agentFrameworkFilterRef.current && 
        !agentFrameworkFilterRef.current.contains(event.target as Node)
      ) {
        setShowFilters(prev => ({ ...prev, agentFramework: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 获取去重后的筛选选项
  const filterOptions = useMemo(() => {
    if (!data) return { modelName: [], agentFramework: [] };

    const modelNames = [...new Set(data.map(entry => entry.modelName))].sort();
    const agentFrameworks = [...new Set(data.map(entry => entry.agentFramework))].sort();

    return {
      modelName: modelNames,
      agentFramework: agentFrameworks
    };
  }, [data]);

  // 筛选后的数据
  const filteredData = useMemo(() => {
    if (!data) return null;

    return data.filter(entry => {
      const modelNameMatch = filterConfig.modelName.length === 0 || 
                            filterConfig.modelName.includes(entry.modelName);
      const agentFrameworkMatch = filterConfig.agentFramework.length === 0 || 
                                 filterConfig.agentFramework.includes(entry.agentFramework);
      
      return modelNameMatch && agentFrameworkMatch;
    });
  }, [data, filterConfig]);

  // 排序后的数据
  const sortedData = useMemo(() => {
    if (!filteredData || !sortConfig.field) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.field!];
      const bValue = b[sortConfig.field!];

      if (sortConfig.direction === 'desc') {
        return bValue - aValue;
      } else {
        return aValue - bValue;
      }
    });
  }, [filteredData, sortConfig]);

  // 排序处理函数
  const handleSort = (field: SortField) => {
    setSortConfig(prev => {
      if (prev.field === field) {
        return {
          field,
          direction: prev.direction === 'desc' ? 'asc' : 'desc'
        };
      } else {
        return {
          field,
          direction: 'desc'
        };
      }
    });
  };

  // 筛选处理函数
  const handleFilter = (field: FilterField, value: string) => {
    setFilterConfig(prev => {
      const currentValues = prev[field];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [field]: newValues
      };
    });
  };

  // 清空筛选
  const clearFilter = (field: FilterField) => {
    setFilterConfig(prev => ({
      ...prev,
      [field]: []
    }));
  };

  // 切换筛选下拉框显示
  const toggleFilter = (field: FilterField) => {
    setShowFilters(prev => ({
      ...prev,
      [field]: !prev[field],
      // 关闭其他筛选框
      ...(field === 'modelName' ? { agentFramework: false } : { modelName: false })
    }));
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

  // 渲染筛选图标
  const renderFilterIcon = (field: FilterField) => {
    const hasActiveFilter = filterConfig[field].length > 0;
    
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        className={`leaderboard__filter-icon ${hasActiveFilter ? 'leaderboard__filter-icon--active' : ''}`}
      >
        <path
          d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  // 渲染筛选下拉框
  const renderFilterDropdown = (field: FilterField) => {
    if (!showFilters[field]) return null;

    const options = filterOptions[field];
    const selectedValues = filterConfig[field];

    return (
      <div className="leaderboard__filter-dropdown">
        <div className="leaderboard__filter-header">
          <span>Filter {field === 'modelName' ? 'Model Name' : 'Agent Framework'}</span>
          {selectedValues.length > 0 && (
            <button
              className="leaderboard__filter-clear"
              onClick={() => clearFilter(field)}
            >
              Clear
            </button>
          )}
        </div>
        <div className="leaderboard__filter-options">
          {options.map((option:any) => (
            <label key={option} className="leaderboard__filter-option">
              <input
                type="checkbox"
                checked={selectedValues.includes(option)}
                onChange={() => handleFilter(field, option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
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
                  NAME
                </div>
                <div className="leaderboard__header-cell leaderboard__header-cell--filterable" ref={modelNameFilterRef}>
                  <span>Model Name</span>
                  <button
                    className="leaderboard__filter-button"
                    onClick={() => toggleFilter('modelName')}
                  >
                    {renderFilterIcon('modelName')}
                  </button>
                  {renderFilterDropdown('modelName')}
                </div>
                <div className="leaderboard__header-cell leaderboard__header-cell--filterable" ref={agentFrameworkFilterRef}>
                  <span>Agent Framework</span>
                  <button
                    className="leaderboard__filter-button"
                    onClick={() => toggleFilter('agentFramework')}
                  >
                    {renderFilterIcon('agentFramework')}
                  </button>
                  {renderFilterDropdown('agentFramework')}
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
                <div className="leaderboard__cell leaderboard__cell--framework">
                  {entry.agentFramework}
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

            {/* 筛选后无数据时的提示 */}
            {sortedData && sortedData.length === 0 && (
              <div className="leaderboard__no-results">
                <div className="leaderboard__no-results-content">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>No data matches the filter criteria</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};