import { Tooltip } from "@douyinfe/semi-ui";
import React from "react";

interface IProps {
  children: React.ReactNode;
  content?: React.ReactNode | React.ReactNode[];
  color?: string;
  style?: React.CSSProperties;
  position?:
    | "top"
    | "topLeft"
    | "topRight"
    | "left"
    | "leftTop"
    | "leftBottom"
    | "right"
    | "rightTop"
    | "rightBottom"
    | "bottom"
    | "bottomLeft"
    | "bottomRight";
}
export default function (props: IProps) {
  const {
    children,
    style,
    content = null,
    color = null,
    position = "top",
  } = props;
  const isContentArray = Array.isArray(content);
  return (
    <Tooltip
      content={
        isContentArray
          ? content.map((item, index) => (
              <div
                key={index}
                style={{
                  marginBottom: index === content.length - 1 ? 0 : "5px",
                }}
              >
                {item}
              </div>
            ))
          : content
      }
      color={color}
      position={position}
      style={{ maxWidth: 300, ...style }}
    >
      <div
        style={{
          borderBottom: "thin dashed rgb(177, 180, 187)",
          cursor: "pointer",
          display: "inline",
          paddingBottom: 1,
        }}
      >
        {children}
      </div>
    </Tooltip>
  );
}
