import { useTranslation } from "react-i18next";
import { Bell, User, Globe, LogOut, LogIn } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export const Topbar = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const nav = useNavigate();
  const langs = [
    { code: "uz", label: "O‘zbek", flag: "🇺🇿" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "en", label: "English", flag: "🇬🇧" },
  ];
  const current = langs.find((l) => l.code === i18n.language) || langs[0];

  const change = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem("uzmusic_lang", code);
  };

  return (
    <header className="sticky top-0 z-30 glass-strong border-b border-border/40 px-6 py-3 flex items-center justify-between">
      <Link to="/" className="lg:hidden font-display font-bold text-lg gradient-text">UZ-MUSIC.UZ</Link>
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
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-9 h-9 grid place-items-center rounded-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-smooth">
              <User className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-strong min-w-[200px]">
              <div className="px-2 py-1.5 text-xs text-muted-foreground truncate">{user.email}</div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={async () => { await signOut(); nav("/"); }} className="gap-2 cursor-pointer">
                <LogOut className="w-4 h-4" /> {t("auth.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};
