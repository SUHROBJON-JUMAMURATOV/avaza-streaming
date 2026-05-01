import { Play, Heart, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import type { Song } from "@/data/mock";
import { usePlayer, fmtTime } from "@/store/player";

export const SongCard = ({ song, queue }: { song: Song; queue?: Song[] }) => {
  const { playSong, current, isPlaying, liked, savedSongs, toggleLike, toggleSaveSong } = usePlayer();
  const active = current?.id === song.id;
  const isLiked = liked.includes(song.id);
  const isSaved = savedSongs.includes(song.id);
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group relative p-4 rounded-2xl bg-gradient-card border border-border/40 hover:border-primary/40 transition-smooth shadow-card hover:shadow-elevated"
    >
      <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
        <img src={song.cover} alt={song.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <button
          onClick={() => playSong(song, queue)}
          className="absolute bottom-2 right-2 w-11 h-11 rounded-full bg-gradient-primary grid place-items-center shadow-glow opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          aria-label="Play"
        >
          <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
        </button>
        {active && isPlaying && (
          <div className="absolute top-2 left-2 flex gap-0.5 h-4 items-end bg-black/40 px-1.5 py-1 rounded">
            {[0, 1, 2].map((i) => <span key={i} className="w-0.5 bg-primary-glow eq-bar" style={{ animationDelay: `${i * 0.15}s` }} />)}
          </div>
        )}
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold text-sm truncate">{song.title}</h3>
          <p className="text-xs text-muted-foreground truncate">{song.artist} · {fmtTime(song.duration)}</p>
        </div>
        <div className="flex flex-col gap-1">
          <button onClick={() => toggleLike(song.id)}>
            <Heart className={`w-4 h-4 transition-smooth ${isLiked ? "fill-primary text-primary" : "text-muted-foreground hover:text-foreground"}`} />
          </button>
          <button onClick={() => toggleSaveSong(song.id)}>
            <Bookmark className={`w-4 h-4 transition-smooth ${isSaved ? "fill-accent text-accent" : "text-muted-foreground hover:text-foreground"}`} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
