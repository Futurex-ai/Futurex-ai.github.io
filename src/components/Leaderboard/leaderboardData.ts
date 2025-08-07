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
  ): LeaderboardEntry[] | null => {
    if (timePeriodType === "overall") {
      return leaderboardData.overall;
    }

    const data = leaderboardData[timePeriodType];
    if (!data) return null;

    return data[selectedTime] || null;
  };

  return {
    getLeaderboardData,
  };
};
