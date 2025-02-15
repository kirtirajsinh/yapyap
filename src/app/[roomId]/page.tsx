import React from "react";

import SpacePage from "@/components/Space/SpacePage";
import { Metadata } from "next";

// Define types for the component props
interface HomeProps {
  params: Promise<{ roomId: string }>;
}

type Props = {
  params: { roomId: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { roomId } = await params;
  const appUrl = process.env.NEXT_PUBLIC_URL;

  let roomMetaData;

  try {
    const getMetadata = await fetch(
      `${appUrl}/api/get-room-metadata?roomId=${roomId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );
    roomMetaData = await getMetadata.json();
    console.log("roomData from generateMetadata", roomMetaData);
  } catch (error) {
    console.log("error in generateMetadata", error);
  }

  // Use cached version of the API call

  const defaultImage =
    "https://pub-b8acacbdf4c34874a29a2fdaab996f29.r2.dev/main%20image.png";
  const imageUrl = roomMetaData?.metadata?.imageUrl || defaultImage;

  const frameData = {
    version: "next",
    imageUrl: imageUrl,
    button: {
      title: roomMetaData?.metadata?.title
        ? `join ${roomMetaData?.metadata?.title} on Yapster`
        : "Start Yapping",
      action: {
        type: "launch_frame",
        name: "Yapster",
        url: `${appUrl}/${roomId}/lobby`,
        splashImageUrl:
          "https://pub-b8acacbdf4c34874a29a2fdaab996f29.r2.dev/yap%20logo.png",
        splashBackgroundColor: "#000000",
      },
    },
  };

  return {
    title: `Yapster`,
    description: `Join the Yap Session ${roomId}`,
    openGraph: {
      title: `Yap Room`,
      description: `Yap room ${roomId} - Join the game!`,
      images: [{ url: imageUrl, width: 800, height: 600 }],
    },
    other: {
      "fc:frame": JSON.stringify(frameData),
    },
  };
}

const Home: React.FC<HomeProps> = async ({ params }) => {
  return <SpacePage roomId={(await params).roomId} />;
};

export default React.memo(Home);
