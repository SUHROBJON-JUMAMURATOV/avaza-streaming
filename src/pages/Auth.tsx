import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, User as UserIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(6, "Min 6 characters").max(72),
  fullName: z.string().trim().min(1).max(100).optional(),
});

const Auth = ({ mode = "login" }: { mode?: "login" | "signup" }) => {
  const { t } = useTranslation();
  const nav = useNavigate();
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const isSignup = mode === "signup";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password, fullName: isSignup ? fullName : undefined });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setLoading(true);
    const res = isSignup ? await signUp(email, password, fullName) : await signIn(email, password);
    setLoading(false);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(isSignup ? t("auth.signup_success") : t("auth.login_success"));
      nav("/");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={submit}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl glass-strong border border-border/40 shadow-elevated"
      >
        <Link to="/" className="flex items-center gap-2 justify-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary shadow-glow grid place-items-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-2xl gradient-text">UZ-MUSIC.UZ</span>
        </Link>
        <h1 className="font-display text-2xl font-bold text-center mb-1">
          {isSignup ? t("auth.signup_title") : t("auth.login_title")}
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-6">{t("tagline")}</p>

        <div className="space-y-3">
          {isSignup && (
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t("auth.full_name")}
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-secondary/60 border border-border/40 focus:border-primary outline-none transition-smooth"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.email")}
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-secondary/60 border border-border/40 focus:border-primary outline-none transition-smooth"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("auth.password")}
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-secondary/60 border border-border/40 focus:border-primary outline-none transition-smooth"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] transition-smooth disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSignup ? t("auth.signup") : t("auth.login")}
        </button>

        <p className="text-center text-sm text-muted-foreground mt-4">
          {isSignup ? t("auth.have_account") : t("auth.no_account")}{" "}
          <Link to={isSignup ? "/login" : "/signup"} className="text-primary hover:underline font-medium">
            {isSignup ? t("auth.login") : t("auth.signup")}
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Auth;