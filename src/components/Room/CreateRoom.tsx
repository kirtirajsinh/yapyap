"use client";
import React, { useState } from "react";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { createRoom } from "@/app/api/actions/createroom";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { toast } from "react-hot-toast";
import DialogOrDrawerWrapper from "../common/DialogOrDrawerWrapper";

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [roomImage, setRoomImage] = useState<File | null>(null);
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateRoom = async (roomName: string) => {
    if (!isConnected || !address) {
      console.log("Not connected");
      toast.error("Please connect your wallet first!");
      return;
    }
    // Handle room creation logic here
    console.log("Creating room:", roomName);
    setIsCreating(true);
    if (address) {
      const roomId = await createRoom(roomName, address);

      console.log("room", roomId);

      if (roomId) {
        router.push(`/${roomId}/lobby`);
      }
      setIsCreating(false);
    }
  };

  const RoomForm = ({
    onSubmit,
  }: {
    onSubmit: (roomName: string, roomImage: File | null) => void;
  }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(roomName, roomImage);
        }}
        className="grid gap-4"
      >
        <div className="grid gap-2">
          <Label htmlFor="roomName">Space Name</Label>
          <Input
            id="roomName"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div
          className={`grid gap-2 transition-all ${
            isExpanded ? "block" : "hidden"
          }`}
        >
          <Label htmlFor="roomImage">Space Cover Image</Label>
          <Input
            id="roomImage"
            type="file"
            accept="image/*"
            autoFocus
            onChange={(e) => setRoomImage(e.target.files?.[0] || null)}
          />
        </div>
        <Button type="button" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Collapse" : "Tap to expand additional fields"}
        </Button>
        <Button type="submit" disabled={isCreating}>
          Create Room
        </Button>
      </form>
    );
  };

  return (
    <>
      <Button
        variant="outline"
        disabled={!isConnected || isCreating}
        onClick={() => setIsOpen(true)}
      >
        Start Yapping
      </Button>
      <DialogOrDrawerWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Yapster Space"
        description="Start Yapping"
      >
        <RoomForm onSubmit={handleCreateRoom} />
      </DialogOrDrawerWrapper>
    </>
  );
};

export default CreateRoom;
