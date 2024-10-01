import { useEffect } from "react";
import { SPRITE_SHEET_SRC } from "./helpers/consts";
import { useRecoilState } from "recoil";
import { spriteSheetImageAtom } from "./atoms/spriteSheetImageAtom";
import soundsManager from "./classes/Sounds";
import RenderGame from "./components/level-layout/RenderGame";

soundsManager.init();

export default function App({ gameData }) {
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
  return <RenderGame gameData={gameData} />;
}
