"use client";

import dynamic from "next/dynamic";
import type React from "react";
import { HuddleClient, HuddleProvider } from "@huddle01/react";
import { ThemeProvider } from "../theme-provider";
import { useEffect } from "react";

const Toaster = dynamic(
  () => import("react-hot-toast").then((m) => m.Toaster),
  {
    ssr: false,
  }
);

const Provider = dynamic(() => import("./WagmiProvider"), {
  ssr: false,
});

type ToasterProps = {
  children: React.ReactNode;
};

const HuddleContextProvider: React.FC<ToasterProps> = ({ children }) => {
  const huddleClient = new HuddleClient({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? "",
    options: {
      activeSpeakers: {
        size: 8,
      },
    },
  });

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
    <Provider>
      <HuddleProvider client={huddleClient}>
        <ThemeProvider themes={["light", "dark"]} defaultTheme="dark">
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
        </ThemeProvider>
      </HuddleProvider>
    </Provider>
  );
};
export default HuddleContextProvider;
