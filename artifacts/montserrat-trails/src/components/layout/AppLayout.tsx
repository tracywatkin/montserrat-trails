import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-[100dvh] relative">
      <div className="bg-noise" />
      <Navbar />
      <main className="flex-grow z-10 flex flex-col relative">
        {children}
      </main>
      <Footer />
    </div>
  );
}
