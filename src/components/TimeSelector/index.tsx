/**
 * 时间选择器组件
 * 提供overall、周级和月级时间选择功能，weekly模式支持树形选择
 */
import React, { useState, useRef, useEffect } from "react";
import Tea from "byted-tea-sdk";

import { TimePeriodType } from "../../types";
import { useTimeSelectorLogic } from "./timeSelectorLogic";
import "./index.less";

// 可配置的常量
const END_MONTH = 9; // 结束月份（手动配置）
const LATEST_WEEK = 3; // 最新数据周数（可手动配置）

interface TimeSelectorProps {
  timePeriodType: TimePeriodType;
  selectedTime: string;
  onTimePeriodTypeChange: (type: TimePeriodType) => void;
  onSelectedTimeChange: (time: string) => void;
}

export const TimeSelector: React.FC<TimeSelectorProps> = ({
  timePeriodType,
  selectedTime,
  onTimePeriodTypeChange,
  onSelectedTimeChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getTimeOptions, getMonthOptions } = useTimeSelectorLogic();

  const timeOptions = getTimeOptions(timePeriodType);
  const monthOptions = getMonthOptions();

  // 获取选中的选项显示文本
  const getSelectedOption = () => {
    if (timePeriodType === "weekly") {
      const monthFromTime = selectedTime.substring(0, 7);
      const selectedMonthOption = monthOptions.find(
        (m) => m.value === monthFromTime
      );
      const selectedWeekOption = selectedMonthOption?.weeks?.find(
        (w) => w.value === selectedTime
      );

      if (selectedWeekOption && selectedMonthOption) {
        return `${selectedMonthOption.label} ${selectedWeekOption.label}`;
      }
      return "Select time period";
    } else {
      const selectedOption = timeOptions.find(
        (option) => option.value === selectedTime
      );
      return selectedOption?.label || "Select time period";
    }
  };

  // 监听点击外部区域关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // 初始化展开状态：如果有选中的weekly时间，自动展开对应月份
  useEffect(() => {
    if (timePeriodType === "weekly" && selectedTime) {
      const monthFromTime = selectedTime.substring(0, 7);
      setExpandedMonths((prev) => new Set([...prev, monthFromTime]));
    }
  }, [timePeriodType, selectedTime]);

  const handlePeriodTypeChange = (type: TimePeriodType) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    // 使用配置的END_MONTH而不是当前月份
    const endMonth = String(END_MONTH).padStart(2, "0");

    onTimePeriodTypeChange(type);

    // 根据不同类型设置默认时间
    if (type === "overall") {
      onSelectedTimeChange("overall");
    } else if (type === "weekly") {
      // 使用配置的最新周数，默认选择结束月份
      onSelectedTimeChange(`${currentYear}-${endMonth}-W${LATEST_WEEK}`);
      // 自动展开结束月份
      setExpandedMonths(new Set([`${currentYear}-${endMonth}`]));
    } else {
      onSelectedTimeChange(`${currentYear}-${endMonth}`);
      setExpandedMonths(new Set());
    }
    setIsDropdownOpen(false);
  };

  const handleMonthToggle = (monthValue: string) => {
    setExpandedMonths((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(monthValue)) {
        newSet.delete(monthValue);
      } else {
        newSet.add(monthValue);
      }
      return newSet;
    });
  };

  const handleWeekSelect = (weekValue: string) => {
    onSelectedTimeChange(weekValue);
    setIsDropdownOpen(false);
  };

  const handleTimeSelect = (value: string) => {
    onSelectedTimeChange(value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="time-selector-container">
      <div className="period-selector">
        <button
          className={`period-button ${
            timePeriodType === "overall"
              ? "period-button--active"
              : "period-button--inactive"
          }`}
          onClick={() => {
            handlePeriodTypeChange("overall");
            Tea.event("crawl_api_custom", {
              name: "点击Overall",
            });
          }}
        >
          Overall
        </button>
        <button
          className={`period-button ${
            timePeriodType === "weekly"
              ? "period-button--active"
              : "period-button--inactive"
          }`}
          onClick={() => {
            handlePeriodTypeChange("weekly");
            Tea.event("crawl_api_custom", {
              name: "点击Weekly",
            });
          }}
        >
          Weekly
        </button>
        <button
          className={`period-button ${
            timePeriodType === "monthly"
              ? "period-button--active"
              : "period-button--inactive"
          }`}
          onClick={() => {
            handlePeriodTypeChange("monthly");
            Tea.event("crawl_api_custom", {
              name: "点击Monthly",
            });
          }}
        >
          Monthly
        </button>
      </div>

      {/* 只有在非overall模式下才显示日期选择器 */}
      {timePeriodType !== "overall" && (
        <div className="dropdown-container" ref={dropdownRef}>
          <button
            className={`dropdown-button ${
              isDropdownOpen ? "dropdown-button--open" : ""
            }`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{getSelectedOption()}</span>
            <div className="arrow-container">
              <svg
                className={`arrow-icon ${
                  isDropdownOpen ? "arrow-icon--open" : ""
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </button>

          {/* Weekly模式：树形选择器 */}
          {timePeriodType === "weekly" && isDropdownOpen && (
            <div className="dropdown-menu">
              {monthOptions.map((monthOption, monthIndex) => {
                const isExpanded = expandedMonths.has(monthOption.value);
                return (
                  <div key={monthOption.value}>
                    {/* 月份选项 */}
                    <div
                      className="month-option"
                      style={{
                        borderBottom:
                          monthIndex === monthOptions.length - 1 && !isExpanded
                            ? "none"
                            : undefined,
                      }}
                      onClick={() => handleMonthToggle(monthOption.value)}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <svg
                          className={`expand-icon ${
                            isExpanded ? "expand-icon--expanded" : ""
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                        </svg>
                        <span style={{ marginLeft: "0.5rem" }}>
                          {monthOption.label}
                        </span>
                      </div>
                    </div>

                    {/* 周选项 */}
                    {isExpanded &&
                      monthOption.weeks?.map((weekOption, weekIndex) => (
                        <div
                          key={weekOption.value}
                          className={`week-option ${
                            weekOption.value === selectedTime
                              ? "week-option--selected"
                              : ""
                          }`}
                          style={{
                            borderBottom:
                              weekIndex ===
                                (monthOption.weeks?.length || 0) - 1 &&
                              monthIndex === monthOptions.length - 1
                                ? "none"
                                : undefined,
                          }}
                          onClick={() => handleWeekSelect(weekOption.value)}
                        >
                          {weekOption.label}
                        </div>
                      ))}
                  </div>
                );
              })}
            </div>
          )}

          {/* Monthly模式：普通选择器 */}
          {timePeriodType === "monthly" && isDropdownOpen && (
            <div className="dropdown-menu">
              {timeOptions.map((option, index) => (
                <div
                  key={option.value}
                  className={`option ${
                    option.value === selectedTime ? "option--selected" : ""
                  }`}
                  style={{
                    borderBottom:
                      index === timeOptions.length - 1 ? "none" : undefined,
                  }}
                  onClick={() => handleTimeSelect(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
