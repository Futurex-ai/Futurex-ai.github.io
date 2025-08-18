/**
 * BrandWordmark.tsx
 * Space Grotesk + Inter；优化“FutureX”字标（X 渐变&可选高光）
 */
import React from "react";

type SizeKey = "xs" | "sm" | "md" | "lg" | "xl";
interface BrandWordmarkProps {
  tag?: keyof JSX.IntrinsicElements;
  size?: SizeKey;
  shimmer?: boolean;
  style?: React.CSSProperties;
}

const SIZE_MAP: Record<SizeKey, { fontSize: string; letterSpacing: string }> = {
  xs: { fontSize: "1rem", letterSpacing: "-0.01em" },
  sm: { fontSize: "1.25rem", letterSpacing: "-0.015em" },
  md: { fontSize: "1.6rem", letterSpacing: "-0.02em" },
  lg: { fontSize: "2rem", letterSpacing: "-0.025em" },
  xl: { fontSize: "2.6rem", letterSpacing: "-0.03em" },
};

const useBrandFonts = () => {
  React.useEffect(() => {
    const addLinkOnce = (attrs: Partial<HTMLLinkElement>, id: string) => {
      if (document.getElementById(id)) return;
      const link = document.createElement("link");
      Object.assign(link, attrs);
      link.id = id;
      document.head.appendChild(link);
    };
    addLinkOnce({ rel: "preconnect", href: "https://fonts.googleapis.com" }, "brand-preconnect-gapis");
    addLinkOnce({ rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" as any }, "brand-preconnect-gstatic");
    addLinkOnce({
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
    }, "brand-fonts-stylesheet");
  }, []);
};

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({
  tag = "div",
  size = "lg",
  shimmer = false,
  style,
}) => {
  useBrandFonts();
  const Tag = tag as any;
  const sizing = SIZE_MAP[size];

  const base: React.CSSProperties = {
    margin: 0,
    padding: 0,
    fontFamily: `"Space Grotesk", Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`,
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: sizing.letterSpacing,
    fontSize: sizing.fontSize,
    display: "inline-flex",
    alignItems: "baseline",
    textRendering: "optimizeLegibility",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    color: "#0f172a",
    ...style,
  };

  const xWrap: React.CSSProperties = {
    display: "inline-block",
    transform: "translateY(-1px) scale(1.06)",
    marginLeft: "0.06em",
    position: "relative",
    lineHeight: 1,
  };

  const xGradient: React.CSSProperties = {
    background: "linear-gradient(135deg, #111827 0%, #6d28d9 35%, #0ea5e9 70%, #06b6d4 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };

  const sheen: React.CSSProperties = shimmer ? {
    position: "absolute", inset: 0,
    background: "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.8) 15%, transparent 30%)",
    transform: "translateX(-120%)",
    animation: "brand-sheen 3.8s ease-in-out infinite",
    pointerEvents: "none",
  } : {};

  return (
    <Tag style={base} aria-label="FutureX">
      <span>Future</span>
      <span style={xWrap} aria-hidden="true">
        <span style={xGradient}>X</span>
        {shimmer && <i style={sheen as any} />}
      </span>
      {shimmer && (
        <style dangerouslySetInnerHTML={{ __html: `
@keyframes brand-sheen {
  0% { transform: translateX(-120%); opacity: 0.0; }
  8% { opacity: 0.9; }
  35% { transform: translateX(110%); opacity: 0.0; }
  100% { transform: translateX(110%); opacity: 0.0; }
}` }} />
      )}
    </Tag>
  );
};

export default BrandWordmark;
