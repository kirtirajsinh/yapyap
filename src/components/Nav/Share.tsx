import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Share = () => {
  return (
    <>
      <Button onClick={() => {}}>
        <Link
          href={`https://warpcast.com/~/compose?text=Join%20my%20Voice%20Space,%20its%20on%20🔥%20@yapyapspace.&embeds[]=https://yapyap.space
`}
          target="_blank"
        >
          Share
        </Link>
      </Button>
    </>
  );
};

export default Share;
