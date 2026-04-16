import React from "react";

interface GlowTextProps {
  children: React.ReactNode;
  color?: string;
  glowColor?: string;
  fontSize?: number | string;
  fontWeight?: number | string;
  letterSpacing?: string | number;
  style?: React.CSSProperties;
}

export const GlowText: React.FC<GlowTextProps> = ({
  children,
  color = "#ffffff",
  glowColor = "#00e5ff",
  fontSize = 48,
  fontWeight = 900,
  letterSpacing = "0.12em",
  style = {},
}) => {
  return (
    <div
      style={{
        color,
        fontSize,
        fontWeight,
        letterSpacing,
        textShadow: `0 0 20px ${glowColor}, 0 0 60px ${glowColor}55, 0 0 100px ${glowColor}33`,
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        textTransform: "uppercase",
        textAlign: "center",
        lineHeight: 1.15,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
