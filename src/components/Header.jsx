import { MusicIcon, MusicOffIcon, PixiverseName } from "@/assets/Icons";
import soundsManager from "@/classes/Sounds";
import { useGameAuth } from "@/contexts/GameAuthProvider";
import { useGame } from "@/contexts/GameProvider";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Header = () => {
  const { isAuthenticated, setAuthenticated } = useGameAuth();
  const [isThemePlaying, setIsThemePlaying] = useState(false);
  const { userName } = useGame();

  const router = useRouter();
  const handleMusic = () => {
    if (soundsManager.isThemePlaying) soundsManager.stopTheme();
    else soundsManager.playTheme();
  };

  return (
    <div className="flex justify-between p-3">
      <div
        onClick={() => router.push("/")}
        className="cursor-pointer hover:scale-105 ease-in duration-100"
      >
        <PixiverseName className="h-10" />
      </div>
      <div className=" flex">
        <button className="w-12" onClick={() => handleMusic()}>
          {soundsManager.isThemePlaying ? <MusicIcon /> : <MusicOffIcon />}
        </button>
        {isAuthenticated ? (
          <div className="bg-primary flex-center gap-2 card-container text-[#62832d] px-2 py-1 hover:scale-105 ease-in duration-100 cursor-pointer hover:bg-primary/80">
            <img src="/userProfile.png" className="w-10 rounded" />
            {userName}
          </div>
        ) : (
          <button
            onClick={() => setAuthenticated(false)}
            className="bg-primary card-container text-[#62832d] px-2 py-1 cursor-pointer hover:bg-primary/80"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
