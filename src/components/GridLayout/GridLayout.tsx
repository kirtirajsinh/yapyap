"use client";
import { useLocalPeer, usePeerIds } from "@huddle01/react/hooks";
import { Role } from "@huddle01/server-sdk/auth";
import CoHosts from "./ViewPorts/CoHosts";
import Hosts from "./ViewPorts/Hosts";
import Speakers from "./ViewPorts/Speakers";
import Listeners from "./ViewPorts/Listeners";

type GridLayoutProps = {};

const GridLayout: React.FC<GridLayoutProps> = () => {
  const { peerIds } = usePeerIds({ roles: [Role.LISTENER] });
  const { role: localPeerRole } = useLocalPeer();

  return (
    <div className="w-full h-full mx-2 md:ml-10 flex items-center justify-center flex-col py-10 md:py-20">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full pt-12 ">
        <Hosts />
        <CoHosts />
        <Speakers />
      </div>
      <div className="mt-6 sm:mt-8 md:mt-10 mb-16">
        <div className=" text-sm sm:text-base font-normal text-center mb-4 sm:mb-5">
          Listeners -{" "}
          {peerIds.length +
            (localPeerRole && localPeerRole === Role.LISTENER ? 1 : 0)}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
          <Listeners />
        </div>
      </div>
    </div>
  );
};
export default GridLayout;
