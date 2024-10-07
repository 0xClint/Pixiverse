import "@/styles/global.css";
import { BuildType, OktoProvider } from "okto-sdk-react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RecoilRoot } from "recoil";
import { Layout } from "@/components";
import { GameAuthProvider } from "@/contexts/GameAuthProvider";
import { GameContextProvider } from "@/contexts/GameProvider";
import soundsManager from "@/classes/Sounds";
import { useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    soundsManager.init();
  }, []);

  return (
    <NextUIProvider>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <OktoProvider
          apiKey={process.env.NEXT_PUBLIC_OKTO_API_KEY}
          buildType={BuildType.SANDBOX}
        >
          <RecoilRoot>
            <GameAuthProvider>
              <GameContextProvider>
                <Layout>
                  <Component {...pageProps} /> <div id="portal"></div>
                </Layout>
              </GameContextProvider>
            </GameAuthProvider>
          </RecoilRoot>
        </OktoProvider>
      </GoogleOAuthProvider>
    </NextUIProvider>
  );
}
