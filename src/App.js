import { useEffect, useState } from "react";

import { SPRITE_SHEET_SRC } from "./helpers/consts";
import RenderLevel from "./components/level-layout/RenderLevel";
import { useRecoilState } from "recoil";
import { spriteSheetImageAtom } from "./atoms/spriteSheetImageAtom";
import soundsManager from "./classes/Sounds";
import RenderLand from "./components/level-layout/RenderLand";

soundsManager.init();
// export default function App({ gameData = tempdata }) {
const tempdata = {
  theme: "GREEN",
  tilesWidth: 8,
  tilesHeight: 8,
  placements: [
    {
      x: 2,
      y: 2,
      type: "HERO",
    },

    {
      x: 4,
      y: 4,
      type: "WALL",
    },
  ],
};
export default function App({ gameData = tempdata }) {
  const [spriteSheetImage, setSpriteSheetImage] =
    useRecoilState(spriteSheetImageAtom);

  useEffect(() => {
    const image = new Image();
    image.src = SPRITE_SHEET_SRC;
    image.onload = () => {
      setSpriteSheetImage(image);
    };
  }, [setSpriteSheetImage]);

  if (!spriteSheetImage) return null;
  return gameData ? <RenderLand gameData={gameData} /> : <RenderLevel />;
}
