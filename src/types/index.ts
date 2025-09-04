/**
 * 全局类型定义
 * 定义榜单数据、时间选择等相关类型
 */

export enum TestType {
  Official = 0,
  ThirdParty = 1,
}
export interface LeaderboardEntry {
  modelName: string;
  agentFramework: string;
  organization: string;
  overallScore: number;
  numberOfEvents: number;
  testType?: TestType;
  level1Score: number;
  level2Score: number;
  level3Score: number;
  level4Score: number;
}

export interface LeaderboardData {
  weekly: Record<string, LeaderboardEntry[]>;
  monthly: Record<string, LeaderboardEntry[]>;
}

export type TimePeriodType = "overall" | "weekly" | "monthly";

export interface TimeOption {
  value: string;
  label: string;
}

export type CategoryType = "general" | "finance";

export interface QuestionEntry {
  level: string;
  question: string;
  options: string[];
}

export interface QuestionData {
  questions: QuestionEntry[];
}
