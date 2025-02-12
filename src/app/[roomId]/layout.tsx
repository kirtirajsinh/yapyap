import React from "react";
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

  const appUrl = process.env.NEXT_PUBLIC_URL;

  return {
    title: `Yapster`,
    description: `Join the Yap Session ${roomId}`,
    openGraph: {
      title: `Yap Room`,
      description: `Yap room ${roomId} - Join the game!`,

      images: [
        {
          url: "https://pub-b8acacbdf4c34874a29a2fdaab996f29.r2.dev/main%20image.png",
          width: 800,
          height: 600,
        },
      ],
    },
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl:
          "https://pub-b8acacbdf4c34874a29a2fdaab996f29.r2.dev/main%20image.png",
        button: {
          title: "Start Yappin",
          action: {
            type: "launch_frame",
            name: "Yapster",
            url: `${appUrl}/${roomId}/lobby`,
            splashImageUrl:
              "https://pub-b8acacbdf4c34874a29a2fdaab996f29.r2.dev/yap%20logo.png",
            splashBackgroundColor: "#000000",
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
      {children}
    </div>
  );
};

export default Layout;
