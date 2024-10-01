import { useGameAuth } from "@/contexts/GameAuthProvider";
import React from "react";

const Header = () => {
  const { isAuthenticated, setAuthenticated } = useGameAuth();
  return (
    <div className="flex justify-between p-3">
      <div>LOGO</div>
      <div
        onClick={() => setAuthenticated(false)}
        className="bg-primary card-container text-[#62832d] px-2 py-1 cursor-pointer hover:bg-primary/80"
      >
        Login
      </div>
    </div>
  );
};

export default Header;
