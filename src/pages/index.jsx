import App from "@/App";
import { Header, MyLands, NewGameModal } from "@/components";
import { useGame } from "@/contexts/GameProvider";
import level from "@/Levels/Level2";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Page() {
  const [landsModal, setLandsModal] = useState(false);
  const [newGameModal, setNewGameModal] = useState(false);
  const { getAllLands, account } = useGame();
  const router = useRouter();
  console.log(account);
  const handleExceute = async () => {
    console.log(level);
  };
  return (
    <>
      <div className="">
        <div
          className={`absolute w-screen h-screen -z-10 bg-[url('../assets/bg.png')] bg-no-repeat bg-cover bg-center opacity-70`}
        ></div>

        <div className=" w-screen h-screen flex-col">
          <Header />
          <MyLands isOpen={landsModal} setIsOpen={setLandsModal} />
          <NewGameModal isOpen={newGameModal} setIsOpen={setNewGameModal} />
          <div className="h-full flex-center pb-10">
            <div className="w-full flex-center flex-col gap-3 text-[#8A664E]">
              <button
                onClick={() => setNewGameModal(true)}
                className="w-[300px] pixelated flex-center bg-secondary p-3 border-2 border-black rounded-md hover:scale-[102%]"
              >
                play
              </button>
              <button
                onClick={() => setLandsModal(true)}
                className="w-[300px] pixelated flex-center bg-secondary p-3 border-2 border-black rounded-md hover:scale-[102%]"
              >
                My Lands
              </button>
              <button
                onClick={() => router.push("/levels")}
                className="w-[300px] pixelated flex-center bg-secondary p-3 border-2 border-black rounded-md hover:scale-[102%]"
              >
                Challenges
              </button>
              <button className="w-[300px] pixelated flex-center bg-secondary p-3 border-2 border-black rounded-md hover:scale-[102%]">
                Settings
              </button>
              <button className="w-[300px] pixelated flex-center bg-secondary p-3 border-2 border-black rounded-md hover:scale-[102%]">
                Controls
              </button>
              <button
                onClick={() => getAllLands()}
                className="w-[300px] pixelated flex-center bg-secondary p-3 border-2 border-black rounded-md hover:scale-[102%]"
              >
                Temp
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
