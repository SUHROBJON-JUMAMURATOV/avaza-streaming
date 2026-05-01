import { NavLink } from "react-router-dom";
import { Home, Search, Library, Video, Heart, ListMusic, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export const Sidebar = () => {
  const { t } = useTranslation();
  const items = [
    { to: "/", icon: Home, label: t("nav.home") },
    { to: "/search", icon: Search, label: t("nav.search") },
    { to: "/library", icon: Library, label: t("nav.library") },
    { to: "/videos", icon: Video, label: t("nav.videos") },
    { to: "/saved", icon: Heart, label: t("nav.saved") },
    { to: "/playlists", icon: ListMusic, label: t("nav.playlists") },
  ];
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 glass-strong border-r border-border/40 p-4 gap-2">
      <NavLink to="/" className="flex items-center gap-2 px-3 py-4">
        <div className="w-9 h-9 rounded-xl bg-gradient-primary shadow-glow grid place-items-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-2xl gradient-text tracking-tight">AVAZA</span>
      </NavLink>
      <nav className="flex flex-col gap-1 mt-2">
        {items.map((it, i) => (
          <motion.div key={it.to} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
            <NavLink
              to={it.to}
              end={it.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth text-sm font-medium ${
                  isActive
                    ? "bg-secondary text-foreground shadow-card"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`
              }
            >
              <it.icon className="w-5 h-5" />
              <span>{it.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>
      <div className="mt-auto p-4 rounded-xl bg-gradient-primary/10 border border-primary/20">
        <p className="text-xs text-muted-foreground mb-2">PRO</p>
        <p className="text-sm font-semibold mb-2">Yuqori sifat audio</p>
        <button className="text-xs px-3 py-1.5 rounded-full bg-gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-smooth">
          Yangilash
        </button>
      </div>
    </aside>
  );
};
