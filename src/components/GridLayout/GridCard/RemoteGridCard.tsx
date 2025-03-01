"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Assets
import { BasicIcons } from "@/assets/BasicIcons";
import {
  useActivePeers,
  useDataMessage,
  usePeerIds,
  useRemoteAudio,
  useRemotePeer,
} from "@huddle01/react/hooks";
import AudioElem from "@/components/common/AudioElem";
import { getFallbackAvatar } from "@/utils/helpers";

type GridCardProps = {
  peerId: string;
};

const GridCard: React.FC<GridCardProps> = ({ peerId }) => {
  const [reaction, setReaction] = useState("");
  const { activePeerIds, dominantSpeakerId } = useActivePeers();

  const {
    metadata,
    role,
    peerId: remotePeerId,
  } = useRemotePeer<{
    displayName: string;
    avatarUrl: string;
    isHandRaised: boolean;
  }>({ peerId });

  const { stream, isAudioOn } = useRemoteAudio({
    peerId,
    onPlayable: () => {
      console.debug("ON PLAYABLE");
    },
  });

  useDataMessage({
    onMessage(payload, from, label) {
      if (from === peerId) {
        if (label === "reaction") {
          setReaction(payload);
          setTimeout(() => {
            setReaction("");
          }, 5000);
        }
      }
    },
  });

  return (
    <div
      className={`relative flex items-center justify-center flex-col transition-all ${
        dominantSpeakerId === remotePeerId ? "border-8 border-custom-9" : ""
      }`}
    >
      {stream && <AudioElem peerId={peerId} />}
      <Image
        src={metadata?.avatarUrl || getFallbackAvatar()}
        alt="default-avatar"
        width={100}
        height={100}
        quality={100}
        priority
        className={`maskAvatar ${
          dominantSpeakerId === remotePeerId ? "border-8 border-custom-9" : ""
        }`}
      />

      <div className="mt-1 text-center">
        <div className=" text-base font-medium">{metadata?.displayName}</div>
        <div className="text-custom-6 text-sm font-normal">{role}</div>
      </div>
      <div className="absolute left-1/2 bottom-1/2 -translate-x-1/2 mb-2 text-4xl">
        {reaction}
      </div>
      {role && ["host, coHost, speaker"].includes(role) && (
        <div className="absolute right-0">{BasicIcons.audio}</div>
      )}
      {metadata?.isHandRaised && (
        <div className="absolute flex right-2 w-8 h-8 -top-1 rounded-full justify-center items-center bg-custom-8 text-xl border-custom-1 border-2">
          ✋
        </div>
      )}
    </div>
  );
};
export default React.memo(GridCard);
