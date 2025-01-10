"use client";

import dynamic from "next/dynamic";
import type React from "react";
import { HuddleClient, HuddleProvider } from "@huddle01/react";
import { PropsWithChildren, useEffect } from "react";
import FrameSDK from "@farcaster/frame-sdk";

const Toaster = dynamic(
  () => import("react-hot-toast").then((m) => m.Toaster),
  {
    ssr: false,
  }
);

type ToasterProps = {
  children: React.ReactNode;
};

function FarcasterFrameProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    const load = async () => {
      console.log("Running Frame Action ready");
      FrameSDK.actions.ready();
    };
    load();
  }, []);
  return <>{children}</>;
}

const HuddleContextProvider: React.FC<ToasterProps> = ({ children }) => {
  const huddleClient = new HuddleClient({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? "",
  });

  return (
    <HuddleProvider client={huddleClient}>
      <FarcasterFrameProvider>
        <>
          {children}
          <Toaster
            position="bottom-right"
            containerStyle={{
              bottom: "70px",
              animation: "ease-in-out",
              animationFillMode: "forwards",
            }}
            toastOptions={{
              style: {
                padding: "1.2rem 1rem",
              },
              duration: 5000,
              success: {
                style: {
                  border: "1px solid #3CCB7F",
                  backgroundColor: "#121214",
                  color: "#3CCB7F",
                },
              },
              error: {
                style: {
                  border: "1px solid #F87171",
                  background: "black",
                  color: "#F87171",
                },
              },
            }}
          />
        </>
      </FarcasterFrameProvider>
    </HuddleProvider>
  );
};
export default HuddleContextProvider;
