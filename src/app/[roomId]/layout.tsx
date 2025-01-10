import React from "react";
import Navbar from "@/components/common/Navbar";
import HuddleContextProvider from "@/components/ClientComponents/HuddleContextProvider";
import { cn } from "@/utils/helpers";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  params: { roomId: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // optionally access and extend (rather than replace) parent metadata
  const { roomId } = await params;
  console.log(roomId, "params roomid from lobby");

  return {
    title: `Yap Room`,
    description: `Join the Yap Session ${roomId}`,
    openGraph: {
      title: `Yap Room`,
      description: `Yap room ${roomId} - Join the game!`,

      images: [
        {
          url: "https://huddle01.com/images/huddle01.png",
          width: 800,
          height: 600,
        },
      ],
    },
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl:
          "https://pub-b8acacbdf4c34874a29a2fdaab996f29.r2.dev/logo%20maybe.png",
        button: {
          title: "Yap",
          action: {
            type: "launch_frame",
            name: "Yapster",
            url: `https://yapster.vercel.app/${roomId}/lobby`,
            splashImageUrl:
              "https://pub-b8acacbdf4c34874a29a2fdaab996f29.r2.dev/logo%20maybe.png",
            splashBackgroundColor: "#131313",
          },
        },
      }),
    },
  };
}

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { roomid: string };
}) => {
  return (
    <div className={cn("min-h-screen relative font-inter", inter.className)}>
      <Navbar />
      <HuddleContextProvider>{children}</HuddleContextProvider>
    </div>
  );
};

export default Layout;
