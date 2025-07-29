/**
 * 榜单数据管理
 * 负责处理榜单数据，直接使用内嵌数据而不是JSON文件导入
 */
import { LeaderboardEntry, TimePeriodType, LeaderboardData } from "../../types";
import leaderboardData from "../../data/leaderboard.json";
// const leaderboardData: LeaderboardData =

export const useLeaderboardData = () => {
  const getLeaderboardData = (
    timePeriodType: TimePeriodType,
    selectedTime: string
  ) => {
    const periodData = leaderboardData[timePeriodType];
    return periodData[selectedTime] || [];
  };

  const getAvailableTimes = (timePeriodType: TimePeriodType) => {
    return Object.keys(leaderboardData[timePeriodType]);
  };

  return {
    getLeaderboardData,
    getAvailableTimes,
  };
};
