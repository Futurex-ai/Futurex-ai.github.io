// src/components/MarkdownView.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "github-markdown-css";
import "./index.less"; // 与前一个 Markdown 组件保持一致的样式类

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

// —— 工具函数们 ——

// 清洗 heading 里的“内联 Markdown 标记”，只保留可读文本（和前一份保持一致）
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

// 简单 slugify，和自定义 heading 渲染保持一致
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/[`~!@#$%^&*()+={}\[\]|\\:;"'’“”，。、《》？、,.<>/?]/g, "")
    .replace(/\s+/g, "-");

// 从原始 markdown 抽取 TOC（只抓 h2~h4；保持与另一页一致）
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

// ========= 仅用于表格的辅助：数字检测（右对齐） =========
const isNumericText = (t: string) => {
  const s = (t || "").trim();
  // 支持 -/+、千分位、百分比、小数
  return /^[-+]?(\d{1,3}(,\d{3})*|\d+)(\.\d+)?%?$/.test(s);
};

export const FinanceOverview: React.FC = () => {
  // —— 版心与另一页保持一致 —— //
  const containerStyle: React.CSSProperties = {
    maxWidth: "1440px",
    margin: "0 auto",
    padding: "2rem 1.25rem 3rem",
  };

  // TOC（右侧浮动）
  const [toc, setToc] = React.useState<TocItem[]>([]);
  React.useEffect(() => {
    setToc(parseTOC(defaultMarkdownContent || ""));
  }, []);

  // 简易 Lightbox
  const [lightbox, setLightbox] = React.useState<null | { src: string; alt?: string }>(null);

  // —— 自定义渲染（与另一页一致） —— //
  // ★★★ 下面只“新增/覆盖了表格样式”，其它渲染与另一页相同 ★★★
  const tableWrapStyle: React.CSSProperties = {
    position: "relative",
    margin: "20px 0",
    border: "1px solid #e5e7eb", // 外框（唯一外边线，避免双边）
    borderRadius: 12,
    background: "#ffffff",
    overflowX: "auto",
    overflowY: "visible", // 让 sticky 表头可见
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
    border: "none", // 清掉 github-markdown-css 的 table 边框，避免与 wrapper 叠加
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

  // zebra + hover 行；并把“是否最后一行”传给单元格以去掉底边
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

  const components = {
    // ====== 仅新增/覆盖 table 相关 START ======
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
      // 自动判断是否数字，右对齐；并根据是否最后一行去掉底边
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
    // ====== 仅新增/覆盖 table 相关 END ======

    // ====== 以下与另一页一致（heading / 图片 / 链接等） ======
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

    // 段落：若仅包含 1 张图片 => 用 figure 包裹并生成 caption
    p: ({ node, children, ...props }: any) => {
      const first = node?.children?.[0];
      const isOnlyImg =
        node?.children?.length === 1 && first?.tagName === "img" && first?.properties;

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
              onClick={() => setLightbox({ src: resolvedSrc, alt })}
            />
            {alt ? <figcaption className="fx-caption">{alt}</figcaption> : null}
          </figure>
        );
      }
      return <p {...props}>{children}</p>;
    },

    // 原生/内嵌 HTML 的 <img> 也统一成 figure + caption
    img: ({ src = "", alt = "", ...props }: any) => {
      const resolvedSrc = imageMap[src] ?? src;
      return (
        <figure className="fx-figure">
          <img
            className="fx-img"
            src={resolvedSrc}
            alt={alt}
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

    // 链接默认新开页
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
          remarkPlugins={[remarkGfm]}  // GFM 表格
          rehypePlugins={[rehypeRaw]}  // 允许内嵌 HTML
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
          <button
            className="fx-lightbox-close"
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};
