import {
  CopyIcon,
  MusicIcon,
  MusicOffIcon,
  PixiverseName,
} from "@/assets/Icons";
import soundsManager from "@/classes/Sounds";
import { useGameAuth } from "@/contexts/GameAuthProvider";
import { useGame } from "@/contexts/GameProvider";
import { shortenAddress } from "@/helpers/convertor";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Snippet,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Header = () => {
  const { isAuthenticated, setAuthenticated, userLogout } = useGameAuth();
  const [isThemePlaying, setIsThemePlaying] = useState(false);
  const { userName, account } = useGame();

  const router = useRouter();

  const handleSelect = async (key) => {
    if (key == "copy") {
      navigator.clipboard.writeText(account);
    } else {
      await userLogout();
    }
  };
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
          <Dropdown className="rounded-md border-2 border-black w-full bg-primary">
            <DropdownTrigger>
              <div className="bg-primary flex-center gap-2 card-container text-[#62832d] px-2 py-1 ease-in duration-100 cursor-pointer hover:bg-primary/80">
                <img src="/userProfile.png" className="w-10 rounded" />
                {userName}
              </div>
            </DropdownTrigger>
            <DropdownMenu
              // aria-label="Action event example"
              onAction={(key) => handleSelect(key)}
              className="rounded-none bg-primary"
            >
              <DropdownItem
                key="copy"
                className="bg-primary hover:bg-[#62832d]"
              >
                <span className="flex gap-2">
                  {account ? shortenAddress(account) : ""}{" "}
                  <CopyIcon className="w-5" />
                </span>
              </DropdownItem>
              <DropdownItem key="logout" className="">
                <Button className=" w-full bg-tertiary">Logout</Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
