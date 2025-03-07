"use client";
import React from "react";

const Disclaimer = () => {
  return (
    <>
      {window.navigator.userAgent === "warpcast" && (
        <div className="fixed top-20  bg-white text-gray-800 px-4 py-2 rounded-md shadow-md border border-gray-300 text-sm font-medium">
          ⚠️ Available on a desktop only
        </div>
      )}
    </>
  );
};

export default Disclaimer;
