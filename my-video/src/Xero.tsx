import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { XScene1Hook } from "./scenes/xero/XScene1Hook";
import { XScene2NotMeeting } from "./scenes/xero/XScene2NotMeeting";
import { XScene3Xero } from "./scenes/xero/XScene3Xero";
import { XScene4Stripe } from "./scenes/xero/XScene4Stripe";
import { XScene5Story } from "./scenes/xero/XScene5Story";
import { XScene6PartOne } from "./scenes/xero/XScene6PartOne";
import { XScene7Follow } from "./scenes/xero/XScene7Follow";

// 30fps
// Scene 1: 0   – 120  (4s)  Hook
// Scene 2: 120 – 300  (6s)  Not a meeting
// Scene 3: 300 – 540  (8s)  Xero features
// Scene 4: 540 – 750  (7s)  Stripe
// Scene 5: 750 – 960  (7s)  Consultant story
// Scene 6: 960 – 1140 (6s)  Part one of five
// Scene 7: 1140– 1350 (7s)  Follow CTA
// Total: 1350 frames = 45s

const CUTS = [0, 120, 300, 540, 750, 960, 1140, 1350];

const Flash: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at - 1, at, at + 6], [0, 0.7, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{
      background: "#ffffff",
      opacity,
      pointerEvents: "none",
      zIndex: 100,
    }} />
  );
};

export const XeroComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#050508" }}>
      <Sequence from={CUTS[0]} durationInFrames={CUTS[1] - CUTS[0] + 8}>
        <AbsoluteFill><XScene1Hook /></AbsoluteFill>
      </Sequence>
      <Sequence from={CUTS[1]} durationInFrames={CUTS[2] - CUTS[1] + 8}>
        <AbsoluteFill><XScene2NotMeeting /></AbsoluteFill>
      </Sequence>
      <Sequence from={CUTS[2]} durationInFrames={CUTS[3] - CUTS[2] + 8}>
        <AbsoluteFill><XScene3Xero /></AbsoluteFill>
      </Sequence>
      <Sequence from={CUTS[3]} durationInFrames={CUTS[4] - CUTS[3] + 8}>
        <AbsoluteFill><XScene4Stripe /></AbsoluteFill>
      </Sequence>
      <Sequence from={CUTS[4]} durationInFrames={CUTS[5] - CUTS[4] + 8}>
        <AbsoluteFill><XScene5Story /></AbsoluteFill>
      </Sequence>
      <Sequence from={CUTS[5]} durationInFrames={CUTS[6] - CUTS[5] + 8}>
        <AbsoluteFill><XScene6PartOne /></AbsoluteFill>
      </Sequence>
      <Sequence from={CUTS[6]} durationInFrames={CUTS[7] - CUTS[6]}>
        <AbsoluteFill><XScene7Follow /></AbsoluteFill>
      </Sequence>

      {/* Flash cuts between scenes */}
      {CUTS.slice(1, -1).map((at, i) => <Flash key={i} at={at} />)}
    </AbsoluteFill>
  );
};
