/**
 * 时间选择器组件
 * 提供周级和月级时间选择功能，使用现代化的按钮组和下拉框设计
 */
import React, { useState, useRef, useEffect } from 'react';
import { TimePeriodType } from '../../types';
import { useTimeSelectorLogic } from './timeSelectorLogic';

interface TimeSelectorProps {
  timePeriodType: TimePeriodType;
  selectedTime: string;
  onTimePeriodTypeChange: (type: TimePeriodType) => void;
  onSelectedTimeChange: (time: string) => void;
}

export const TimeSelector: React.FC<TimeSelectorProps> = ({
  timePeriodType,
  selectedTime,
  onTimePeriodTypeChange,
  onSelectedTimeChange
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getTimeOptions } = useTimeSelectorLogic();
  const timeOptions = getTimeOptions(timePeriodType);

  const selectedOption = timeOptions.find(option => option.value === selectedTime);

  // 监听点击外部区域关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handlePeriodTypeChange = (type: TimePeriodType) => {
    onTimePeriodTypeChange(type);
    // 设置默认时间
    if (type === 'weekly') {
      onSelectedTimeChange('2025-06-W1');
    } else {
      onSelectedTimeChange('2025-07');
    }
    setIsDropdownOpen(false);
  };

  const handleTimeSelect = (value: string) => {
    onSelectedTimeChange(value);
    setIsDropdownOpen(false);
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  };

  const periodSelectorStyle: React.CSSProperties = {
    display: 'flex',
    background: 'white',
    borderRadius: '12px',
    padding: '6px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0'
  };

  const getPeriodButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '0.75rem 1.5rem',
    border: 'none',
    background: isActive ? 'linear-gradient(135deg, #8892e8 0%, #9282a6 100%)' : 'transparent', // 更柔和的紫色渐变
    color: isActive ? 'white' : '#4a5568',
    fontSize: '0.9rem',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    boxShadow: isActive ? '0 2px 4px rgba(136, 146, 232, 0.3)' : 'none' // 调整阴影颜色
  });

  const dropdownContainerStyle: React.CSSProperties = {
    position: 'relative',
    minWidth: '280px'
  };

  const dropdownButtonStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.875rem 1.25rem',
    paddingRight: '2.75rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    background: 'white',
    color: '#2d3748',
    fontSize: '0.95rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    position: 'relative'
  };

  const dropdownButtonFocusStyle: React.CSSProperties = {
    borderColor: '#8892e8', // 更柔和的边框色
    boxShadow: '0 0 0 3px rgba(136, 146, 232, 0.1), 0 2px 8px rgba(0, 0, 0, 0.1)' // 调整焦点颜色
  };

  const arrowContainerStyle: React.CSSProperties = {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none'
  };

  const arrowStyle: React.CSSProperties = {
    width: '16px',
    height: '16px',
    fill: '#6b7280',
    transition: 'transform 0.3s ease',
    transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
  };

  const dropdownMenuStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: '4px',
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    maxHeight: '240px',
    overflowY: 'auto'
  };

  const optionStyle: React.CSSProperties = {
    padding: '0.75rem 1.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '0.9rem',
    color: '#2d3748',
    borderBottom: '1px solid #f7fafc'
  };

  const optionHoverStyle: React.CSSProperties = {
    background: '#f8fafc',
    color: '#8892e8' // 更柔和的悬停颜色
  };

  const selectedOptionStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #8892e8 0%, #9282a6 100%)', // 更柔和的选中背景
    color: 'white',
    fontWeight: '600'
  };

  return (
    <div style={containerStyle}>
      <div style={periodSelectorStyle}>
        <button
          style={getPeriodButtonStyle(timePeriodType === 'weekly')}
          onClick={() => handlePeriodTypeChange('weekly')}
        >
          📊 Weekly
        </button>
        <button
          style={getPeriodButtonStyle(timePeriodType === 'monthly')}
          onClick={() => handlePeriodTypeChange('monthly')}
        >
          📈 Monthly
        </button>
      </div>
      
      <div style={dropdownContainerStyle} ref={dropdownRef}>
        <button
          style={isDropdownOpen ? {...dropdownButtonStyle, ...dropdownButtonFocusStyle} : dropdownButtonStyle}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{selectedOption?.label || 'Select time period'}</span>
          <div style={arrowContainerStyle}>
            <svg style={arrowStyle} viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
            </svg>
          </div>
        </button>
        
        {isDropdownOpen && (
          <div style={dropdownMenuStyle}>
            {timeOptions.map((option, index) => (
              <div
                key={option.value}
                style={{
                  ...optionStyle,
                  ...(option.value === selectedTime ? selectedOptionStyle : {}),
                  borderBottom: index === timeOptions.length - 1 ? 'none' : '1px solid #f7fafc'
                }}
                onClick={() => handleTimeSelect(option.value)}
                onMouseEnter={(e) => {
                  if (option.value !== selectedTime) {
                    Object.assign(e.target.style, optionHoverStyle);
                  }
                }}
                onMouseLeave={(e) => {
                  if (option.value !== selectedTime) {
                    Object.assign(e.target.style, { background: 'transparent', color: '#2d3748' });
                  }
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};