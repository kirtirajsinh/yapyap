import CreateRoom from "@/components/Room/CreateRoom";
import { Metadata } from "next";

export async function generateMetadata() {
  const appUrl = process.env.NEXT_PUBLIC_URL;
  return {
    title: "Yapster",
    description: "YAP IT. MEME IT. PUMP IT.",
    openGraph: {
      title: `Yapster`,
      description: `Join the Yap Space`,

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
            url: `${appUrl}`,
            splashImageUrl:
              "https://pub-b8acacbdf4c34874a29a2fdaab996f29.r2.dev/yap%20logo.png",
            splashBackgroundColor: "#000000",
          },
        },
      }),
    },
  };
}

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <CreateRoom />
    </div>
  );
}
