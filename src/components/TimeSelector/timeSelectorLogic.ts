/**
 * 时间选择器逻辑处理
 * 负责生成可选的时间选项，支持周级和月级选择
 * 统一从2025年6月开始，支持级联选择
 */
import { TimePeriodType, TimeOption } from "../../types";

export interface MonthOption {
  value: string;
  label: string;
  weeks?: WeekOption[];
}

export interface WeekOption {
  value: string;
  label: string;
}

export const useTimeSelectorLogic = () => {
  const getTimeOptions = (periodType: TimePeriodType): TimeOption[] => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (periodType === "weekly") {
      return generateWeeklyOptions(currentYear, currentMonth);
    } else {
      return generateMonthlyOptions(currentYear, currentMonth);
    }
  };

  // 新增：获取级联选择器的月份选项（用于weekly模式）
  const getMonthOptions = (): MonthOption[] => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const options: MonthOption[] = [];

    // 从2025年6月开始到当前月份
    for (let year = 2025; year <= currentYear; year++) {
      const startMonth = year === 2025 ? 6 : 1;
      // 修正：确保只显示到当前月份，不显示未来月份
      const endMonth = year === currentYear ? currentMonth : 12;

      for (let month = startMonth; month <= endMonth; month++) {
        const monthValue = `${year}-${month.toString().padStart(2, "0")}`;
        const monthLabel = `${year} ${getMonthName(month)}`;

        // 生成该月的周选项（英文）
        const weeks: WeekOption[] = [];
        const weeksInMonth = getWeeksInMonth(year, month);

        for (let week = 1; week <= weeksInMonth; week++) {
          const weekValue = `${year}-${month
            .toString()
            .padStart(2, "0")}-W${week}`;
          const weekLabel = getWeekLabel(week);
          weeks.push({ value: weekValue, label: weekLabel });
        }

        options.push({
          value: monthValue,
          label: monthLabel,
          weeks,
        });
      }
    }

    return options;
  };

  const generateWeeklyOptions = (
    currentYear: number,
    currentMonth: number
  ): TimeOption[] => {
    const options: TimeOption[] = [];

    // 从2025年6月开始到当前月份
    for (let year = 2025; year <= currentYear; year++) {
      const startMonth = year === 2025 ? 6 : 1;
      const endMonth = year === currentYear ? currentMonth : 12;

      for (let month = startMonth; month <= endMonth; month++) {
        const weeksInMonth = getWeeksInMonth(year, month);

        for (let week = 1; week <= weeksInMonth; week++) {
          const value = `${year}-${month.toString().padStart(2, "0")}-W${week}`;
          const label = `${year} ${getMonthName(month)} ${getWeekLabel(week)}`;
          options.push({ value, label });
        }
      }
    }

    return options;
  };

  const generateMonthlyOptions = (
    currentYear: number,
    currentMonth: number
  ): TimeOption[] => {
    const options: TimeOption[] = [];

    // 从2025年6月开始到当前月份
    for (let year = 2025; year <= currentYear; year++) {
      const startMonth = year === 2025 ? 6 : 1;
      const endMonth = year === currentYear ? currentMonth : 12;

      for (let month = startMonth; month <= endMonth; month++) {
        const value = `${year}-${month.toString().padStart(2, "0")}`;
        const label = `${year} ${getMonthName(month)}`;
        options.push({ value, label });
      }
    }

    return options;
  };

  const getWeeksInMonth = (year: number, month: number): number => {
    return 4; // 简化处理，每月固定4周
  };

  const getMonthName = (month: number): string => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month - 1];
  };

  const getWeekLabel = (week: number): string => {
    const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];
    return weekLabels[week - 1] || `Week ${week}`;
  };

  return {
    getTimeOptions,
    getMonthOptions,
  };
};
