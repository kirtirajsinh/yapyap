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
  const { user } = useUserStore();
  const { joinRoom } = useRoom();

  const generateToken = async (roomId: string, user: User | null) => {
    if (!roomId) {
      return null;
    }
    console.log("creating a token with roomId");
    const response = await fetch(
      `/token?roomId=${roomId}&name=${user?.username ?? "GUEST"}&avatarUrl=${
        user?.pfpUrl ?? getFallbackAvatar()
      }`
    );
    const token = await response.text();

    console.log("token", token, "state", state, roomId, "roomId");

    if (token && state !== "connected") {
      console.log("token", token, "state", state);
      joinRoom({
        roomId: roomId,
        token,
      });
    }
    if (error) {
      toast.error("Error fetching token");
      console.log(error);
    }
    return token;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchData", resolvedParams.roomId],
    queryFn: () => generateToken(resolvedParams.roomId, user),
    enabled: !!resolvedParams.roomId && state !== "connected" && !!user,
    gcTime: 0, // Disable caching (formerly cacheTime)
    staleTime: 0, // Always consider data stale
  });

  // // Redirect to lobby if room state is idle
  // useEffect(() => {
  //   if (state === "idle") {
  //     push(`/${resolvedParams.roomId}`);
  //   }
  // }, [state, push, resolvedParams.roomId]);

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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-white text-2xl font-semibold">Joining Room...</div>
      </div>
    );
  }
  return (
    <section className="bg-audio flex min-h-screen flex-col items-center justify-center w-full relative text-slate-100 md:flex-row">
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
