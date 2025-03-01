"use client";
import React from "react";

// Store
import useStore from "@/store/slices";
import { cn } from "@/utils/helpers";
import Header from "./Header/Header";
import ViewComponent from "./ViewController";
import { BasicIcons } from "@/assets/BasicIcons";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import useDevice from "../common/useDevice";

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const { isMobile } = useDevice();
  const isSidebarOpen = useStore((state) => state.sidebar.isSidebarOpen);

  const sidebarView = useStore((state) => state.sidebar.sidebarView);
  const setSidebarView = useStore((state) => state.setSidebarView);

  if (sidebarView === "close") return null;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <Header
        title="frens"
        icon={BasicIcons.peers}
        onClose={() => setSidebarView("close")}
      />
      <div className="px-4 sm:px-6 py-3 sm:py-4 overflow-y-auto thin-scrollbar">
        {ViewComponent[sidebarView].component}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer
        open={isSidebarOpen}
        onOpenChange={(open) => !open && setSidebarView("close")}
        modal={true}
        dismissible={true}
      >
        <DrawerContent
          className="h-[80vh] "
          aria-describedby="drawer-description"
        >
          <DrawerHeader>
            <DrawerTitle className="">Yap Yap Yap</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="text-center">
            Connected Frens
          </DrawerDescription>
          <div className="w-full h-full p-2">
            <SidebarContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <aside
      className={cn(
        "w-full sm:w-3/4 md:w-1/4 bg-custom-3 h-[40rem] mx-2 md:mr-1 rounded-md transition-all duration-300 ease-out flex-col max-h-[80vh] my-6 sm:my-8 md:my-16 ",
        isSidebarOpen ? "flex" : "hidden"
      )}
      role="complementary"
      aria-label="Sidebar"
    >
      <SidebarContent />
    </aside>
  );
};
export default React.memo(Sidebar);
