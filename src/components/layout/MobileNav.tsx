import { NavLink } from "react-router-dom";
import { Home, Search, Library, Video, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

export const MobileNav = () => {
  const { t } = useTranslation();
  const items = [
    { to: "/", icon: Home, label: t("nav.home") },
    { to: "/search", icon: Search, label: t("nav.search") },
    { to: "/library", icon: Library, label: t("nav.library") },
    { to: "/videos", icon: Video, label: t("nav.videos") },
    { to: "/saved", icon: Heart, label: t("nav.saved") },
  ];
  return (
    <nav className="lg:hidden fixed bottom-[88px] left-2 right-2 z-30 glass-strong rounded-2xl border border-border/40 px-2 py-2 flex justify-around">
      {items.map((it) => (
        <NavLink
          key={it.to}
          to={it.to}
          end={it.to === "/"}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-smooth ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`
          }
        >
          <it.icon className="w-5 h-5" />
          <span className="text-[10px] font-medium">{it.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
