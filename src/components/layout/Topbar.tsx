import { useTranslation } from "react-i18next";
import { Bell, User, Globe } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Topbar = () => {
  const { i18n } = useTranslation();
  const langs = [
    { code: "uz", label: "O‘zbek", flag: "🇺🇿" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "en", label: "English", flag: "🇬🇧" },
  ];
  const current = langs.find((l) => l.code === i18n.language) || langs[0];

  const change = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem("avaza_lang", code);
  };

  return (
    <header className="sticky top-0 z-30 glass-strong border-b border-border/40 px-6 py-3 flex items-center justify-between">
      <div className="lg:hidden font-display font-bold text-xl gradient-text">AVAZA</div>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-smooth text-sm">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">{current.flag} {current.label}</span>
            <span className="sm:hidden">{current.flag}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-strong">
            {langs.map((l) => (
              <DropdownMenuItem key={l.code} onClick={() => change(l.code)} className="gap-2 cursor-pointer">
                <span>{l.flag}</span><span>{l.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <button className="w-9 h-9 grid place-items-center rounded-lg hover:bg-secondary transition-smooth">
          <Bell className="w-4 h-4" />
        </button>
        <button className="w-9 h-9 grid place-items-center rounded-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-smooth">
          <User className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
