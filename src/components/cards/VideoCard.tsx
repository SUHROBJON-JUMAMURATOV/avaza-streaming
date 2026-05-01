import { Play, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { Video } from "@/data/mock";
import { usePlayer } from "@/store/player";

export const VideoCard = ({ video }: { video: Video }) => {
  const { t } = useTranslation();
  const { savedVideos, toggleSaveVideo } = usePlayer();
  const isSaved = savedVideos.includes(video.id);
  return (
    <motion.div whileHover={{ y: -4 }} className="group rounded-2xl overflow-hidden bg-card border border-border/40 hover:border-accent/40 transition-smooth shadow-card hover:shadow-elevated">
      <div className="relative aspect-video overflow-hidden">
        <img src={video.thumbnail} alt={video.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
        <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-1.5 py-0.5 rounded">{video.duration}</span>
        <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-smooth">
          <div className="w-14 h-14 rounded-full bg-gradient-primary grid place-items-center shadow-glow">
            <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
          </div>
        </div>
      </div>
      <div className="p-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold text-sm truncate">{video.title}</h3>
          <p className="text-xs text-muted-foreground truncate">
            {video.artist} · {(video.views / 1000).toFixed(0)}K {t("videos.views")}
          </p>
        </div>
        <button onClick={() => toggleSaveVideo(video.id)}>
          <Bookmark className={`w-4 h-4 ${isSaved ? "fill-accent text-accent" : "text-muted-foreground hover:text-foreground"}`} />
        </button>
      </div>
    </motion.div>
  );
};
