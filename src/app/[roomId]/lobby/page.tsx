import Lobby from "@/components/LobbyComponents/LobbyPage";
import React from "react";

const page = ({ params }: { params: { roomId: string } }) => {
  const paramsPromise = Promise.resolve(params);

  return <Lobby params={paramsPromise} />;
};

export default page;
