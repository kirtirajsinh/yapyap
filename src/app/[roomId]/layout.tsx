import React, { ReactNode } from "react";
import { Metadata } from "next";

// Define the params type explicitly
type RoomLayoutProps = {
  children: ReactNode;
  params: Promise<{
    roomId: string;
  }>;
};

export async function generateMetadata({
  params,
}: RoomLayoutProps): Promise<Metadata> {
  // optionally access and extend (rather than replace) parent metadata
  const { roomId } = await params;
  console.log(roomId, "params roomid from lobby");

  const appUrl = process.env.NEXT_PUBLIC_URL;
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const logoUrl = process.env.NEXT_PUBLIC_LOGO;

  return {
    title: `yapyap`,
    description: `Join the Yap Session ${roomId}`,
    openGraph: {
      title: `Yap Space`,
      description: `Yap Space ${roomId} - Join the game!`,

      images: [
        {
          url: `${imageUrl}`,
          width: 800,
          height: 600,
        },
      ],
    },
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: `${imageUrl}`,
        button: {
          title: "Start Yappin",
          action: {
            type: "launch_frame",
            name: "yapyap",
            url: `${appUrl}/${roomId}`,
            splashImageUrl: `${logoUrl}`,
            splashBackgroundColor: "#FFFFFF",
          },
        },
      }),
    },
  };
}

const Layout = ({ children, params }: RoomLayoutProps) => {
  return <div>{children}</div>;
};

export default Layout;
