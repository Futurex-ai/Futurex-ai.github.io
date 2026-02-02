/**
 * 时间选择器逻辑处理
 * 负责生成可选的时间选项，支持周级和月级选择
 * 统一从2025年7月开始，支持级联选择
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

// 可配置的常量
const START_YEAR = 2025;
const START_MONTH = 7; // 从7月开始
const END_MONTH = 1; // 最新数据的月份展示（手动配置）
const START_WEEK = 4; // 从第4周开始
const LATEST_WEEK = 1; // 最新数据周数（可手动配置）

const MONTH_NAMES = [
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
const WEEK_LABELS = ["Week 1", "Week 2", "Week 3", "Week 4"];

export const useTimeSelectorLogic = () => {
  const getCurrentDateInfo = () => {
    const currentDate = new Date();
    return {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      week: Math.ceil(currentDate.getDate() / 7),
    };
  };

  const getTimeOptions = (periodType: TimePeriodType): TimeOption[] => {
    const {
      year: currentYear,
      month: currentMonth,
      week: currentWeek,
    } = getCurrentDateInfo();

    return periodType === "weekly"
      ? generateWeeklyOptions(currentYear, currentMonth, currentWeek)
      : generateMonthlyOptions(currentYear, currentMonth);
  };

  const getMonthOptions = (): MonthOption[] => {
    const {
      year: currentYear,
      month: currentMonth,
      week: currentWeek,
    } = getCurrentDateInfo();
    const options: MonthOption[] = [];

    // 生成从起始年月到配置的结束月份的所有月份选项
    for (let year = START_YEAR; year <= currentYear; year++) {
      const startMonth = year === START_YEAR ? START_MONTH : 1;
      const endMonth = year === currentYear ? END_MONTH : 12;

      for (let month = startMonth; month <= endMonth; month++) {
        options.push(
          createMonthOption(year, month, currentYear, END_MONTH, currentWeek),
        );
      }
    }

    return options;
  };

  const createMonthOption = (
    year: number,
    month: number,
    currentYear: number,
    endMonth: number, // 改为使用endMonth参数
    currentWeek: number,
  ): MonthOption => {
    const monthValue = `${year}-${month.toString().padStart(2, "0")}`;
    const monthLabel = `${year} ${getMonthName(month)}`;

    // 生成该月的周选项
    const weeks: WeekOption[] = [];
    const weeksInMonth = getWeeksInMonth(year, month);

    // 特殊处理：起始月份从指定周开始，其他月份从Week1开始
    const startWeek =
      year === START_YEAR && month === START_MONTH ? START_WEEK : 1;

    // 控制显示的周数：如果是结束月份，使用配置的最新周数
    const maxWeek =
      year === currentYear && month === endMonth
        ? Math.min(LATEST_WEEK, weeksInMonth)
        : weeksInMonth;

    for (let week = startWeek; week <= maxWeek; week++) {
      weeks.push(createWeekOption(year, month, week));
    }

    return {
      value: monthValue,
      label: monthLabel,
      weeks: weeks.length > 0 ? weeks : undefined,
    };
  };

  const createWeekOption = (
    year: number,
    month: number,
    week: number,
  ): WeekOption => {
    return {
      value: `${year}-${month.toString().padStart(2, "0")}-W${week}`,
      label: getWeekLabel(week),
    };
  };

  const generateWeeklyOptions = (
    currentYear: number,
    currentMonth: number,
    currentWeek: number,
  ): TimeOption[] => {
    const options: TimeOption[] = [];

    // 从起始年月到配置的结束月份
    for (let year = START_YEAR; year <= currentYear; year++) {
      const startMonth = year === START_YEAR ? START_MONTH : 1;
      const endMonth = year === currentYear ? END_MONTH : 12;

      for (let month = startMonth; month <= endMonth; month++) {
        const weeksInMonth = getWeeksInMonth(year, month);

        // 特殊处理：起始月份从指定周开始，其他月份从Week1开始
        const startWeek =
          year === START_YEAR && month === START_MONTH ? START_WEEK : 1;

        // 控制显示的周数：如果是结束月份，使用配置的最新周数
        const maxWeek =
          year === currentYear && month === END_MONTH
            ? Math.min(LATEST_WEEK, weeksInMonth)
            : weeksInMonth;

        for (let week = startWeek; week <= maxWeek; week++) {
          options.push(createWeeklyTimeOption(year, month, week));
        }
      }
    }

    return options;
  };

  const createWeeklyTimeOption = (
    year: number,
    month: number,
    week: number,
  ): TimeOption => {
    return {
      value: `${year}-${month.toString().padStart(2, "0")}-W${week}`,
      label: `${year} ${getMonthName(month)} ${getWeekLabel(week)}`,
    };
  };

  const generateMonthlyOptions = (
    currentYear: number,
    currentMonth: number,
  ): TimeOption[] => {
    const options: TimeOption[] = [];

    // 从起始年月到配置的结束月份
    for (let year = START_YEAR; year <= currentYear; year++) {
      const startMonth = year === START_YEAR ? START_MONTH : 1;
      const endMonth = year === currentYear ? END_MONTH : 12;

      for (let month = startMonth; month <= endMonth; month++) {
        options.push(createMonthlyTimeOption(year, month));
      }
    }

    return options;
  };

  const createMonthlyTimeOption = (year: number, month: number): TimeOption => {
    return {
      value: `${year}-${month.toString().padStart(2, "0")}`,
      label: `${year} ${getMonthName(month)}`,
    };
  };

  const getWeeksInMonth = (year: number, month: number): number => {
    // 这里可以扩展为实际计算每月周数的逻辑
    // 目前简化处理，每月固定4周
    return 4;
  };

  const getMonthName = (month: number): string => {
    return MONTH_NAMES[month - 1] || `Month ${month}`;
  };

  const getWeekLabel = (week: number): string => {
    return WEEK_LABELS[week - 1] || `Week ${week}`;
  };

  return {
    getTimeOptions,
    getMonthOptions,
  };
};
