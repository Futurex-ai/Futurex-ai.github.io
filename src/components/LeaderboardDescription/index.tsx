/**
 * LeaderboardDescription (compact)
 * - Smaller centered "Live LeaderBoard" title
 * - Smaller link cards with icons
 * - Optional: inject compact styles for your leaderboard grid/table to show MORE cells
 *
 * Requires: npm i react-icons
 * Optional bottom anchor: <section id="submission">...</section>
 *
 * Tip for showing MORE cells in your leaderboard area:
 *   Give your leaderboard container either id="leaderboard-grid" (for grid)
 *   or id="leaderboard-table" (for table). This component injects compact CSS
 *   to increase density automatically.
 */

import React from "react";
import { FiFileText, FiUpload } from "react-icons/fi";
import { SiHuggingface } from "react-icons/si";

export const LeaderboardDescription: React.FC = () => {
  // Inject compact CSS to make your leaderboard section denser (more cells)
  React.useEffect(() => {
    const id = "lb-compact-css";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
/* ===== Compact density for your leaderboard ===== */

/* If your leaderboard is a CSS grid of tiles/cards */
#leaderboard-grid, .leaderboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); /* smaller min width -> MORE cells per row */
  gap: 8px;                                                    /* tighter gaps */
}

/* If your leaderboard is a <table> (any framework) */
#leaderboard-table, .leaderboard-table { font-size: 0.92rem; } /* slightly smaller text */
#leaderboard-table th, #leaderboard-table td,
.leaderboard-table th, .leaderboard-table td {
  padding: 6px 10px; /* denser cells */
  line-height: 1.2;
}
/* Optional: keep header readable */
#leaderboard-table thead th, .leaderboard-table thead th {
  font-weight: 600;
}

/* Small screens: keep it usable */
@media (max-width: 480px) {
  #leaderboard-grid, .leaderboard-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 6px;
  }
  #leaderboard-table, .leaderboard-table { font-size: 0.9rem; }
  #leaderboard-table th, #leaderboard-table td,
  .leaderboard-table th, .leaderboard-table td { padding: 5px 8px; }
}
`;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  // ===== Styles (compact) =====
  const containerStyle: React.CSSProperties = {
    background: "#fafafa",
    padding: "1.8rem 0 1.6rem 0", // smaller
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1.5rem", // slightly smaller
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "2rem", // was 2.6rem
    fontWeight: 800,
    lineHeight: 1.15,
    color: "#111827",
    letterSpacing: "0.01em",
    margin: 0,
  };

  const subStyle: React.CSSProperties = {
    fontSize: "0.82rem", // was 0.95rem
    color: "#6B7280",
    marginTop: "0.5rem",
    marginBottom: "1rem",
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", // was 240px -> more cards per row if you add more
    gap: "0.6rem", // was 0.9rem
    width: "100%",
    maxWidth: "900px",
  };

  const cardBase: React.CSSProperties = {
    display: "block",
    padding: "0.85rem 0.95rem", // was 1rem 1.1rem
    borderRadius: "0.75rem", // was 0.9rem
    border: "1px solid #E5E7EB",
    background: "#ffffff",
    textDecoration: "none",
    color: "#1F2937",
    fontWeight: 550, // slightly lighter
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    transition:
      "transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease",
    cursor: "pointer",
    userSelect: "none",
  };

  const cardHover: React.CSSProperties = {
    transform: "translateY(-1px)", // was -2px
    boxShadow: "0 4px 14px rgba(0,0,0,0.07)",
    borderColor: "#D1D5DB",
  };

  const rowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.6rem", // was 0.7rem
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "0.95rem", // was 1rem
    lineHeight: 1.2,
    margin: 0,
    padding: 0,
  };

  const smallNote: React.CSSProperties = {
    display: "block",
    fontSize: "0.75rem", // was 0.8rem
    fontWeight: 500,
    color: "#6B7280",
    marginTop: "0.2rem",
  };

  const iconWrapBase: React.CSSProperties = {
    width: 34, // was 38
    height: 34,
    borderRadius: "0.6rem", // was 0.7rem
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 auto",
    border: "1px solid transparent",
  };

  const iconWrapReport: React.CSSProperties = {
    ...iconWrapBase,
    background: "#EFF6FF",
    borderColor: "#DBEAFE",
    color: "#2563EB",
  };

  const iconWrapHF: React.CSSProperties = {
    ...iconWrapBase,
    background: "#FFF7ED",
    borderColor: "#FED7AA",
    color: "#FB923C",
  };

  const iconWrapSubmit: React.CSSProperties = {
    ...iconWrapBase,
    background: "#ECFDF5",
    borderColor: "#A7F3D0",
    color: "#10B981",
  };

  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);

  const submissionAnchorId = "submission";

  const handleSubmissionClick: React.MouseEventHandler<HTMLAnchorElement> = (
    e
  ) => {
    e.preventDefault();
    const target = document.getElementById(submissionAnchorId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${submissionAnchorId}`);
      }
      return;
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      window.history.replaceState(null, "", `#${submissionAnchorId}`);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h2 style={headingStyle}>Live LeaderBoard</h2>
        <p style={subStyle}>Real-time · Contamination-free · 23 models</p>

        <div style={gridStyle}>
          {/* Technical Report */}
          <a
            href="https://YOUR_REPORT_LINK" // TODO: replace with your technical report (e.g., arXiv)
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Technical Report"
            style={{ ...cardBase, ...(hoverIndex === 0 ? cardHover : {}) }}
            onMouseEnter={() => setHoverIndex(0)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div style={rowStyle}>
              <span style={iconWrapReport} aria-hidden="true">
                <FiFileText size={18} /> {/* was 20 */}
              </span>
              <span>
                <div style={titleStyle}>Technical Report</div>
                <span style={smallNote}>Methods &amp; metrics</span>
              </span>
            </div>
          </a>

          {/* Hugging Face */}
          <a
            href="https://huggingface.co/futurex-ai" // TODO: replace with your Hugging Face page
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Hugging Face"
            style={{ ...cardBase, ...(hoverIndex === 1 ? cardHover : {}) }}
            onMouseEnter={() => setHoverIndex(1)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div style={rowStyle}>
              <span style={iconWrapHF} aria-hidden="true">
                <SiHuggingface size={18} /> {/* was 20 */}
              </span>
              <span>
                <div style={titleStyle}>Hugging Face</div>
                <span style={smallNote}>Data · Evaluation entry</span>
              </span>
            </div>
          </a>

          {/* Submission → bottom of the page or #submission */}
          <a
            href={`#${submissionAnchorId}`}
            aria-label="Go to submission section"
            onClick={handleSubmissionClick}
            style={{ ...cardBase, ...(hoverIndex === 2 ? cardHover : {}) }}
            onMouseEnter={() => setHoverIndex(2)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div style={rowStyle}>
              <span style={iconWrapSubmit} aria-hidden="true">
                <FiUpload size={18} /> {/* was 20 */}
              </span>
              <span>
                <div style={titleStyle}>Submission</div>
                <span style={smallNote}>Submit your model</span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
