// src/components/MarkdownView.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "github-markdown-css";
// ★ 关键：这个文件在 src/components 下，样式文件在 src/components/MarkdownView/index.less
import "./index.less";

import defaultMarkdownContent from "../../data/newFinancePage/financeContent.md";

// 打包进来的图片映射（确保 key 与 md/HTML 里写的相对路径一致）
import image1 from "../../data/newFinancePage/mape1.png";
import image2 from "../../data/newFinancePage/mape2.png";
import image3 from "../../data/newFinancePage/tier1.png";
import image4 from "../../data/newFinancePage/tier2.png";
import image5 from "../../data/newFinancePage/win-rate1.png";
import image6 from "../../data/newFinancePage/win-rate2.png";

const imageMap: Record<string, string> = {
  "./mape1.png": image1,
  "./mape2.png": image2,
  "./tier1.png": image3,
  "./tier2.png": image4,
  "./win-rate1.png": image5,
  "./win-rate2.png": image6,
};

// ========== 工具函数（与 index.tsx 保持一致） ==========

// 清洗 heading 里的“内联 Markdown 标记”，只保留可读文本
const cleanHeadingText = (raw: string) => {
  let t = raw;
  t = t.replace(/<[^>]+>/g, ""); // 去 HTML 标签
  t = t.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1"); // 图片
  t = t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");   // 链接
  t = t.replace(/`{1,3}([^`]+?)`{1,3}/g, "$1");    // 代码块/行内代码
  t = t.replace(/(\*\*|__)(.*?)\1/g, "$2");        // 粗体
  t = t.replace(/(\*|_)(.*?)\1/g, "$2");           // 斜体
  t = t.replace(/[*_]/g, "");                      // 零散符号
  t = t
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
  return t.trim();
};

// slugify（与 heading 渲染一致）
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/[`~!@#$%^&*()+={}\[\]|\\:;"'’“”，。、《》？、,.<>/?]/g, "")
    .replace(/\s+/g, "-");

// 从原始 markdown 抽取 TOC（只抓 h2~h4；避免与 Banner 的 H1 冲突）
type TocItem = { id: string; text: string; depth: 2 | 3 | 4 };
function parseTOC(md: string): TocItem[] {
  const lines = md.split(/\r?\n/);
  const items: TocItem[] = [];
  for (const ln of lines) {
    const m = /^(#{2,4})\s+(.+)$/.exec(ln);
    if (!m) continue;
    const depth = m[1].length as 2 | 3 | 4;
    const rawText = m[2].trim();
    const text = cleanHeadingText(rawText);
    if (!text) continue;
    const id = slugify(text);
    items.push({ id, text, depth });
  }
  return items;
}

// 从 ReactMarkdown 标题 children 提取纯文本
const childrenToText = (children: React.ReactNode): string => {
  const buf: string[] = [];
  const walk = (n: React.ReactNode) => {
    if (typeof n === "string" || typeof n === "number") buf.push(String(n));
    else if (Array.isArray(n)) n.forEach(walk);
    else if (React.isValidElement(n)) walk(n.props.children);
  };
  walk(children);
  return buf.join("").trim();
};

// 仅用于表格：数字检测（右对齐）
const isNumericText = (t: string) => {
  const s = (t || "").trim();
  return /^[-+]?(\d{1,3}(,\d{3})*|\d+)(\.\d+)?%?$/.test(s);
};

// ========== 组件 ==========

export const FinanceOverview: React.FC = () => {
  // 版心
  const containerStyle: React.CSSProperties = {
    maxWidth: "1440px",
    margin: "0 auto",
    padding: "2rem 1.25rem 3rem",
  };

  // TOC
  const [toc, setToc] = React.useState<TocItem[]>([]);
  React.useEffect(() => {
    setToc(parseTOC(defaultMarkdownContent || ""));
  }, []);

  // Lightbox
  const [lightbox, setLightbox] = React.useState<null | { src: string; alt?: string }>(null);

  // ====== 表格样式（与另一页一致，避免双重外框） ======
  const tableWrapStyle: React.CSSProperties = {
    position: "relative",
    margin: "20px 0",
    border: "1px solid #e5e7eb", // 唯一外边线
    borderRadius: 12,
    background: "#ffffff",
    overflowX: "auto",
    overflowY: "visible", // sticky 表头可见
    WebkitOverflowScrolling: "touch",
    boxShadow: "0 1px 0 rgba(17,24,39,0.02)",
  };
  const tableStyle: React.CSSProperties = {
    width: "100%",
    minWidth: 720,
    borderCollapse: "separate",
    borderSpacing: 0,
    fontSize: 14.5,
    lineHeight: 1.6,
    color: "#111827",
    fontVariantNumeric: "tabular-nums",
    border: "none", // 清掉 github-markdown-css 自带 table 外边框，避免叠加
  };
  const thStyle: React.CSSProperties = {
    position: "sticky" as const,
    top: 0,
    background: "#f9fafb",
    border: "none",
    borderBottom: "1px solid #e5e7eb",
    zIndex: 1,
    textAlign: "left" as const,
  };
  const cellDivStyle: React.CSSProperties = {
    padding: "10px 12px",
    whiteSpace: "nowrap" as const,
  };
  const tdBaseStyle: React.CSSProperties = {
    border: "none",
    borderBottom: "1px solid #f3f4f6",
    background: "#fff",
  };

  // zebra + hover 行；把“是否最后一行”传给单元格以去掉底边
  const Tr: React.FC<
    React.HTMLAttributes<HTMLTableRowElement> & { "data-row-odd"?: boolean; "data-last"?: boolean }
  > = ({ children, ...props }) => {
    const [hovered, setHovered] = React.useState(false);
    const zebraBg = props["data-row-odd"] ? "#fcfcfd" : "#fff";
    const isLast = !!props["data-last"];
    const enhancedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      return React.cloneElement(child as any, { "data-last-row": isLast });
    });
    return (
      <tr
        {...props}
        style={{
          background: hovered ? "#f5f7fb" : zebraBg,
          transition: "background 120ms ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {enhancedChildren}
      </tr>
    );
  };

  // —— 自定义渲染 —— //
  const components = {
    // ====== table 系列（同另一页） ======
    table: ({ children, ...props }: any) => (
      <div style={tableWrapStyle}>
        <table style={tableStyle} {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: any) => <thead {...props}>{children}</thead>,
    tbody: ({ children, ...props }: any) => {
      const rowsArr = React.Children.toArray(children);
      const rows = rowsArr.map((child, idx) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as any, {
          "data-row-odd": idx % 2 === 1,
          "data-last": idx === rowsArr.length - 1,
        });
      });
      return <tbody {...props}>{rows}</tbody>;
    },
    tr: (props: any) => <Tr {...props} />,
    th: ({ children, style, ...props }: any) => (
      <th {...props} style={{ ...thStyle, ...(style || {}) }}>
        <div style={cellDivStyle}>{children}</div>
      </th>
    ),
    td: ({ children, style, ...props }: any) => {
      const text = childrenToText(children);
      const isNum = isNumericText(text);
      const align: React.CSSProperties["textAlign"] =
        style?.textAlign || (isNum ? "right" : "left");
      const isLastRow = !!props["data-last-row"];
      const borderBottom = isLastRow ? "0" : (style?.borderBottom as any) || "1px solid #f3f4f6";
      return (
        <td
          {...props}
          style={{
            ...tdBaseStyle,
            ...(style || {}),
            textAlign: align,
            borderBottom,
          }}
        >
          <div style={cellDivStyle}>{children}</div>
        </td>
      );
    },

    // ====== 标题 + 锚点（同另一页） ======
    h2: ({ children, ...props }: any) => {
      const text = childrenToText(children);
      const id = slugify(text);
      return (
        <h2 id={id} {...props}>
          {children}
          <a className="fx-anchor" href={`#${id}`} aria-label="Anchor">
            #
          </a>
        </h2>
      );
    },
    h3: ({ children, ...props }: any) => {
      const text = childrenToText(children);
      const id = slugify(text);
      return (
        <h3 id={id} {...props}>
          {children}
          <a className="fx-anchor" href={`#${id}`} aria-label="Anchor">
            #
          </a>
        </h3>
      );
    },
    h4: ({ children, ...props }: any) => {
      const text = childrenToText(children);
      const id = slugify(text);
      return (
        <h4 id={id} {...props}>
          {children}
          <a className="fx-anchor" href={`#${id}`} aria-label="Anchor">
            #
          </a>
        </h4>
      );
    },

    // ====== 段落：支持“多图并排”；单图仍用 figure + caption + lightbox ======
    p: ({ node, children, ...props }: any) => {
      const kids = node?.children || [];
      const imgs = kids.filter((c: any) => c?.tagName === "img" && c?.properties) as any[];
      const ignorable = (c: any) =>
        (c?.type === "text" && !String(c.value || "").trim()) || c?.tagName === "br";

      // 多图并排（仅由图片和空白/br 组成）
      const onlyImgsOrSpace =
        imgs.length >= 2 && kids.every((c: any) => c?.tagName === "img" || ignorable(c));

      if (onlyImgsOrSpace) {
        const gap = 12;
        const n = imgs.length;
        return (
          <div
            className="fx-img-row"
            style={{ display: "flex", gap, alignItems: "flex-start", margin: "12px 0" }}
            {...props}
          >
            {imgs.map((img: any, idx: number) => {
              const rawSrc: string = img.properties.src || "";
              const resolvedSrc = imageMap[rawSrc] ?? rawSrc;
              const alt: string = img.properties.alt || "";
              const widthPct = `calc((100% - ${(n - 1) * gap}px) / ${n})`;
              return (
                <figure
                  key={idx}
                  className="fx-figure"
                  style={{ margin: 0, flex: `0 0 ${widthPct}` }}
                >
                  <img
                    className="fx-img"
                    src={resolvedSrc}
                    alt={alt}
                    style={{ width: "100%", height: "auto", display: "block" }}
                    onClick={() => setLightbox({ src: resolvedSrc, alt })}
                  />
                  {alt ? <figcaption className="fx-caption">{alt}</figcaption> : null}
                </figure>
              );
            })}
          </div>
        );
      }

      // 单图：figure + caption + lightbox
      const first = kids?.[0];
      const isOnlyImg = kids?.length === 1 && first?.tagName === "img" && first?.properties;
      if (isOnlyImg) {
        const imgProps = first.properties || {};
        const rawSrc: string = imgProps.src || "";
        const resolvedSrc = imageMap[rawSrc] ?? rawSrc;
        const alt: string = imgProps.alt || "";
        return (
          <figure className="fx-figure" {...props}>
            <img
              className="fx-img"
              src={resolvedSrc}
              alt={alt}
              style={{ width: "100%", height: "auto", display: "block" }}
              onClick={() => setLightbox({ src: resolvedSrc, alt })}
            />
            {alt ? <figcaption className="fx-caption">{alt}</figcaption> : null}
          </figure>
        );
      }

      return <p {...props}>{children}</p>;
    },

    // 原生/内嵌 HTML 的 <img>：按单图处理
    img: ({ src = "", alt = "", ...props }: any) => {
      const resolvedSrc = imageMap[src] ?? src;
      return (
        <figure className="fx-figure">
          <img
            className="fx-img"
            src={resolvedSrc}
            alt={alt}
            style={{ width: "100%", height: "auto", display: "block" }}
            onClick={() => setLightbox({ src: resolvedSrc, alt })}
            {...props}
          />
          {alt ? <figcaption className="fx-caption">{alt}</figcaption> : null}
        </figure>
      );
    },

    // 居中对齐（兼容 <div align="center">）
    div: ({ align, style, ...props }: any) => (
      <div style={{ textAlign: align === "center" ? "center" : undefined, ...style }} {...props} />
    ),

    // 链接新开页
    a: ({ href = "", children, ...props }: any) => (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),
  };

  return (
    <div style={containerStyle} className={`fx-article-shell ${toc.length ? "has-toc" : ""}`}>
      {/* 右侧 TOC（仅桌面显示） */}
      {toc.length > 0 && (
        <nav className="fx-toc" aria-label="Table of contents">
          <h3 className="fx-toc-title">Contents</h3>
          <ul className="fx-toc-list">
            {toc.map((it, idx) => (
              <li key={idx} className={`d${it.depth}`}>
                <a href={`#${it.id}`}>{it.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <article className="markdown-body fx-article">
        <ReactMarkdown
          // 与另一页一致：表格/任务列表等
          remarkPlugins={[remarkGfm]}
          // 允许文中内嵌 HTML（如 <img>, <div align="center">）
          rehypePlugins={[rehypeRaw]}
          components={components as any}
        >
          {defaultMarkdownContent}
        </ReactMarkdown>
      </article>

      {/* Lightbox */}
      {lightbox && (
        <div className="fx-lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox.src} alt={lightbox.alt || ""} />
          {lightbox.alt ? <div className="fx-lightbox-cap">{lightbox.alt}</div> : null}
          <button className="fx-lightbox-close" aria-label="Close" onClick={() => setLightbox(null)}>
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default FinanceOverview;
