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

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const router = useRouter();

  const handleCreateRoom = async (roomName: string) => {
    // Handle room creation logic here
    console.log("Creating room:", roomName);

    const roomId = await createRoom(roomName, []);

    console.log("room", roomId);

    if (roomId) {
      router.push(`/${roomId}/lobby `);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Yap Space</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Space</DialogTitle>
          <DialogDescription>Create a Yap Session</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Space Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleCreateRoom(roomName);
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoom;
