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
import Image from "next/image";
import { uploadFileToR2 } from "@/lib/files";
import { CoverImageUrl } from "@/utils/consts";

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [roomImage, setRoomImage] = useState<File | null>(null);
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCreateRoom = async (roomName: string) => {
    if (!isConnected || !address) {
      console.log("Not connected");
      toast.error("Please connect your wallet first!");
      return;
    }

    if (!roomName) {
      toast.error("Please enter a room name");
      return;
    }
    console.log(roomImage, "roomImage", roomName, "roomName");
    // Handle room creation logic here
    console.log("Creating room:", roomName);
    setIsCreating(true);
    try {
      if (address && roomName) {
        let imageUrl;
        if (roomImage) {
          const formData = new FormData();
          formData.append("image", roomImage);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();
          console.log("data", data);
          imageUrl = `${CoverImageUrl}/${data.imageKey}`;
        }
        const roomId = await createRoom(roomName, address, imageUrl || null);

        console.log("room", roomId);

        if (roomId) {
          await Promise.all([
            router.push(`/${roomId}/lobby`),
            // Add a small delay to ensure the navigation has started
            new Promise((resolve) => setTimeout(resolve, 200)),
          ]);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create room. Please try again.");
      setIsCreating(false); // Reset the state on error
    } finally {
      setIsCreating(false); // Reset the state on completion
    }
    setIsCreating(false); // Reset the state on completion
  };

  const RoomForm = ({
    onSubmit,
  }: {
    onSubmit: (roomName: string, roomImage: File | null) => void;
  }) => {
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
            onChange={(e) => {
              e.preventDefault();
              setRoomImage(e.target.files?.[0] || null);
            }}
          />
        </div>
        {roomImage && (
          <div className="flex flex-col items-center gap-2">
            <Image
              src={URL.createObjectURL(roomImage)}
              alt="Room Cover Image"
              className="h-96 w-96 rounded-md object-cover"
              width={200}
              height={200}
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => setRoomImage(null)}
            >
              Remove
            </Button>
          </div>
        )}
        <Button type="button" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Collapse" : "Tap to expand additional fields"}
        </Button>
        <Button type="submit" disabled={isCreating}>
          {isCreating ? "Creating..." : "Create Room"}
        </Button>
      </form>
    );
  };

  return (
    <>
      <Button
        disabled={isCreating}
        onClick={() => {
          if (!isConnected) {
            toast.error("Please connect your wallet first!");
            return;
          }
          setIsOpen(true);
        }}
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
