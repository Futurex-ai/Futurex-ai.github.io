/**
 * 应用主入口组件
 * 管理分类tab和子tab的状态，根据当前激活的分类和tab渲染相应内容
 */
import React, { useState } from "react";
import Tea from "byted-tea-sdk";
import Doc from "./components/Doc";
import { TopBanner, CategoryType } from "./components/TopBanner";
import { Banner } from "./components/Banner";
import { LeaderboardDescription } from "./components/LeaderboardDescription";
import { MarkdownView } from "./components/MarkdownView";
import { LeaderboardView } from "./components/LeaderboardView";
import { FinanceOverview } from "./components/FinanceOverview";
import { TimePeriodType } from "./types";

const App: React.FC = () => {
  // 分类状态管理
  const [activeCategory, setActiveCategory] = useState<CategoryType>("general");

  // General分类下的子tab状态管理
  const [activeTab, setActiveTab] = useState<"overview" | "leaderboard">(
    "overview"
  );
  const [timePeriodType, setTimePeriodType] =
    useState<TimePeriodType>("overall");
  const [selectedTime, setSelectedTime] = useState<string>("overall");

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

  // 当切换分类时，重置子tab状态
  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
    if (category === "finance") {
      setActiveTab("overview"); // Finance分类暂时只有overview
    }
  };

  const renderContent = () => {
    if (activeCategory === "finance") {
      // Finance分类：显示空页面
      return (
        <main
          style={{ minHeight: "calc(100vh - 240px)", background: "#ffffff" }}
        >
          <FinanceOverview />
        </main>
      );
    }

    // General分类：显示原有的Banner和内容
    return (
      <>
        <Banner activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "leaderboard" && <LeaderboardDescription />}
        <main
          style={{ minHeight: "calc(100vh - 240px)", background: "#ffffff" }}
        >
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
      {/* 顶部分类Banner */}
      <TopBanner
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* 根据选择的分类渲染不同内容 */}
      {renderContent()}
    </div>
  );
};

export default App;
