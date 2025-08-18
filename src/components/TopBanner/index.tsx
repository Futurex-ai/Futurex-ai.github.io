/**
 * TopBanner (deprecated)
 * This component is no longer used. The category switching has been moved
 * into the main <Banner> as a third tab: "S&P 500 Sector".
 *
 * You can safely delete this file after removing all imports.
 */

import React from "react";

export type CategoryType = "general" | "finance";

interface TopBannerProps {
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

// No-op component to avoid breaking imports while migrating
export const TopBanner: React.FC<TopBannerProps> = () => {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn("[TopBanner] is deprecated. Use <Banner> tabs instead.");
  }
  return null;
};

export default TopBanner;
