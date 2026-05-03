import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Music, Video as VideoIcon, Upload, Trash2, Loader2, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Admin = () => {
  const { t } = useTranslation();
  const { user, isAdmin, loading } = useAuth();
  const [songs, setSongs] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);

  // Song form
  const [sTitle, setSTitle] = useState("");
  const [sArtist, setSArtist] = useState("");
  const [sGenre, setSGenre] = useState("");
  const [sAudio, setSAudio] = useState<File | null>(null);
  const [sCover, setSCover] = useState<File | null>(null);
  const [sUploading, setSUploading] = useState(false);

  // Video form
  const [vTitle, setVTitle] = useState("");
  const [vArtist, setVArtist] = useState("");
  const [vDuration, setVDuration] = useState("");
  const [vFile, setVFile] = useState<File | null>(null);
  const [vThumb, setVThumb] = useState<File | null>(null);
  const [vUploading, setVUploading] = useState(false);

  // Password change
  const [newPass, setNewPass] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  const loadAll = async () => {
    const [{ data: s }, { data: v }] = await Promise.all([
      supabase.from("songs").select("*").order("created_at", { ascending: false }),
      supabase.from("videos").select("*").order("created_at", { ascending: false }),
    ]);
    setSongs(s || []);
    setVideos(v || []);
  };

  useEffect(() => { if (isAdmin) loadAll(); }, [isAdmin]);

  if (loading) return <div className="grid place-items-center h-96"><Loader2 className="w-6 h-6 animate-spin" /></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return (
    <div className="max-w-xl mx-auto text-center py-20">
      <h1 className="font-display text-3xl font-bold mb-2">⛔ Faqat admin uchun</h1>
      <p className="text-muted-foreground">Sizda admin huquqi yo'q. Birinchi admin bo'lish uchun pastdagi tugmani bosing.</p>
      <button
        onClick={async () => {
          const { error } = await supabase.from("user_roles").insert({ user_id: user.id, role: "admin" });
          if (error) toast.error(error.message);
          else { toast.success("Admin huquqi berildi! Sahifani yangilang."); setTimeout(() => location.reload(), 1000); }
        }}
        className="mt-4 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow"
      >
        Birinchi admin bo'lish
      </button>
    </div>
  );

  const uploadFile = async (bucket: string, file: File) => {
    const ext = file.name.split(".").pop();
    const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  };

  const submitSong = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sTitle || !sArtist || !sAudio) { toast.error("Sarlavha, artist va audio shart"); return; }
    setSUploading(true);
    try {
      const audio_url = await uploadFile("audio", sAudio);
      const cover_url = sCover ? await uploadFile("covers", sCover) : null;
      const audio = new Audio(audio_url);
      const duration = await new Promise<number>((res) => {
        audio.onloadedmetadata = () => res(Math.floor(audio.duration) || 0);
        audio.onerror = () => res(0);
      });
      const { error } = await supabase.from("songs").insert({
        title: sTitle, artist: sArtist, genre: sGenre, duration, cover_url, audio_url, uploaded_by: user.id,
      });
      if (error) throw error;
      toast.success(t("admin.uploaded"));
      setSTitle(""); setSArtist(""); setSGenre(""); setSAudio(null); setSCover(null);
      loadAll();
    } catch (err: any) { toast.error(err.message); }
    finally { setSUploading(false); }
  };

  const submitVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vTitle || !vArtist || !vFile) { toast.error("Sarlavha, artist va video shart"); return; }
    setVUploading(true);
    try {
      const video_url = await uploadFile("video", vFile);
      const thumbnail_url = vThumb ? await uploadFile("covers", vThumb) : null;
      const { error } = await supabase.from("videos").insert({
        title: vTitle, artist: vArtist, duration: vDuration || "0:00", video_url, thumbnail_url, uploaded_by: user.id,
      });
      if (error) throw error;
      toast.success(t("admin.uploaded"));
      setVTitle(""); setVArtist(""); setVDuration(""); setVFile(null); setVThumb(null);
      loadAll();
    } catch (err: any) { toast.error(err.message); }
    finally { setVUploading(false); }
  };

  const deleteSong = async (id: string) => {
    if (!confirm("O'chirish?")) return;
    await supabase.from("songs").delete().eq("id", id);
    loadAll();
  };
  const deleteVideo = async (id: string) => {
    if (!confirm("O'chirish?")) return;
    await supabase.from("videos").delete().eq("id", id);
    loadAll();
  };

  const inputCls = "w-full px-3 py-2.5 rounded-lg bg-secondary/60 border border-border/40 focus:border-primary outline-none transition-smooth text-sm";
  const fileCls = "w-full text-sm file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground file:font-medium file:cursor-pointer";

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl">
      <h1 className="font-display text-4xl font-bold gradient-text">{t("admin.title")}</h1>
      <Tabs defaultValue="songs">
        <TabsList className="glass">
          <TabsTrigger value="songs"><Music className="w-4 h-4 mr-2" />{t("admin.songs")}</TabsTrigger>
          <TabsTrigger value="videos"><VideoIcon className="w-4 h-4 mr-2" />{t("admin.videos")}</TabsTrigger>
          <TabsTrigger value="account"><KeyRound className="w-4 h-4 mr-2" />Hisob</TabsTrigger>
        </TabsList>

        <TabsContent value="songs" className="mt-6 space-y-6">
          <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={submitSong} className="p-6 rounded-2xl bg-gradient-card border border-border/40 space-y-3">
            <h2 className="font-semibold text-lg flex items-center gap-2"><Upload className="w-5 h-5" /> {t("admin.upload_song")}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <input className={inputCls} value={sTitle} onChange={(e) => setSTitle(e.target.value)} placeholder={t("admin.title_field")} maxLength={200} />
              <input className={inputCls} value={sArtist} onChange={(e) => setSArtist(e.target.value)} placeholder={t("admin.artist")} maxLength={100} />
              <input className={inputCls} value={sGenre} onChange={(e) => setSGenre(e.target.value)} placeholder={t("admin.genre")} maxLength={50} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">{t("admin.audio_file")} *</label>
                <input type="file" accept="audio/*" onChange={(e) => setSAudio(e.target.files?.[0] || null)} className={fileCls} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">{t("admin.cover_image")}</label>
                <input type="file" accept="image/*" onChange={(e) => setSCover(e.target.files?.[0] || null)} className={fileCls} />
              </div>
            </div>
            <button disabled={sUploading} className="px-6 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground font-semibold shadow-glow disabled:opacity-50 flex items-center gap-2">
              {sUploading && <Loader2 className="w-4 h-4 animate-spin" />}
              {sUploading ? t("admin.uploading") : t("common.upload")}
            </button>
          </motion.form>

          <div className="space-y-2">
            {songs.map((s) => (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/40">
                {s.cover_url && <img src={s.cover_url} className="w-12 h-12 rounded object-cover" alt="" />}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{s.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{s.artist} · {s.genre}</p>
                </div>
                <button onClick={() => deleteSong(s.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            {songs.length === 0 && <p className="text-muted-foreground text-sm text-center py-8">Hali qo'shiq yuklanmagan</p>}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-6 space-y-6">
          <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={submitVideo} className="p-6 rounded-2xl bg-gradient-card border border-border/40 space-y-3">
            <h2 className="font-semibold text-lg flex items-center gap-2"><Upload className="w-5 h-5" /> {t("admin.upload_video")}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <input className={inputCls} value={vTitle} onChange={(e) => setVTitle(e.target.value)} placeholder={t("admin.title_field")} maxLength={200} />
              <input className={inputCls} value={vArtist} onChange={(e) => setVArtist(e.target.value)} placeholder={t("admin.artist")} maxLength={100} />
              <input className={inputCls} value={vDuration} onChange={(e) => setVDuration(e.target.value)} placeholder="3:45" maxLength={10} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">{t("admin.video_file")} *</label>
                <input type="file" accept="video/*" onChange={(e) => setVFile(e.target.files?.[0] || null)} className={fileCls} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">{t("admin.thumbnail")}</label>
                <input type="file" accept="image/*" onChange={(e) => setVThumb(e.target.files?.[0] || null)} className={fileCls} />
              </div>
            </div>
            <button disabled={vUploading} className="px-6 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground font-semibold shadow-glow disabled:opacity-50 flex items-center gap-2">
              {vUploading && <Loader2 className="w-4 h-4 animate-spin" />}
              {vUploading ? t("admin.uploading") : t("common.upload")}
            </button>
          </motion.form>

          <div className="grid sm:grid-cols-2 gap-3">
            {videos.map((v) => (
              <div key={v.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/40">
                {v.thumbnail_url && <img src={v.thumbnail_url} className="w-16 h-12 rounded object-cover" alt="" />}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate text-sm">{v.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{v.artist}</p>
                </div>
                <button onClick={() => deleteVideo(v.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            {videos.length === 0 && <p className="text-muted-foreground text-sm text-center py-8 col-span-2">Hali video yuklanmagan</p>}
          </div>
        </TabsContent>

        <TabsContent value="account" className="mt-6">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (newPass.length < 6) { toast.error("Kamida 6 ta belgi"); return; }
              setPwLoading(true);
              const { error } = await supabase.auth.updateUser({ password: newPass });
              setPwLoading(false);
              if (error) toast.error(error.message);
              else { toast.success("Parol o'zgartirildi"); setNewPass(""); }
            }}
            className="p-6 rounded-2xl bg-gradient-card border border-border/40 space-y-3 max-w-md"
          >
            <h2 className="font-semibold text-lg flex items-center gap-2"><KeyRound className="w-5 h-5" /> Parolni o'zgartirish</h2>
            <p className="text-xs text-muted-foreground">Email: <span className="font-medium text-foreground">{user.email}</span></p>
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Yangi parol (kamida 6 ta belgi)"
              className={inputCls}
              minLength={6}
              maxLength={72}
            />
            <button disabled={pwLoading} className="px-6 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground font-semibold shadow-glow disabled:opacity-50 flex items-center gap-2">
              {pwLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Saqlash
            </button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;