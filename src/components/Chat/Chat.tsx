"use client";
import type React from "react";
import { useCallback, useEffect, useId } from "react";
import useChatScroll from "./ChatScroll";
import useStore from "@/store/slices";
import { useState, useRef } from "react";
import { BasicIcons } from "@/assets/BasicIcons";
import { useDataMessage } from "@huddle01/react/hooks";
import Header from "../Sidebar/Header/Header";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Input } from "../ui/input";
import useDevice from "../common/useDevice";
import { useMemo } from "react";

const Chat = () => {
  const userDisplayName = useStore((state) => state.userDisplayName);
  const [message, setMessage] = useState<string>("");
  const addChatMessage = useStore((state) => state.addChatMessage);
  const chatMessages = useStore((state) => state.chatMessages);
  const ref = useChatScroll(chatMessages);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { sendData } = useDataMessage();
  const setIsChatOpen = useStore((state) => state.setIsChatOpen);
  const isChatOpen = useStore((state) => state.isChatOpen);
  const { isMobile } = useDevice();

  const sendDataToAllPeers = useCallback(() => {
    sendData({
      to: "*",
      payload: JSON.stringify({ message: message, name: userDisplayName }),
      label: "chat",
    });
  }, [sendData, message, userDisplayName]);

  const handleSend = useCallback(async () => {
    sendDataToAllPeers();
    const newChatMessage = {
      name: userDisplayName,
      text: message,
      is_user: true,
    };
    addChatMessage(newChatMessage);
    setMessage("");
  }, [
    sendDataToAllPeers,
    userDisplayName,
    message,
    addChatMessage,
    setMessage,
  ]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      buttonRef.current?.click();
    }
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value);
  }

  const displayChats = chatMessages.map((chat, index) => {
    return (
      <div
        key={index}
        className={`${
          chat.is_user
            ? "ml-auto text-md break-words max-w-xs w-fit py-1 px-4 mb-2 bg-custom-9 text-secondary rounded-2xl items-center flex"
            : "w-fit py-1 px-4 break-words max-w-xs text-md mb-2 rounded-lg bg-custom-5 "
        } scrollbar-thin`}
      >
        <div className="text-xs text-blue-300">
          {chat.is_user ? null : chat.name}
        </div>
        <div className="w-full break-words whitespace-pre-wrap overflow-wrap-anywhere">
          {chat.text}
        </div>
      </div>
    );
  });

  const ChatContent = useMemo(() => {
    return (
      <div className="flex flex-col h-full" key="chat-content">
        <Header
          title="Chat"
          icon={BasicIcons.chat}
          onClose={() => setIsChatOpen(false)}
        />

        <div
          ref={ref}
          className={`flex-1 overflow-y-auto mt-2  p-2 rounded-lg  ${
            isMobile ? "max-h-[50vh] h-[50vh] " : "max-h-[60vh] h-[60vh] "
          }`}
        >
          <div>{displayChats}</div>
        </div>
        <div className="flex items-center h-30 gap-2 p-2  rounded-lg mt-2">
          <input
            type="text"
            placeholder="Type a message"
            className=" flex-1 p-2 rounded-lg  text-xs sm:text-sm focus:outline-none bg-custom-5"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button
            ref={buttonRef}
            className="p-2 sm:p-1 bg-custom-9 rounded-lg flex items-center justify-center hover:bg-[#2A2C2F]"
            onClick={handleSend}
          >
            {BasicIcons.send}
          </button>
        </div>
      </div>
    );
  }, [ref, isMobile, displayChats, message, handleSend, setIsChatOpen]);

  if (isMobile) {
    return (
      <Drawer open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DrawerContent className="h-[80vh] ">
          <DrawerHeader>
            <DrawerTitle className="">yapyap</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="text-center">
            Chat with your frens
          </DrawerDescription>
          <div className=" w-full h-full p-2 ">{ChatContent}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div className=" w-full sm:w-3/4 md:w-1/4 h-[80vh] p-2 sm:p-4 mr-0 sm:mr-3  rounded-lg">
      {ChatContent}
    </div>
  );
};
export default Chat;
