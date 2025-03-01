"use client";

import React, { useEffect, useState, useCallback, use } from "react";
import BottomBar from "@/components/BottomBar/BottomBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import GridLayout from "@/components/GridLayout/GridLayout";
import Prompts from "@/components/common/Prompts";
import {
  useRoom,
  useLocalPeer,
  useDataMessage,
  useActivePeers,
  usePeerIds,
} from "@huddle01/react/hooks";
import { useRouter } from "next/navigation";
import AcceptRequest from "@/components/Modals/AcceptRequest";
import useStore from "@/store/slices";
import Chat from "@/components/Chat/Chat";
// import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/hooks/UserStore";
import toast from "react-hot-toast";
import { getFallbackAvatar } from "@/utils/helpers";

// Define types for the component props
interface HomeProps {
  params: Promise<{ roomId: string }>;
}

// Define types for the metadata used in useLocalPeer
interface PeerMetadata {
  displayName: string;
  avatarUrl: string;
  isHandRaised: boolean;
  walletAddress: string;
}

// Define types for the chat message payload
interface ChatMessage {
  name: string;
  text: string;
  is_user: boolean;
}

interface User {
  displayName: string | null;
  pfpUrl: string | null;
  username: string | null;
}

const generateToken = async (
  roomId: string,
  user: User | null,
  state: string
) => {
  if (!roomId) {
    return null;
  }
  let token;

  console.log(user, "user", state);

  if (state !== "connected" && state !== "connecting") {
    console.log(
      "creating a token with roomId",
      user?.username ?? "GUEST",
      user?.pfpUrl ?? getFallbackAvatar()
    );
    const response = await fetch(
      `/token?roomId=${roomId}&name=${user?.username ?? "GUEST"}&avatarUrl=${
        user?.pfpUrl ?? getFallbackAvatar()
      }`
    );
    token = await response.text();
    return token;
  }
};
const Home: React.FC<HomeProps> = ({ params }) => {
  const resolvedParams = use(params);
  const { state } = useRoom({
    onLeave: () => {
      push(`/`);
    },
  });
  const { push } = useRouter();
  const [requestedPeerId, setRequestedPeerId] = useState<string>("");
  const { showAcceptRequest, setShowAcceptRequest } = useStore();
  const addChatMessage = useStore((state) => state.addChatMessage);
  const addRequestedPeers = useStore((state) => state.addRequestedPeers);
  const requestedPeers = useStore((state) => state.requestedPeers);
  const isChatOpen = useStore((state) => state.isChatOpen);

  const { peerId } = useLocalPeer<PeerMetadata>();

  // Handle "requestToSpeak" data messages
  const handleRequestToSpeak = useCallback(
    (payload: string, from: string, label?: string) => {
      if (label === "requestToSpeak") {
        setShowAcceptRequest(true);
        setRequestedPeerId(from);
        addRequestedPeers(from);
        setTimeout(() => {
          setShowAcceptRequest(false);
        }, 5000);
      }
    },
    [setShowAcceptRequest, setRequestedPeerId, addRequestedPeers]
  );

  // useEffect(() => {
  //   if (token && state !== "connected" && !isLoading) {
  //     joinRoom({
  //       roomId: resolvedParams.roomId,
  //       token,
  //     });
  //   }
  //   if (error) {
  //     console.log("error", error);
  //   }
  // }, [token, error]);

  useEffect(() => {
    if (state === "idle") {
      push(`/`);
      return;
    }
  }, []);

  // Handle "chat" data messages
  const handleChatMessage = useCallback(
    (payload: string, from: string, label?: string) => {
      if (label === "chat" && from !== peerId) {
        const messagePayload: { name: string; message: string } =
          JSON.parse(payload);
        const newChatMessage: ChatMessage = {
          name: messagePayload.name,
          text: messagePayload.message,
          is_user: false,
        };
        addChatMessage(newChatMessage);
      }
    },
    [addChatMessage, peerId]
  );

  // Set up data message listeners
  useDataMessage({
    onMessage: handleRequestToSpeak,
  });

  useDataMessage({
    onMessage: handleChatMessage,
  });

  useEffect(() => {
    if (!requestedPeers.includes(requestedPeerId)) {
      setShowAcceptRequest(false);
    }
  }, [requestedPeers, requestedPeerId, setShowAcceptRequest]);

  if (state !== "connected") {
    return (
      <div className="absolute inset-0 bg-custom-9 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className=" text-2xl font-semibold">Joining Space...</div>
      </div>
    );
  }
  return (
    <section className=" flex min-h-screen flex-col items-center justify-center w-full relative  md:flex-row">
      <div className="flex flex-col w-full items-center md:flex-row">
        <GridLayout />
        <Sidebar />
        <div className="fixed right-4 bottom-24 md:right-6 md:bottom-20">
          {showAcceptRequest && <AcceptRequest peerId={requestedPeerId} />}
        </div>
      </div>
      {isChatOpen && <Chat />}
      <BottomBar />
      <Prompts />
    </section>
  );
};
export default React.memo(Home);
