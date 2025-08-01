/**
 * 应用主入口组件
 * 使用 useState 管理应用状态，根据当前激活的 tab 渲染相应内容
 */
import React, { useState } from "react";
import Tea from "byted-tea-sdk";
import { Banner } from "./components/Banner";
import { LeaderboardDescription } from "./components/LeaderboardDescription";
import { MarkdownView } from "./components/MarkdownView";
import { LeaderboardView } from "./components/LeaderboardView";
import { TimePeriodType } from "./types";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "leaderboard">(
    "overview"
  );
  const [timePeriodType, setTimePeriodType] =
    useState<TimePeriodType>("weekly");
  const [selectedTime, setSelectedTime] = useState<string>("2025-06-W1");

  Tea.init({
    app_id: 635684, 
    channel: "cn", 
    // log: true, // 开启后会控制台会打印日志
  });

  Tea.start();
  Tea.event("crawl_api_custom", {
    name: "进入页面",
  });
  Tea.event("predefine_pageview", {
    url: window.location.href,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        lineHeight: 1.5,
      }}
    >
      <Banner activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "leaderboard" && <LeaderboardDescription />}
      <main style={{ minHeight: "calc(100vh - 180px)", background: "#ffffff" }}>
        {activeTab === "overview" ? (
          <MarkdownView />
        ) : (
          <LeaderboardView
            timePeriodType={timePeriodType}
            selectedTime={selectedTime}
            onTimePeriodTypeChange={setTimePeriodType}
            onSelectedTimeChange={setSelectedTime}
          />
        )}
      </main>
    </div>
  );
};

export default App;
