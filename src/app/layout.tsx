// Styles
import "./globals.css";

// Components
import Navbar from "@/components/common/Navbar";
import { Manrope } from "next/font/google";
import dynamic from "next/dynamic";
// import huddleContext Provider dynamica
const HuddleContextProvider = dynamic(
  () => import("@/components/ClientComponents/HuddleContextProvider")
);

const manrope = Manrope({
  variable: "--font-jersey-10",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${manrope.variable} font-manrope antialiased`}>
        <HuddleContextProvider>
          <Navbar />
          {children}
        </HuddleContextProvider>
      </body>
    </html>
  );
}
