import React from "react";
import { Button } from "../ui/button";

const Share = () => {
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    const text = `https://warpcast.com/~/compose?text=Join%20my%20Voice%20Space,%20its%20on%20🔥%20@yapyapspace.&embeds[]=https://yapyap.space`;
    window.open(text, "_blank");
  };
  return (
    <>
      <Button onClick={handleShare}>Share</Button>
    </>
  );
};

export default Share;
