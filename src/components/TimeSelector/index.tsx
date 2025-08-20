/**
 * 时间选择器组件
 * 提供overall、周级和月级时间选择功能，weekly模式支持树形选择
 */
import React, { useState, useRef, useEffect } from "react";
import Tea from "byted-tea-sdk";

import { TimePeriodType } from "../../types";
import { useTimeSelectorLogic } from "./timeSelectorLogic";

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
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0"); // 获取当前月份 (0-11，所以加1)
    const currentWeek = Math.ceil(currentDate.getDate() / 7) - 1;

    onTimePeriodTypeChange(type);

    // 根据不同类型设置默认时间
    if (type === "overall") {
      onSelectedTimeChange("overall"); // overall模式使用固定值
    } else if (type === "weekly") {
      onSelectedTimeChange(`2025-${currentMonth}-W${currentWeek}`); // 默认选择当前周（八月第一周）
      // 自动展开8月
      setExpandedMonths(new Set([`2025-${currentMonth}`]));
    } else {
      onSelectedTimeChange(`2025-${currentMonth}`); // 月度模式选择当前月
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

  // 样式定义
  const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    marginBottom: "1.6rem",
    flexWrap: "wrap",
  };

  const periodSelectorStyle: React.CSSProperties = {
    display: "flex",
    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    borderRadius: "12px",
    padding: "6px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  };

  const getPeriodButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: "0.625rem 1.5rem",
    border: "none",
    background: isActive
      ? "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)"
      : "transparent",
    color: isActive ? "#111827" : "#6b7280",
    fontSize: "0.875rem",
    fontWeight: isActive ? "600" : "500",
    cursor: "pointer",
    borderRadius: "6px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: isActive ? "0 2px 8px rgba(0, 0, 0, 0.08)" : "none",
    letterSpacing: "0.0125em",
    lineHeight: 1.4,
  });

  const dropdownContainerStyle: React.CSSProperties = {
    position: "relative",
    minWidth: "320px",
  };

  const dropdownButtonStyle: React.CSSProperties = {
    width: "100%",
    padding: "1rem 1.5rem",
    paddingRight: "3rem",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
    color: "#374151",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    letterSpacing: "0.0125em",
    lineHeight: 1.4,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  };

  const dropdownButtonFocusStyle: React.CSSProperties = {
    borderColor: "#9ca3af",
    outline: "none",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  };

  const arrowContainerStyle: React.CSSProperties = {
    position: "absolute",
    right: "1.25rem",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  };

  const arrowStyle: React.CSSProperties = {
    width: "18px",
    height: "18px",
    fill: "#9ca3af",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
  };

  const dropdownMenuStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: "8px",
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
    zIndex: 1000,
    maxHeight: "320px",
    overflowY: "auto",
    overflowX: "hidden",
    animation: isDropdownOpen
      ? "slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      : "none",
  };

  const monthOptionStyle: React.CSSProperties = {
    padding: "1rem 1.25rem",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
    borderBottom: "1px solid #f3f4f6",
    letterSpacing: "0.0125em",
    lineHeight: 1.4,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "linear-gradient(135deg, #fafafa 0%, #ffffff 100%)",
  };

  const weekOptionStyle: React.CSSProperties = {
    padding: "0.75rem 1.25rem 0.75rem 3rem",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    fontSize: "0.8125rem",
    fontWeight: "400",
    color: "#6b7280",
    borderBottom: "1px solid #f9fafb",
    letterSpacing: "0.0125em",
    lineHeight: 1.4,
    background: "#fafafa",
    position: "relative",
  };

  const optionStyle: React.CSSProperties = {
    padding: "1rem 1.25rem",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    fontSize: "0.875rem",
    fontWeight: "400",
    color: "#374151",
    borderBottom: "1px solid #f3f4f6",
    letterSpacing: "0.0125em",
    lineHeight: 1.4,
  };

  const selectedOptionStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
    color: "#1e40af",
    fontWeight: "600",
    borderLeft: "3px solid #3b82f6",
  };

  const expandIconStyle = (isExpanded: boolean): React.CSSProperties => ({
    width: "16px",
    height: "16px",
    fill: "#9ca3af",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
  });

  return (
    <>
      {/* 添加CSS动画样式 */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .week-option-enter {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .week-option-enter-active {
          max-height: 200px;
          opacity: 1;
        }
      `}</style>

      <div style={containerStyle}>
        <div style={periodSelectorStyle}>
          <button
            style={getPeriodButtonStyle(timePeriodType === "overall")}
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
            style={getPeriodButtonStyle(timePeriodType === "weekly")}
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
            style={getPeriodButtonStyle(timePeriodType === "monthly")}
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
          <div style={dropdownContainerStyle} ref={dropdownRef}>
            <button
              style={
                isDropdownOpen
                  ? { ...dropdownButtonStyle, ...dropdownButtonFocusStyle }
                  : dropdownButtonStyle
              }
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{getSelectedOption()}</span>
              <div style={arrowContainerStyle}>
                <svg style={arrowStyle} viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </button>

            {/* Weekly模式：树形选择器 */}
            {timePeriodType === "weekly" && isDropdownOpen && (
              <div style={dropdownMenuStyle}>
                {monthOptions.map((monthOption, monthIndex) => {
                  const isExpanded = expandedMonths.has(monthOption.value);
                  return (
                    <div key={monthOption.value}>
                      {/* 月份选项 */}
                      <div
                        style={{
                          ...monthOptionStyle,
                          borderBottom:
                            monthIndex === monthOptions.length - 1 &&
                            !isExpanded
                              ? "none"
                              : "1px solid #f3f4f6",
                        }}
                        onClick={() => handleMonthToggle(monthOption.value)}
                        onMouseEnter={(e) => {
                          Object.assign(e.currentTarget.style, {
                            background:
                              "linear-gradient(135deg, #f3f4f6 0%, #f8fafc 100%)",
                          });
                        }}
                        onMouseLeave={(e) => {
                          Object.assign(e.currentTarget.style, {
                            background:
                              "linear-gradient(135deg, #fafafa 0%, #ffffff 100%)",
                          });
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <svg
                            style={expandIconStyle(isExpanded)}
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
                            style={{
                              ...weekOptionStyle,
                              ...(weekOption.value === selectedTime
                                ? selectedOptionStyle
                                : {}),
                              borderBottom:
                                weekIndex ===
                                  (monthOption.weeks?.length || 0) - 1 &&
                                monthIndex === monthOptions.length - 1
                                  ? "none"
                                  : "1px solid #f9fafb",
                            }}
                            onClick={() => handleWeekSelect(weekOption.value)}
                            onMouseEnter={(e) => {
                              if (weekOption.value !== selectedTime) {
                                Object.assign(e.currentTarget.style, {
                                  background:
                                    "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                                  color: "#374151",
                                });
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (weekOption.value !== selectedTime) {
                                Object.assign(e.currentTarget.style, {
                                  background: "#fafafa",
                                  color: "#6b7280",
                                });
                              }
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                left: "2rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: "4px",
                                height: "4px",
                                borderRadius: "50%",
                                background: "#d1d5db",
                              }}
                            />
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
              <div style={dropdownMenuStyle}>
                {timeOptions.map((option, index) => (
                  <div
                    key={option.value}
                    style={{
                      ...optionStyle,
                      ...(option.value === selectedTime
                        ? selectedOptionStyle
                        : {}),
                      borderBottom:
                        index === timeOptions.length - 1
                          ? "none"
                          : "1px solid #f3f4f6",
                    }}
                    onClick={() => handleTimeSelect(option.value)}
                    onMouseEnter={(e) => {
                      if (option.value !== selectedTime) {
                        Object.assign(e.currentTarget.style, {
                          background:
                            "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                          color: "#111827",
                        });
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (option.value !== selectedTime) {
                        Object.assign(e.currentTarget.style, {
                          background: "transparent",
                          color: "#374151",
                        });
                      }
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
