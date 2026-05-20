import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const XScene2NotMeeting: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const not1 = spring({ frame: frame - 0, fps, config: { damping: 22, stiffness: 100 } });
  const ans1 = spring({ frame: frame - 20, fps, config: { damping: 22, stiffness: 100 } });
  const ans2 = spring({ frame: frame - 70, fps, config: { damping: 22, stiffness: 100 } });

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#050508",
      display: "flex", flexDirection: "column",
      alignItems: "flex-start", justifyContent: "center",
      padding: "0 120px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 80% 50%, rgba(0,185,140,0.04) 0%, transparent 60%)",
      }} />

      {/* Line 1 */}
      <div style={{
        opacity: not1,
        transform: `translateX(${interpolate(not1, [0, 1], [-20, 0])}px)`,
        fontSize: 22,
        color: "#ffffff55",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontWeight: 400,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        marginBottom: 12,
      }}>
        It's not a meeting.
      </div>

      <div style={{
        opacity: not1,
        transform: `translateX(${interpolate(not1, [0, 1], [-20, 0])}px)`,
        fontSize: 22,
        color: "#ffffff55",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontWeight: 400,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        marginBottom: 60,
      }}>
        It's not a pitch.
      </div>

      {/* Divider */}
      <div style={{
        width: interpolate(ans1, [0, 1], [0, 200]),
        height: 1,
        background: "rgba(0,185,140,0.4)",
        marginBottom: 40,
      }} />

      {/* Reveal */}
      <div style={{
        opacity: ans1,
        transform: `translateY(${interpolate(ans1, [0, 1], [20, 0])}px)`,
      }}>
        <div style={{
          fontSize: 52,
          fontWeight: 900,
          color: "#ffffff",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
        }}>
          It's the last week
        </div>
        <div style={{
          fontSize: 52,
          fontWeight: 900,
          color: "#00b98c",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
        }}>
          of the month.
        </div>
      </div>

      {/* Sub line */}
      <div style={{
        opacity: ans2,
        transform: `translateY(${interpolate(ans2, [0, 1], [15, 0])}px)`,
        marginTop: 30,
        fontSize: 20,
        color: "#ffffff66",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontWeight: 400,
        lineHeight: 1.6,
      }}>
        When everything stops —<br />
        and you spend days sorting finances<br />
        that should have sorted themselves.
      </div>
    </div>
  );
};
