import React from "react";
import { Composition } from "remotion";
import { TileFloor } from "./compositions/TileFloor";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TileFloor"
        component={TileFloor}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
