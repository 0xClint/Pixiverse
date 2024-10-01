import { Header } from "@/components";
import { useRouter } from "next/router";
import React from "react";
import { LockIcon } from "@/assets/Icons/";
import { useRecoilState } from "recoil";
import { currentLevelIdAtom } from "@/atoms/currentLevelIdAtom";
import LevelsMap from "@/Levels/LevelsMap";
import { uploadLightHouseFile } from "@/utils/lighthouse";

const Levels = () => {
  const route = useRouter();
  const [currentId, setCurrentId] = useRecoilState(currentLevelIdAtom);

  const handleGoToNextLevel = (levelId) => {
    console.log(LevelsMap);
    const levelsArray = Object.keys(LevelsMap);
    console.log(levelsArray);
    const currentIndex = levelsArray.findIndex((id) => {
      return id === `Level${levelId}`;
    });
    console.log(levelsArray[currentIndex]);
    setCurrentId(levelsArray[currentIndex]);
    route.push(`/land/${levelId}`);
  };
  return (
    <>
      <div className="">
        <div
          className={`absolute w-screen h-screen -z-10 bg-[url('../assets/bg.png')] bg-no-repeat bg-cover bg-center opacity-70`}
        ></div>

        <div className=" w-screen h-screen flex-col">
          <Header />
          <div className="h-full flex-center pb-10">
            <div className="w-[300px] card-container text-[#8A664E]  p-4">
              {/* <button onClick={() => uploadLightHouseFile()}>Retrieve</button> */}
              <button onClick={() => handleGoToNextLevel()}>Retrieve</button>
              <h2 className="w-full bg-tertiary text-white py-2  rounded text-center">
                Levels
              </h2>
              <div className="w-full flex flex-col my-3 ">
                <div
                  onClick={() => handleGoToNextLevel(1)}
                  className="relative flex-center text-center hover:bg-[#e2995c] cursor-pointer rounded p-2"
                >
                  Level 1
                  <LockIcon className="absolute right-1 top-2" />
                </div>
                <div
                  onClick={() => handleGoToNextLevel(2)}
                  className="relative flex-center text-center hover:bg-[#e2995c] cursor-pointer rounded p-2"
                >
                  Level 2
                  <LockIcon className="absolute right-1 top-2" />
                </div>
                <div
                  onClick={() => handleGoToNextLevel(3)}
                  className="relative flex-center text-center hover:bg-[#e2995c] cursor-pointer rounded p-2"
                >
                  Level 3
                  <LockIcon className="absolute right-1 top-2" />
                </div>

                <div
                  onClick={() => handleGoToNextLevel(4)}
                  className="relative flex-center text-center hover:bg-[#e2995c] cursor-pointer rounded p-2"
                >
                  Level 4
                  <LockIcon className="absolute right-1 top-2" />
                </div>
                <div
                  onClick={() => handleGoToNextLevel(5)}
                  className="relative flex-center text-center hover:bg-[#e2995c] cursor-pointer rounded p-2"
                >
                  Level 5
                  <LockIcon className="absolute right-1 top-2" />
                </div>
              </div>
              <button
                onClick={() => route.push(`/land/${1}`)}
                className="w-full border-2 border-tertiary hover:scale-[105%] text-white py-1  rounded text-center"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Levels;
