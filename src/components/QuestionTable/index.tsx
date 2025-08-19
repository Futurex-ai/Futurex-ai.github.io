/**
 * 题目表格组件
 * 展示预测挑战的题目信息，包括难度级别、问题描述和选项
 * 使用独立的LevelSelector组件进行难度等级筛选
 */
import React, { useState } from "react";
import { useQuestionData } from "./questionData";
import { LevelSelector, LevelType } from "./components/LevelSelector";
import "./index.css";

export const QuestionTable: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<LevelType>("level1");
  const { getQuestionData } = useQuestionData();
  const allQuestions = getQuestionData();

  // 根据选中的level筛选题目
  const getFilteredQuestions = () => {
    const levelMap = {
      level1: "Level 1",
      level2: "Level 2",
      level3: "Level 3",
      level4: "Level 4",
    };

    return allQuestions.filter(
      (question) => question.level === levelMap[selectedLevel]
    );
  };

  const questions = getFilteredQuestions();

  // 获取难度等级的CSS类名
  const getLevelClass = (level: string) => {
    const levelNumber = level.replace("Level ", "");
    return `question-table__level question-table__level--${levelNumber}`;
  };

  const handleLevelChange = (level: LevelType) => {
    setSelectedLevel(level);
  };

  const getLevelDisplayName = (level: LevelType) => {
    const nameMap = {
      level1: "Level 1",
      level2: "Level 2",
      level3: "Level 3",
      level4: "Level 4",
    };
    return nameMap[level];
  };

  return (
    <div className="question-table">
      <h2 className="question-table__title">Partial Questions 📋</h2>

      {/* 使用独立的Level选择器组件 */}
      <LevelSelector
        selectedLevel={selectedLevel}
        onLevelChange={handleLevelChange}
      />

      <div className="question-table__container">
        {/* ... 保留表格相关的代码 ... */}
        <div className="question-table__table-container">
          <div className="question-table__scroll-wrapper">
            <div className="question-table__table">
              {/* 固定表头 */}
              <div className="question-table__sticky-header">
                <div className="question-table__header">
                  <div className="question-table__header-cell question-table__header-cell--sticky question-table__header-cell--level">
                    LEVEL
                  </div>
                  <div className="question-table__header-cell question-table__header-cell--sticky question-table__header-cell--question">
                    QUESTION
                  </div>
                  <div className="question-table__header-cell question-table__header-cell--sticky question-table__header-cell--options">
                    OPTIONS
                  </div>
                </div>
              </div>

              {/* 数据行 */}
              {questions.length > 0 ? (
                questions.map((question, index) => (
                  <div key={index} className="question-table__row">
                    <div className="question-table__cell question-table__cell--level">
                      <span className={getLevelClass(question.level)}>
                        {question.level}
                      </span>
                    </div>

                    <div className="question-table__cell question-table__cell--question">
                      <div className="question-table__question">
                        {question.question}
                      </div>
                    </div>

                    <div className="question-table__cell question-table__cell--options">
                      {question.options && question.options.length > 0 ? (
                        <div className="question-table__options-tags">
                          {question.options.map((option, optionIndex) => (
                            <span
                              key={optionIndex}
                              className="question-table__option-tag"
                            >
                              {option}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="question-table__no-options">
                          Open-ended question
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="question-table__empty-state">
                  <div
                    style={{
                      padding: "3rem 2rem",
                      textAlign: "center",
                      color: "#6b7280",
                      fontSize: "0.875rem",
                    }}
                  >
                    No questions found for {getLevelDisplayName(selectedLevel)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
