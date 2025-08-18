/**
 * 题目数据管理模块
 * 提供题目数据的获取和管理功能
 */
import { QuestionData, QuestionEntry } from "../../types";
import data from "../../data/questionData.json";

export const useQuestionData = () => {
  const getQuestionData = (): QuestionEntry[] => {
    return data;
  };

  return { getQuestionData };
};
