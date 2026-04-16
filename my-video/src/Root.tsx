import React from "react";
import { Composition } from "remotion";
import { VibeVoiceComposition } from "./VibeVoice";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VibeVoice"
        component={VibeVoiceComposition}
        durationInFrames={1800}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
