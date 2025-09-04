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
import banner from "./ranking_new.jpeg";

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
    background: "rgb(250, 250, 250)",
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
        <h2 className="leaderboard-view__title">This Week's Ranking List 🏆</h2>
        <div style={{ textAlign: "center", margin: "2rem 0" }}>
          <img className="banner-img"
            src={banner}
            alt="Leaderboard Banner"
            style={{ maxWidth: "100%", borderRadius: "12px" }}
          />
        </div>

        <h2 className="leaderboard-view__title">Overall Leaderboard 🏆</h2>

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
