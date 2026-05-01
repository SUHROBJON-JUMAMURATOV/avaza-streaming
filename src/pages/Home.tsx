import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import { songs, playlists, videos } from "@/data/mock";
import { SongCard } from "@/components/cards/SongCard";
import { VideoCard } from "@/components/cards/VideoCard";
import { PlaylistCard } from "@/components/cards/PlaylistCard";
import { SectionHeader } from "@/components/SectionHeader";
import { usePlayer } from "@/store/player";
import hero from "@/assets/hero.jpg";

const Home = () => {
  const { t } = useTranslation();
  const { playSong } = usePlayer();
  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl">
        <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="relative p-8 lg:p-14 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium mb-4">
            <Sparkles className="w-3 h-3 text-primary-glow" /> AVAZA Premium
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-4xl lg:text-6xl font-bold leading-tight tracking-tight">
            {t("home.hero_title")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 text-muted-foreground text-base lg:text-lg max-w-lg">
            {t("home.hero_sub")}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 flex gap-3">
            <button
              onClick={() => playSong(songs[0], songs)}
              className="px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold flex items-center gap-2 shadow-glow hover:scale-105 transition-smooth"
            >
              <Play className="w-4 h-4" /> {t("home.play_now")}
            </button>
            <button className="px-6 py-3 rounded-full glass font-semibold hover:bg-secondary transition-smooth">
              {t("home.explore")}
            </button>
          </motion.div>
        </div>
      </section>

      <section>
        <SectionHeader title={t("home.trending")} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {songs.slice(0, 5).map((s) => <SongCard key={s.id} song={s} queue={songs} />)}
        </div>
      </section>

      <section>
        <SectionHeader title={t("home.made_for_you")} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {playlists.map((p) => <PlaylistCard key={p.id} {...p} />)}
        </div>
      </section>

      <section>
        <SectionHeader title={t("home.new_releases")} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {songs.slice(3, 8).map((s) => <SongCard key={s.id} song={s} queue={songs} />)}
        </div>
      </section>

      <section>
        <SectionHeader title={t("home.top_videos")} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.slice(0, 3).map((v) => <VideoCard key={v.id} video={v} />)}
        </div>
      </section>
    </div>
  );
};
export default Home;
