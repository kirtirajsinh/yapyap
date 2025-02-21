"use client";

import type React from "react";
import AddFrame from "../common/AddFrame";
import { useUserStore } from "@/hooks/UserStore";
import Faq from "./Faq";
// import WalletConnect from "../wallet/WalletConnect";
// import Image from 'next/image';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const { client } = useUserStore();
  return (
    <header className="border-b border-custom-1 w-full absolute top-0 left-0 h-16 flex items-center px-10 z-10 text-slate-100 justify-between">
      <h1 className="text-2xl font-bold md:text-4xl">yapyap</h1>

      {/* <WalletConnect /> */}
      <div className="flex items-center gap-4">
        <Faq />
        {!client.added && <AddFrame />}
      </div>
    </header>
  );
};
export default Navbar;
