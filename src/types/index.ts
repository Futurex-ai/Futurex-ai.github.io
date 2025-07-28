/**
 * 全局类型定义
 * 定义榜单数据、时间选择等相关类型
 */

export interface LeaderboardEntry {
  modelName: string;
  agentFramework: string;
  overallScore: number;
  numberOfEvents: number;
  level1Score: number;
  level2Score: number;
  level3Score: number;
  level4Score: number;
}

export interface LeaderboardData {
  weekly: Record<string, LeaderboardEntry[]>;
  monthly: Record<string, LeaderboardEntry[]>;
}

export type TimePeriodType = 'weekly' | 'monthly';

export interface TimeOption {
  value: string;
  label: string;
}
