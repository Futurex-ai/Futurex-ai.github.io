/**
 * 榜单视图组件
 * 组合时间选择器和榜单组件，负责整个榜单页面的布局
 */
import React from 'react';
import { TimePeriodType } from '../../types';
import { TimeSelector } from '../TimeSelector';
import { Leaderboard } from '../Leaderboard';

interface LeaderboardViewProps {
  timePeriodType: TimePeriodType;
  selectedTime: string;
  onTimePeriodTypeChange: (type: TimePeriodType) => void;
  onSelectedTimeChange: (time: string) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  timePeriodType,
  selectedTime,
  onTimePeriodTypeChange,
  onSelectedTimeChange
}) => {
  const containerStyle: React.CSSProperties = {
    minHeight: 'calc(100vh - 200px)',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '2rem 0'
  };

  const controlsStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  };

  return (
    <div style={containerStyle}>
      <div style={controlsStyle}>
        <TimeSelector 
          timePeriodType={timePeriodType}
          selectedTime={selectedTime}
          onTimePeriodTypeChange={onTimePeriodTypeChange}
          onSelectedTimeChange={onSelectedTimeChange}
        />
      </div>
      <Leaderboard 
        timePeriodType={timePeriodType}
        selectedTime={selectedTime}
      />
    </div>
  );
};