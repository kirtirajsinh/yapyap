import React, { cache } from "react";
import { cn } from "@/utils/helpers";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  params: { roomId: string };
  children: React.ReactNode;
};

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { roomid: string };
}) => {
  return (
    <div className={cn("min-h-screen relative font-inter", inter.className)}>
      {children}
    </div>
  );
};

export default Layout;
