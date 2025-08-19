// src/components/MarkdownView.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// ✅ 数学公式支持
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import "github-markdown-css";
import "./index.less";

import defaultMarkdownContent from "../../data/newFinancePage/financeContent.md";

// 打包进来的图片映射（确保 key 与 md/HTML 里写的相对路径一致）
import image1 from "../../data/newFinancePage/Revenue_winrate.png";
import image2 from "../../data/newFinancePage/EPS_MAPE.png";
import image3 from "../../data/newFinancePage/EPS_winrate.png";
import image4 from "../../data/newFinancePage/EPS_tiecase.png";
import image5 from "../../data/newFinancePage/Revenue_MAPE.png";
import image6 from "../../data/newFinancePage/Revenue_tiecase.png";
import image7 from "../../data/newFinancePage/AI_financial_analyst_pic.png";

const imageMap: Record<string, string> = {
  "./Revenue_winrate.png": image1,
  "./EPS_MAPE.png": image2,
  "./EPS_winrate.png": image3,
  "./EPS_tiecase.png": image4,
  "./Revenue_MAPE.png": image5,
  "./Revenue_tiecase.png": image6,
  "./AI_financial_analyst_pic.png": image7,
};

// ========== 工具函数 ==========

const cleanHeadingText = (raw: string) => {
  let t = raw;
  t = t.replace(/<[^>]+>/g, "");
  t = t.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1");
  t = t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  t = t.replace(/`{1,3}([^`]+?)`{1,3}/g, "$1");
  t = t.replace(/(\*\*|__)(.*?)\1/g, "$2");
  t = t.replace(/(\*|_)(.*?)\1/g, "$2");
  t = t.replace(/[*_]/g, "");
  t = t
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
  return t.trim();
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/[`~!@#$%^&*()+={}\[\]|\\:;"'’“”，。、《》？、,.<>/?]/g, "")
    .replace(/\s+/g, "-");

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

// 把 style="a:b; c:d" 解析为对象（保留 HTML <img style="...">）
function parseStyle(raw: any): React.CSSProperties | undefined {
  if (!raw) return undefined;
  if (typeof raw === "object") return raw as React.CSSProperties;
  if (typeof raw !== "string") return undefined;
  const out: Record<string, string> = {};
  raw
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .forEach((pair) => {
      const idx = pair.indexOf(":");
      if (idx === -1) return;
      const key = pair.slice(0, idx).trim();
      const val = pair.slice(idx + 1).trim();
      const camel = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      out[camel] = val;
    });
  return out as React.CSSProperties;
}

// ========== 组件 ==========

export const FinanceOverview: React.FC = () => {
  // 版心
  const containerStyle: React.CSSProperties = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "2rem 1.25rem 3rem",
  };

  // TOC
  const [toc, setToc] = React.useState<TocItem[]>([]);
  React.useEffect(() => {
    setToc(parseTOC(defaultMarkdownContent || ""));
  }, []);

  // Lightbox
  const [lightbox, setLightbox] = React.useState<null | {
    src: string;
    alt?: string;
  }>(null);

  // ====== 表格样式（与另一页一致，避免双重外框） ======
  const tableWrapStyle: React.CSSProperties = {
    position: "relative",
    margin: "20px 0",
    border: 0,
    borderRadius: 0,
    background: "transparent",
    boxShadow: "none",
    overflowX: "auto",
    overflowY: "visible",
    WebkitOverflowScrolling: "touch",
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
    border: "none",
    borderTop: 0,
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
    React.HTMLAttributes<HTMLTableRowElement> & {
      "data-row-odd"?: boolean;
      "data-last"?: boolean;
    }
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
    thead: ({ children, ...props }: any) => (
      <thead {...props}>{children}</thead>
    ),
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
      const isLastRow = !!props["data-last-row"];
      const borderBottom = isLastRow
        ? "0"
        : (style?.borderBottom as any) || "1px solid #f3f4f6";
      const text = childrenToText(children);
      const align = isNumericText(text) ? "right" : "left";
      return (
        <td
          {...props}
          style={{
            ...tdBaseStyle,
            ...(style || {}),
            borderBottom,
            textAlign: align,
          }}
        >
          <div style={cellDivStyle}>{children}</div>
        </td>
      );
    },

    // ====== 标题 + 锚点 ======
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

    // ====== 段落：支持“多图并排”；若图本身带 inline style，则不干预 ======
    p: ({ node, children, ...props }: any) => {
      const kids = node?.children || [];
      const imgs = kids.filter(
        (c: any) => c?.tagName === "img" && c?.properties
      ) as any[];
      const ignorable = (c: any) =>
        (c?.type === "text" && !String(c.value || "").trim()) ||
        c?.tagName === "br";
      const hasStyledImg = imgs.some((c: any) => !!c?.properties?.style);

      // 多图并排（仅包含图片与空白，且这些图片没有各自内联样式）
      const onlyImgsOrSpace =
        imgs.length >= 2 &&
        kids.every((c: any) => c?.tagName === "img" || ignorable(c));

      if (onlyImgsOrSpace && !hasStyledImg) {
        const gap = 12;
        const n = imgs.length;
        return (
          <div
            className="fx-img-row"
            style={{
              display: "flex",
              gap,
              alignItems: "flex-start",
              margin: "12px 0",
            }}
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
                  {alt ? (
                    <figcaption className="fx-caption">{alt}</figcaption>
                  ) : null}
                </figure>
              );
            })}
          </div>
        );
      }

      // 单图：figure + caption + lightbox（无样式的情况）
      const first = kids?.[0];
      const isOnlyImg =
        kids?.length === 1 && first?.tagName === "img" && first?.properties;
      if (isOnlyImg && !first?.properties?.style) {
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

    // ====== HTML <img>：若带内联样式（display/width/height/float 任一），按原样输出，但统一加上 fx-img 钩子 ======
    img: (props: any) => {
      const {
        src = "",
        alt = "",
        style: styleProp,
        className,
        ...rest
      } = props;
      const resolvedSrc = imageMap[src] ?? src;

      // 从 props 或 AST 属性读取原始 style
      const rawStyle = styleProp ?? props?.node?.properties?.style;
      const inlineStyle = parseStyle(rawStyle);

      // 统一 className（保留传入的）
      const cls = ["fx-img", className].filter(Boolean).join(" ");

      if (
        inlineStyle &&
        (inlineStyle.display ||
          inlineStyle.width ||
          inlineStyle.height ||
          (inlineStyle as any).float)
      ) {
        return (
          <img
            className={cls}
            src={resolvedSrc}
            alt={alt}
            style={{ height: "auto", ...inlineStyle }}
            onClick={() => setLightbox({ src: resolvedSrc, alt })}
            {...rest}
          />
        );
      }

      // 无样式：走统一风格
      return (
        <figure className="fx-figure">
          <img
            className={cls}
            src={resolvedSrc}
            alt={alt}
            style={{ width: "100%", height: "auto", display: "block" }}
            onClick={() => setLightbox({ src: resolvedSrc, alt })}
            {...rest}
          />
          {alt ? <figcaption className="fx-caption">{alt}</figcaption> : null}
        </figure>
      );
    },

    // 居中对齐（兼容 <div align="center">）
    div: ({ align, style, ...props }: any) => (
      <div
        style={{
          textAlign: align === "center" ? "center" : undefined,
          ...style,
        }}
        {...props}
      />
    ),

    // 链接新开页
    a: ({ href = "", children, ...props }: any) => (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),
  };

  return (
    <div
      style={containerStyle}
      className={`fx-article-shell ${toc.length ? "has-toc" : ""}`}
    >
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
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={components as any}
        >
          {defaultMarkdownContent}
        </ReactMarkdown>
      </article>

      {/* Lightbox */}
      {lightbox && (
        <div className="fx-lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox.src} alt={lightbox.alt || ""} />
          {lightbox.alt ? (
            <div className="fx-lightbox-cap">{lightbox.alt}</div>
          ) : null}
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

export default FinanceOverview;
