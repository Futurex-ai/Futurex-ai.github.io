/**
 * 应用主入口组件
 * 现在由 Banner 控制三个标签页：Overview / Leaderboard / S&P 500 Sector
 */
import React, { useState } from "react";
import Tea from "byted-tea-sdk";
import { Banner, type BannerTab } from "./components/Banner";
import { LeaderboardDescription } from "./components/LeaderboardDescription";
import { MarkdownView } from "./components/MarkdownView";
import { LeaderboardView } from "./components/LeaderboardView";
import { FinanceOverview } from "./components/FinanceOverview"; // ← 用作 S&P 500 页签内容
import { TimePeriodType } from "./types";

Tea.init({
  app_id: 635684,
  channel: "cn",
  // log: true,
});
Tea.start();

const App: React.FC = () => {
  // Banner 的三标签：overview / leaderboard / sp500
  // const [activeTab, setActiveTab] = useState<BannerTab>("overview");
  const [activeTab, setActiveTab] = useState<BannerTab>("leaderboard");
  
  // Leaderboard 的时间筛选状态（保持不变）
  const [timePeriodType, setTimePeriodType] =
    useState<TimePeriodType>("overall");
  const [selectedTime, setSelectedTime] = useState<string>("overall");

  Tea.event("crawl_api_custom", { name: "进入页面" });
  Tea.event("predefine_pageview", { url: window.location.href });

  const renderContent = () => {
    React.useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      history.replaceState(null, null, location.pathname + location.search);
    }, [activeTab]);

    return (
      <>
        <Banner activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Leaderboard 页面顶部说明（只在该页显示） */}
        {activeTab === "leaderboard" && <LeaderboardDescription />}

        <main
          key={activeTab}
          style={{ minHeight: "calc(100vh - 240px)", background: "#ffffff" }}
        >
          {activeTab === "overview" && <MarkdownView />}

          {activeTab === "leaderboard" && (
            <LeaderboardView
              timePeriodType={timePeriodType}
              selectedTime={selectedTime}
              onTimePeriodTypeChange={setTimePeriodType}
              onSelectedTimeChange={setSelectedTime}
            />
          )}

          {activeTab === "sp500" && (
            // 如果你这里本来是“Markdown 渲染”的 S&P 500 页面，
            // 把 <FinanceOverview /> 替换为你的 Markdown 组件即可：
            // <SP500MarkdownView /> 或 <MarkdownView file="sp500.md" /> 等
            <FinanceOverview />
          )}
        </main>
      </>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        lineHeight: 1.5,
        background: "#fafafa",
      }}
    >
      {/* 顶部 TopBanner 已移除，由 Banner 控制所有标签 */}
      {renderContent()}
    </div>
  );
};

export default App;
