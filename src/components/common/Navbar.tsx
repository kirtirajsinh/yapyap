"use client";

import type React from "react";
// import WalletConnect from "../wallet/WalletConnect";
// import Image from 'next/image';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header className="border-b border-custom-1 w-full absolute top-0 left-0 h-16 flex items-center px-10 z-10 text-slate-100 justify-between">
      <h1 className="text-2xl font-bold md:text-4xl">Yapster</h1>
      {/* <WalletConnect /> */}
    </header>
  );
};
export default Navbar;
