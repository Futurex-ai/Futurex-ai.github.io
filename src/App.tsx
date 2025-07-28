/**
 * 应用主入口组件
 * 使用 useState 管理应用状态，根据当前激活的 tab 渲染相应内容
 */
import React, { useState } from 'react';
import { Banner } from './components/Banner';
import { MarkdownView } from './components/MarkdownView';
import { LeaderboardView } from './components/LeaderboardView';
import { TimePeriodType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leaderboard'>('overview');
  const [timePeriodType, setTimePeriodType] = useState<TimePeriodType>('weekly');
  const [selectedTime, setSelectedTime] = useState<string>('2025-06-W1');

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Banner 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main style={{ minHeight: 'calc(100vh - 180px)', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        {activeTab === 'overview' ? (
          <MarkdownView />
        ) : (
          <LeaderboardView 
            timePeriodType={timePeriodType}
            selectedTime={selectedTime}
            onTimePeriodTypeChange={setTimePeriodType}
            onSelectedTimeChange={setSelectedTime}
          />
        )}
      </main>
    </div>
  );
};

export default App;