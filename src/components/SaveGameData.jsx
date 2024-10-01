import { useGame } from "@/contexts/GameProvider";
import { useRouter } from "next/router";

const SaveGameData = ({ level, setLoader }) => {
  const router = useRouter();

  const { SaveWorld } = useGame();

  const handleSaveGame = async () => {
    setLoader(true);
    const currentGameData = level.getPlacementsData();
    const currCid = router.query.id;
    await SaveWorld(currCid, currentGameData);
    setLoader(false);
  };

  return (
    <button
      onClick={handleSaveGame}
      className="bg-transparent text-white border-2 border-white rounded-md py-2 px-4"
    >
      Save
    </button>
  );
};

export default SaveGameData;
