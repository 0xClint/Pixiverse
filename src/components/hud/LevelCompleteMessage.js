import { currentLevelIdAtom } from "@/atoms/currentLevelIdAtom";
import Levels from "@/Levels/LevelsMap";
import { useRecoilState } from "recoil";

export default function LevelCompleteMessage() {
  const [currentId, setCurrentId] = useRecoilState(currentLevelIdAtom);
  return (
    <p
      style={{
        position: "absolute",
        top: 64,
        left: 0,
        color: "lime",
      }}
    >
      LEVEL COMPLETE!
      <button
        onClick={() => {
          const levelsArray = Object.keys(Levels);
          const currentIndex = levelsArray.findIndex((id) => {
            return id === currentId;
          });
          const nextLevelId = levelsArray[currentIndex + 1] ?? levelsArray[0];
          setCurrentId(nextLevelId);
        }}
      >
        Next level
      </button>
    </p>
  );
}
