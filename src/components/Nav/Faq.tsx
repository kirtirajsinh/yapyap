"use client";
import React from "react";
import DialogOrDrawerWrapper from "../common/DialogOrDrawerWrapper";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { faq } from "@/utils/faq";

const Faq = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="text-lg self-center"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Sparkles />
      </Button>
      <DialogOrDrawerWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="How it Works? 🤔"
        description="Frequently Asked Questions"
      >
        <div className="flex  flex-col  gap-2 overflow-x-auto whitespace-nowrap">
          {faq.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-1 px-2 ${
                item.label === "coming_soon" ? "text-gray-400" : ""
              }`}
            >
              <Sparkles className="w-4 h-4 text-custom-9 flex-shrink-0" />
              <span className="text-md font-bold  sm:max-w-none">
                {item.faq}
              </span>
            </div>
          ))}
        </div>
      </DialogOrDrawerWrapper>
    </>
  );
};

export default Faq;
