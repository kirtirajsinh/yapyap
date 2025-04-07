"use client";

import type React from "react";
// import AddFrame from "../common/AddFrame";
import Faq from "./Faq";
import Share from "./Share";
// import WalletConnect from "../wallet/WalletConnect";
// import Image from 'next/image';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header className="border-b w-full absolute top-0 left-0 h-16 flex items-center px-10 z-10  justify-between">
      <h1 className="text-2xl font-bold md:text-4xl">yapyap</h1>

      {/* <WalletConnect /> */}
      <div className="flex items-center gap-4">
        <Faq />
        {/* {!client.added && <AddFrame />} */}
        <Share />
      </div>
    </header>
  );
};
export default Navbar;
