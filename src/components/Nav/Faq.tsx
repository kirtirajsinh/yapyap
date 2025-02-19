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
        {faq.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col gap-4 ${
              item.label === "coming_soon" ? "text-gray-400" : ""
            }`}
          >
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
              <div className="text-lg font-bold">
                {item.faq.split("\n").map((line, i) => (
                  <div key={i} className={i > 0 ? "ml-6" : ""}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </DialogOrDrawerWrapper>
    </>
  );
};

export default Faq;
