/**
 * 榜单视图组件
 * 组合时间选择器和榜单组件，负责整个榜单页面的布局
 */
import React from "react";
import { TimePeriodType } from "../../types";
import { TimeSelector } from "../TimeSelector";
import { Leaderboard } from "../Leaderboard";
import { QuestionTable } from "../QuestionTable";
import { ContactSection } from "../ContactSection";
import "./index.css";

interface LeaderboardViewProps {
  timePeriodType: TimePeriodType;
  selectedTime: string;
  onTimePeriodTypeChange: (type: TimePeriodType) => void;
  onSelectedTimeChange: (time: string) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  timePeriodType,
  selectedTime,
  onTimePeriodTypeChange,
  onSelectedTimeChange,
}) => {
  const containerStyle: React.CSSProperties = {
    minHeight: "calc(100vh - 200px)",
    background: "#fafafa",
    padding: "2rem 0",
  };

  const controlsStyle: React.CSSProperties = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 2rem",
  };

  return (
    <div style={containerStyle}>
      <div style={controlsStyle}>
        {/* Leaderboard标题 - 与Challenge Questions样式保持一致 */}
        <h2 className="leaderboard-view__title">Leaderboard 🏆</h2>

        <TimeSelector
          timePeriodType={timePeriodType}
          selectedTime={selectedTime}
          onTimePeriodTypeChange={onTimePeriodTypeChange}
          onSelectedTimeChange={onSelectedTimeChange}
        />
      </div>
      <Leaderboard
        timePeriodType={timePeriodType}
        selectedTime={selectedTime}
      />

      <div style={controlsStyle}>
        {/* <h2 className="leaderboard-view__title">Next Update</h2> */}
        <ul className="newupdate">
          <li>
            <strong>GPT-5 and GPT Deep Research results</strong> will be
            included in the next update—stay tuned!
          </li>
          <li>
            <strong>New web-search & deep research agents</strong> are coming
            soon!
          </li>
        </ul>
      </div>
      <QuestionTable />
      <ContactSection />
    </div>
  );
};
