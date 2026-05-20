import React from "react";
import { Composition } from "remotion";
import { VibeVoiceComposition } from "./VibeVoice";
import { XeroComposition } from "./Xero";

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
      <Composition
        id="Xero"
        component={XeroComposition}
        durationInFrames={1350}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
