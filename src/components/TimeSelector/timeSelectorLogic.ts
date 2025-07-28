/**
 * 时间选择器逻辑处理
 * 负责生成可选的时间选项，支持周级和月级选择
 * 周级从2025年6月开始，月级从2025年7月开始
 */
import { TimePeriodType, TimeOption } from '../../types';

export const useTimeSelectorLogic = () => {
  const getTimeOptions = (periodType: TimePeriodType): TimeOption[] => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    if (periodType === 'weekly') {
      return generateWeeklyOptions(currentYear, currentMonth);
    } else {
      return generateMonthlyOptions(currentYear, currentMonth);
    }
  };

  const generateWeeklyOptions = (currentYear: number, currentMonth: number): TimeOption[] => {
    const options: TimeOption[] = [];
    
    // 从2025年6月开始
    for (let year = 2025; year <= Math.max(currentYear, 2025); year++) {
      const startMonth = year === 2025 ? 6 : 1;
      const endMonth = year === currentYear && currentYear > 2025 ? currentMonth : 12;
      
      for (let month = startMonth; month <= endMonth; month++) {
        const weeksInMonth = getWeeksInMonth(year, month);
        
        for (let week = 1; week <= weeksInMonth; week++) {
          const value = `${year}-${month.toString().padStart(2, '0')}-W${week}`;
          const label = `${year} ${getMonthName(month)} Week ${week}`;
          options.push({ value, label });
        }
      }
    }
    
    return options;
  };

  const generateMonthlyOptions = (currentYear: number, currentMonth: number): TimeOption[] => {
    const options: TimeOption[] = [];
    
    // 从2025年7月开始
    for (let year = 2025; year <= Math.max(currentYear, 2025); year++) {
      const startMonth = year === 2025 ? 7 : 1;
      const endMonth = year === currentYear && currentYear > 2025 ? currentMonth : 12;
      
      for (let month = startMonth; month <= endMonth; month++) {
        const value = `${year}-${month.toString().padStart(2, '0')}`;
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
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1];
  };

  return {
    getTimeOptions
  };
};