import ReactDom from "react-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import { userDetailsAtom } from "@/atoms/UserDataAtom";
import { useOkto } from "okto-sdk-react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useGameAuth } from "@/contexts/GameAuthProvider";

const UserLoginModal = () => {
  const [userData, setUserData] = useRecoilState(userDetailsAtom);
  const { isAuthenticated, setAuthenticated, userAuthenticate } = useGameAuth();

  const { authenticate } = useOkto();
  const [authToken, setAuthToken] = useState();

  const apiService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_OKTO_BASE_URL,
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_OKTO_API_KEY,
      "Content-Type": "application/json",
    },
  });

  const setPin = (idToken, token, reloginPin) => {
    return apiService.post("/api/v1/set_pin", {
      id_token: idToken,
      token: token,
      relogin_pin: reloginPin,
      purpose: "set_pin",
    });
  };

  const handleGoogleLogin = async (credentialResponse) => {
    console.log("Google login response:", credentialResponse);
    const idToken = credentialResponse.credential;
    localStorage.setItem("googleTokenId", idToken);
    console.log("google idtoken: ", idToken);
    authenticate(idToken, async (authResponse, error) => {
      if (authResponse) {
        console.log("Authentication check: ", authResponse);
        setAuthToken(authResponse.auth_token);
        if (!authToken && authResponse.action === "signup") {
          console.log("User Signup");
          const pinToken = authResponse.token;
          await setPin(idToken, pinToken, "0000");
          await authenticate(idToken, async (res, err) => {
            if (res) {
              setAuthToken(res.auth_token);
            }
          });
        }
        setAuthenticated(true);
        console.log("auth token received", authToken);
        // route.push("/");
      }
      if (error) {
        console.error("Authentication error:", error);
      }
    });
  };

  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  return (
    !isAuthenticated && (
      <div className="absolute top-0 left-0 h-screen w-screen p-4 flex-center bg-opacity-50 z-[99999]">
        <motion.div
          className="md:w-[400px] min-h-[400px] card-container border-2 rounded-lg w-full p-6 relative flex flex-col gap-4 overflow-y-auto"
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          <span
            //   onClick={() => setIsOpen(false)}
            className="w-5 h-5 absolute top-[14px] right-4 hover:cursor-pointer"
          >
            X
          </span>
          <span className="font-inter font-regular text-lg text-center">
            Please Login
          </span>
          <div className="flex-center flex-col">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={(error) => {
                console.log("Login Failed", error);
              }}
              useOneTap
              // promptMomentNotification={(notification) =>
              //   console.log("Prompt moment notification:", notification)
              // }
            />
          </div>
          {/* <button onClick={() => userAuthenticate()}>GEt deTIALS</button> */}
        </motion.div>
      </div>
    )
  );
};

export default UserLoginModal;
