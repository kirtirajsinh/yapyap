// Styles
import "./globals.css";

// Components
import Navbar from "@/components/common/Navbar";
import HuddleContextProvider from "@/components/ClientComponents/HuddleContextProvider";
import { Manrope } from "next/font/google";

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
