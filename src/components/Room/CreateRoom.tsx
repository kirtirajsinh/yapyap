"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { createRoom } from "@/app/api/actions/createroom";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { cn } from "@/lib/utils";
import useDevice from "../common/useDevice";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [roomImage, setRoomImage] = useState<File | null>(null);
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { isMobile, isDesktop } = useDevice();

  const handleCreateRoom = async (roomName: string) => {
    if (!isConnected || !address) {
      console.log("Not connected");
      return;
    }
    // Handle room creation logic here
    console.log("Creating room:", roomName);

    if (address) {
      const roomId = await createRoom(roomName, address);

      console.log("room", roomId);

      if (roomId) {
        router.push(`/${roomId}/lobby`);
      }
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
        <Button type="submit">Create Room</Button>
      </form>
    );
  };

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" disabled={!isConnected}>
            Yap Space
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Space</DialogTitle>
            <DialogDescription>Create a Yap Session</DialogDescription>
          </DialogHeader>
          <RoomForm onSubmit={handleCreateRoom} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" disabled={!isConnected}>
          Start Yapping
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full p-2">
        <DrawerHeader className="self-center">
          <DrawerTitle className="text-center">Yap Space</DrawerTitle>
          <DrawerDescription>Create your yap space</DrawerDescription>
        </DrawerHeader>
        <RoomForm onSubmit={handleCreateRoom} />
      </DrawerContent>
    </Drawer>
  );
};

export default CreateRoom;
