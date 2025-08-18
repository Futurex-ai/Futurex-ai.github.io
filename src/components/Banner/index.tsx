/**
 * Banner.tsx — fixed top bar with underline tabs & auto spacer
 * - Fixed (悬浮) 在顶部：position: fixed; top: 0; left: 0; right: 0
 * - 自动测量高度并在其后渲染 spacer，避免正文被遮挡
 * - 滚动时增加阴影
 * - 指示条依然使用实际元素测量，点击/键盘/resize 都会跟随
 *
 * Requires: npm i react-icons
 */

import React from "react";
import Tea from "byted-tea-sdk";
import { FiCompass, FiAward, FiBarChart2 } from "react-icons/fi";
import { BrandWordmark } from "./BrandWordmark";

export type BannerTab = "overview" | "leaderboard" | "sp500";

interface BannerProps {
  activeTab: BannerTab;
  onTabChange: (tab: BannerTab) => void;
}

export const Banner: React.FC<BannerProps> = ({ activeTab, onTabChange }) => {
  // ===== Refs =====
  const headerRef = React.useRef<HTMLDivElement | null>(null);
  const barRef = React.useRef<HTMLDivElement | null>(null);
  const overviewRef = React.useRef<HTMLButtonElement | null>(null);
  const leaderboardRef = React.useRef<HTMLButtonElement | null>(null);
  const sp500Ref = React.useRef<HTMLButtonElement | null>(null);

  const refFor = (tab: BannerTab) =>
    tab === "overview"
      ? overviewRef.current
      : tab === "leaderboard"
      ? leaderboardRef.current
      : sp500Ref.current;

  // ===== Indicator state =====
  const [indicator, setIndicator] = React.useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  // Imperative move (use real element instead of relying on state timing)
  const moveIndicatorToEl = React.useCallback((el?: HTMLElement | null) => {
    const bar = barRef.current;
    if (!bar || !el) return;
    const barRect = bar.getBoundingClientRect();
    const btnRect = el.getBoundingClientRect();
    setIndicator({ left: btnRect.left - barRect.left, width: btnRect.width });
  }, []);

  // On mount + whenever activeTab changes (safety net)
  React.useLayoutEffect(() => {
    moveIndicatorToEl(refFor(activeTab));
  }, [activeTab, moveIndicatorToEl]);

  // Keep in sync on resize
  React.useEffect(() => {
    const onResize = () => requestAnimationFrame(() => moveIndicatorToEl(refFor(activeTab)));
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [activeTab, moveIndicatorToEl]);

  // Keyboard navigation (cyclical)
  const order: BannerTab[] = ["overview", "leaderboard", "sp500"];
  const onKeyTabs: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const idx = order.indexOf(activeTab);
    const next =
      e.key === "ArrowRight"
        ? order[(idx + 1) % order.length]
        : order[(idx - 1 + order.length) % order.length];
    onTabChange(next);
    requestAnimationFrame(() => {
      const el = refFor(next);
      el?.focus();
      moveIndicatorToEl(el);
    });
  };

  // ===== Fixed header: measure height & add spacer =====
  const [headerH, setHeaderH] = React.useState(0);
  const [elevated, setElevated] = React.useState(false);

  // Measure header height on mount/resize/content change
  React.useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      setHeaderH(rect.height);
    };
    measure();

    // ResizeObserver 更稳
    let ro: ResizeObserver | null = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(() => measure());
      ro.observe(el);
    } else {
      const onResize = () => measure();
      window.addEventListener("resize", onResize, { passive: true });
      return () => window.removeEventListener("resize", onResize);
    }
    return () => {
      ro?.disconnect();
    };
  }, []);

  // Scroll shadow
  React.useEffect(() => {
    const onScroll = () => {
      // 用 rAF 降低抖动
      requestAnimationFrame(() => setElevated(window.scrollY > 2));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ===== Styles =====
  const bg = "#ffffff";
  const text = "#111827";
  const textMuted = "#6b7280";
  const border = "#e5e7eb";

  const headerStyle: React.CSSProperties = {
    position: "fixed",       // ★ 悬浮在顶部
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    background: bg,
    color: text,
    // iOS 安全区 + 原有内边距
    padding: "calc(env(safe-area-inset-top, 0px) + 1.2rem) 0 0.8rem 0",
    overflow: "visible",
    borderBottom: `1px solid ${border}`,
    boxShadow: elevated ? "0 8px 20px rgba(17, 24, 39, 0.06)" : "none",
    transition: "box-shadow 160ms ease",
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1.25rem",
  };

  const titleWrap: React.CSSProperties = { position: "relative", zIndex: 1 };

  const subtitleStyle: React.CSSProperties = {
    margin: "0.35rem 0 0 0",
    fontSize: "0.98rem",
    fontWeight: 500,
    color: textMuted,
    letterSpacing: "0.01em",
    lineHeight: 1.5,
  };

  const tabBar: React.CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    gap: 20,
    borderBottom: `1px solid ${border}`,
    paddingBottom: 6,
  };

  const indicatorStyle: React.CSSProperties = {
    position: "absolute",
    left: indicator.left,
    bottom: -1,
    width: indicator.width,
    height: 2,
    background: "#111827",
    borderRadius: 2,
    transition: "left 180ms ease, width 180ms ease",
    pointerEvents: "none",
  };

  const btnBase: React.CSSProperties = {
    appearance: "none",
    border: "none",
    background: "transparent",
    padding: "0.25rem",
    margin: 0,
    cursor: "pointer",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    fontSize: "0.9rem",
    fontWeight: 700,
    color: textMuted,
    letterSpacing: "0.01em",
    lineHeight: 1,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    transition: "color 120ms ease, transform 120ms ease",
  };

  const getBtnStyle = (active: boolean, hovered: boolean): React.CSSProperties => ({
    ...btnBase,
    color: active ? text : hovered ? "#374151" : textMuted,
    transform: active ? "translateY(-0.5px)" : "none",
  });

  const iconStyle: React.CSSProperties = { fontSize: 16, opacity: 0.9 };
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);

  // Helpers
  const clickTab = (tab: BannerTab, eventName: string, el?: HTMLButtonElement) => {
    onTabChange(tab);
    Tea.event("crawl_api_custom", { name: eventName });
    moveIndicatorToEl(el ?? refFor(tab));
  };

  return (
    <>
      {/* Fixed Header */}
      <div ref={headerRef} style={headerStyle}>
        <div style={contentStyle}>
          {/* Left: Wordmark + subtitle */}
          <div style={titleWrap}>
            <BrandWordmark tag="h1" size="lg" shimmer={false} />
            <p style={subtitleStyle}>
              Can AI predict the future? The next frontier for LLM Agents!
            </p>
          </div>

          {/* Right: Tabs */}
          <div
            ref={barRef}
            role="tablist"
            aria-label="Page section"
            onKeyDown={onKeyTabs}
            style={tabBar}
          >
            <span style={indicatorStyle} aria-hidden="true" />

            <button
              ref={overviewRef}
              role="tab"
              aria-selected={activeTab === "overview"}
              aria-controls="panel-overview"
              tabIndex={activeTab === "overview" ? 0 : -1}
              style={getBtnStyle(activeTab === "overview", hoverIndex === 0)}
              onMouseEnter={() => setHoverIndex(0)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={(e) => clickTab("overview", "点击Overview", e.currentTarget)}
            >
              <FiCompass style={iconStyle} />
              Project Overview
            </button>

            <button
              ref={leaderboardRef}
              role="tab"
              aria-selected={activeTab === "leaderboard"}
              aria-controls="panel-leaderboard"
              tabIndex={activeTab === "leaderboard" ? 0 : -1}
              style={getBtnStyle(activeTab === "leaderboard", hoverIndex === 1)}
              onMouseEnter={() => setHoverIndex(1)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={(e) => clickTab("leaderboard", "点击Leaderboard", e.currentTarget)}
            >
              <FiAward style={iconStyle} />
              Overall Leaderboard
            </button>

            <button
              ref={sp500Ref}
              role="tab"
              aria-selected={activeTab === "sp500"}
              aria-controls="panel-sp500"
              tabIndex={activeTab === "sp500" ? 0 : -1}
              style={getBtnStyle(activeTab === "sp500", hoverIndex === 2)}
              onMouseEnter={() => setHoverIndex(2)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={(e) => clickTab("sp500", "点击SP500", e.currentTarget)}
            >
              <FiBarChart2 style={iconStyle} />
              S&amp;P 500 Sector Board
            </button>
          </div>
        </div>
      </div>

      {/* Spacer: push content below the fixed header */}
      <div aria-hidden style={{ height: headerH }} />

    </>
  );
};

export default Banner;
