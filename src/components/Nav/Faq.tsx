"use client";
import React from "react";
import DialogOrDrawerWrapper from "../common/DialogOrDrawerWrapper";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { faq } from "@/utils/faq"; // Assuming faq is an array of objects like { faq: string, label?: string }

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
        aria-label="Open Frequently Asked Questions"
      >
        <Sparkles />
      </Button>
      <DialogOrDrawerWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="How it Works? 🤔"
        description="Frequently Asked Questions"
      >
        {/* Ensure no whitespace-nowrap here */}
        <div className="flex flex-col gap-2 w-full  ">
          {faq.map((item, index) => (
            <div
              key={index}
              // Use items-start for alignment with the first line
              className={`flex items-start gap-1 px-2 ${
                // Changed items-center to items-start
                item.label === "coming_soon" ? "text-gray-400" : ""
              }`}
            >
              {/* Added mt-1 (or adjust as needed) to visually align icon better with text line-height */}
              <Sparkles className="w-4 h-4 text-custom-9 flex-shrink-0 mt-1" />
              {/* REMOVED whitespace-nowrap, overflow-hidden, text-ellipsis, flex-1, min-w-0 */}
              <span className="text-md font-bold">{item.faq}</span>
            </div>
          ))}
        </div>
      </DialogOrDrawerWrapper>
    </>
  );
};

export default Faq;
