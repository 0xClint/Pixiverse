import { userDetailsAtom } from "@/atoms/UserDataAtom";
import { useOkto } from "okto-sdk-react";
import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const GameAuthProviderFn = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const { getUserDetails, getPortfolio, authenticate } = useOkto();

  const userAuthenticate = async () => {
    const idToken = localStorage.getItem("googleTokenId");
    authenticate(idToken, (result, error) => {
      if (result) {
        setAuthenticated(true);
        console.log("authentication successful");
      }
      if (error) {
        setAuthenticated(false);
        console.error("authentication error:", error);
      }
    });
  };

  useEffect(() => {
    userAuthenticate();
  }, [setAuthenticated]);

  return { isAuthenticated, setAuthenticated, userAuthenticate };
};

const GameAuthContext = createContext(null);

export const GameAuthProvider = ({ children }) => {
  return (
    <GameAuthContext.Provider value={GameAuthProviderFn()}>
      {children}
    </GameAuthContext.Provider>
  );
};

export const useGameAuth = () => {
  const context = useContext(GameAuthContext);
  if (!context) {
    throw new Error("useGameAuth must be used within a GameAuthProvider");
  }

  return context;
};
