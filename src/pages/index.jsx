import App from "@/App";
import { Header, MyLands, NewGameModal } from "@/components";
import { useGame } from "@/contexts/GameProvider";
import { useState } from "react";

export default function Page() {
  const [landsModal, setLandsModal] = useState(false);
  const [newGameModal, setNewGameModal] = useState(false);
  const { fetchUserDetails, createWorldFunc, getAllLandsFunc } = useGame();

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
              <button className="w-[300px] pixelated flex-center bg-secondary p-3 border-2 border-black rounded-md hover:scale-[102%]">
                Settings
              </button>
              <button className="w-[300px] pixelated flex-center bg-secondary p-3 border-2 border-black rounded-md hover:scale-[102%]">
                Controls
              </button>
              <button
                onClick={() => getAllLandsFunc()}
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
