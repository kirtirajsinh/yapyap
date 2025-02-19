"use client";
import React from "react";
import FrameSDK from "@farcaster/frame-sdk";
import { useUserStore } from "@/hooks/UserStore";

import toast from "react-hot-toast";
import { Button } from "../ui/button";

const AddFrame = () => {
  const { user } = useUserStore();
  const [loading, setLoading] = React.useState(false);
  const handleClick = async () => {
    try {
      console.log("FrameSDK", FrameSDK);
      if (!user) {
        console.log("FrameSDK is not defined");
        toast.error("Use Farcaster Frame to add Yapster to your home screen");
        return;
      }
      setLoading(true);
      const result = await FrameSDK.actions.addFrame();
      if (result) {
        toast.success("Added frame to join waitlist");
      } else {
        toast.error("Error adding frame");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error adding frame");
      setLoading(false);
    }
  };
  return (
    <Button
      className=" text-lg"
      onClick={() => handleClick()}
      disabled={loading}
    >
      <h1 className="font-bold text-2xl">+</h1>
    </Button>
  );
};

export default AddFrame;
