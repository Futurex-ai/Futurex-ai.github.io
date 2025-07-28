/**
 * 榜单数据管理
 * 负责处理榜单数据，直接使用内嵌数据而不是JSON文件导入
 */
import { LeaderboardEntry, TimePeriodType } from "../../types";
import leaderboardData from "../../data/leaderboard.json";

export const useLeaderboardData = () => {
  const getLeaderboardData = (
    timePeriodType: TimePeriodType,
    selectedTime: string
  ): LeaderboardEntry[] => {
    const data = leaderboardData[timePeriodType]?.[selectedTime];

    if (!data) {
      return [];
    }

    // 按 Overall Score 降序排序
    return [...data].sort((a, b) => b.overallScore - a.overallScore);
  };

  return {
    getLeaderboardData,
  };
};
