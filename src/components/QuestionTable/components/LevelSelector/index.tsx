/**
 * Level选择器组件
 * 提供Level 1-4的难度等级选择功能，UI风格与TimeSelector保持一致
 * 支持受控模式，通过props接收当前选中值和变更回调
 */
import React from "react";
import "./index.css";

export type LevelType = "level1" | "level2" | "level3" | "level4";

interface LevelSelectorProps {
  selectedLevel: LevelType;
  onLevelChange: (level: LevelType) => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  selectedLevel,
  onLevelChange,
}) => {
  const handleLevelChange = (level: LevelType) => {
    onLevelChange(level);
  };

  const getButtonClassName = (level: LevelType) => {
    const baseClassName = "level-selector__button";
    const activeClassName = "level-selector__button--active";

    return selectedLevel === level
      ? `${baseClassName} ${activeClassName}`
      : baseClassName;
  };

  return (
    <div className="level-selector">
      <button
        className={getButtonClassName("level1")}
        onClick={() => handleLevelChange("level1")}
      >
        Level 1
      </button>
      <button
        className={getButtonClassName("level2")}
        onClick={() => handleLevelChange("level2")}
      >
        Level 2
      </button>
      <button
        className={getButtonClassName("level3")}
        onClick={() => handleLevelChange("level3")}
      >
        Level 3
      </button>
      <button
        className={getButtonClassName("level4")}
        onClick={() => handleLevelChange("level4")}
      >
        Level 4
      </button>
    </div>
  );
};
