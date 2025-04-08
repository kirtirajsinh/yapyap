"use client";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { WagmiProvider } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";
import FrameSDK from "@farcaster/frame-sdk";
// import { createConfig, http } from "@wagmi/core";
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
// import {
//   coinbaseWallet,
//   injected,
//   metaMask,
//   walletConnect,
// } from "@wagmi/connectors";
import { useUserStore } from "@/hooks/UserStore";
import HuddleContextProvider from "./HuddleContextProvider";

//Add farcasterFrame() to the Connecters array for frame support.
// export const config = createConfig({
//   chains: [baseSepolia],
//   connectors: [
//     injected(),
//     farcasterFrame(),
//     walletConnect({
//       projectId: "a6cb25bbf13cfd3f0d9147e757e0925a",
//     }),
//     coinbaseWallet(),
//   ],
//   //   ssr: true,
//   transports: {
//     [baseSepolia.id]: http(),
//   },
// });

function FarcasterFrameProvider({ children }: PropsWithChildren) {
  const { setUser, setClient } = useUserStore();
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      console.log("Running Frame Action ready");
      // Add the FrameSDK.actions.ready() otherwise your app will get stuck in a loading state i.e. a Splash screen.
      FrameSDK.actions.ready();
      const frameuser = await FrameSDK.context;

      if (frameuser?.user) {
        setUser({
          displayName: frameuser?.user.displayName || "",
          fid: frameuser?.user.fid,
          location: frameuser?.user.location || {
            placeId: "",
            description: "",
          },
          pfpUrl: frameuser?.user.pfpUrl || "",
          username: frameuser?.user.username || "",
        });
      } else {
        console.warn(
          "No user found in FrameSDK context or displayName is undefined."
        );
      }

      if (!frameuser?.client?.added) {
        const add = await FrameSDK.actions.addFrame();
        if (add) {
          console.log("Frame Added");
          setClient({
            added: true,
          });
        }
        setIsSDKLoaded(true);
      } else {
        setClient({
          added: true,
        });
      }
    };
    if (!isSDKLoaded) {
      load();
    }
    load();
  }, [isSDKLoaded, setUser, setClient]);
  return <>{children}</>;
}

const queryClient = new QueryClient();

const Provider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const os = navigator?.userAgent?.includes("Android");
    console.log(os, "os");
    if (!os) {
      Object.defineProperty(navigator, "userAgent", {
        get: () =>
          `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15`,
      });
    } else {
      Object.defineProperty(navigator, "userAgent", {
        get: () =>
          `Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36`,
      });
    }
  }, []);
  return (
    // <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      {/* <RainbowKitProvider> */}
      <FarcasterFrameProvider>
        <HuddleContextProvider>{children}</HuddleContextProvider>
      </FarcasterFrameProvider>
      {/* </RainbowKitProvider> */}
    </QueryClientProvider>
    // </WagmiProvider>
  );
};

export default Provider;
