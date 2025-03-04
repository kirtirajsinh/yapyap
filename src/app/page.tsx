import Disclaimer from "@/components/Nav/Disclaimer";
import CreateRoom from "@/components/Room/CreateRoom";
import { Metadata } from "next";

export async function generateMetadata() {
  const appUrl = process.env.NEXT_PUBLIC_URL;
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const logoUrl = process.env.NEXT_PUBLIC_LOGO;
  return {
    title: "yapyap",
    description: "fun live Audio Spaces",
    openGraph: {
      title: `yapyap`,
      description: `Join the Yap Space`,

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
            url: `${appUrl}`,
            splashImageUrl: `${logoUrl}`,
            splashBackgroundColor: "#FFFFFF",
          },
        },
      }),
    },
  };
}

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <Disclaimer />
      <CreateRoom />
    </div>
  );
}
