// Styles
import "./globals.css";

// Components
import Navbar from "@/components/Nav/Navbar";
import { Manrope } from "next/font/google";
import dynamic from "next/dynamic";
// import huddleContext Provider dynamica

const Provider = dynamic(
  () => import("@/components/ClientComponents/WagmiProvider")
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
    <html lang="en" className="light" suppressHydrationWarning>
      <body className={`${manrope.variable} font-manrope antialiased`}>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
