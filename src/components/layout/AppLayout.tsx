import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { MobileNav } from "./MobileNav";
import { Player } from "../player/Player";
import { usePlayer } from "@/store/player";
import { motion, AnimatePresence } from "framer-motion";

export const AppLayout = () => {
  const { current } = usePlayer();
  const location = useLocation();
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className={`flex-1 px-4 lg:px-8 py-6 scrollbar-thin ${current ? "pb-32" : "pb-8"}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <MobileNav />
      <Player />
    </div>
  );
};
