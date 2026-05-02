import { useEffect, useRef, useState } from "react";
import { usePlayer, fmtTime } from "@/store/player";
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Heart, Maximize2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export const Player = () => {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    current, isPlaying, volume, progress, duration, shuffle, repeat, liked,
    toggle, next, prev, setProgress, setDuration, setVolume, toggleShuffle, toggleRepeat, toggleLike,
  } = usePlayer();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const a = audioRef.current; if (!a || !current) return;
    a.src = current.audio;
    if (isPlaying) a.play().catch(() => {});
  }, [current?.id]);

  useEffect(() => {
    const a = audioRef.current; if (!a) return;
    if (isPlaying) a.play().catch(() => {}); else a.pause();
  }, [isPlaying]);

  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume; }, [volume]);

  // Media Session API for background playback / lockscreen controls
  useEffect(() => {
    if (!current || !("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: current.title,
      artist: current.artist,
      album: "UZ-MUSIC.UZ",
      artwork: [{ src: current.cover, sizes: "512x512", type: "image/jpeg" }],
    });
    navigator.mediaSession.setActionHandler("play", () => toggle());
    navigator.mediaSession.setActionHandler("pause", () => toggle());
    navigator.mediaSession.setActionHandler("nexttrack", () => next());
    navigator.mediaSession.setActionHandler("previoustrack", () => prev());
  }, [current?.id]);

  if (!current) return null;
  const isLiked = liked.includes(current.id);

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => (repeat ? audioRef.current?.play() : next())}
      />

      {/* Bottom mini player */}
      <motion.div
        initial={{ y: 100 }} animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-border/40"
      >
        <div className="px-3 lg:px-6 py-2.5 grid grid-cols-3 lg:grid-cols-[1fr_2fr_1fr] items-center gap-3">
          {/* Track info */}
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => setExpanded(true)} className="relative shrink-0">
              <img src={current.cover} alt={current.title} className="w-12 h-12 rounded-lg object-cover shadow-card" />
              {isPlaying && (
                <div className="absolute inset-0 rounded-lg bg-black/30 grid place-items-center">
                  <div className="flex gap-0.5 h-4 items-end">
                    {[0, 1, 2, 3].map((i) => (
                      <span key={i} className="w-0.5 bg-primary-glow eq-bar" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
            </button>
            <div className="min-w-0 hidden sm:block">
              <p className="text-sm font-semibold truncate">{current.title}</p>
              <p className="text-xs text-muted-foreground truncate">{current.artist}</p>
            </div>
            <button onClick={() => toggleLike(current.id)} className="ml-2 hidden md:block">
              <Heart className={`w-4 h-4 transition-smooth ${isLiked ? "fill-primary text-primary" : "text-muted-foreground hover:text-foreground"}`} />
            </button>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-3">
              <button onClick={toggleShuffle} className={`hidden lg:block transition-smooth ${shuffle ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                <Shuffle className="w-4 h-4" />
              </button>
              <button onClick={prev} className="text-muted-foreground hover:text-foreground transition-smooth">
                <SkipBack className="w-5 h-5" />
              </button>
              <button onClick={toggle} className="w-10 h-10 rounded-full bg-foreground text-background grid place-items-center hover:scale-105 transition-smooth shadow-glow">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <button onClick={next} className="text-muted-foreground hover:text-foreground transition-smooth">
                <SkipForward className="w-5 h-5" />
              </button>
              <button onClick={toggleRepeat} className={`hidden lg:block transition-smooth ${repeat ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                <Repeat className="w-4 h-4" />
              </button>
            </div>
            <div className="hidden lg:flex items-center gap-2 w-full max-w-md">
              <span className="text-[10px] text-muted-foreground tabular-nums w-9 text-right">{fmtTime(progress)}</span>
              <Slider value={[progress]} max={duration || 1} step={1} onValueChange={(v) => { setProgress(v[0]); if (audioRef.current) audioRef.current.currentTime = v[0]; }} className="flex-1" />
              <span className="text-[10px] text-muted-foreground tabular-nums w-9">{fmtTime(duration)}</span>
            </div>
          </div>

          {/* Right */}
          <div className="hidden lg:flex items-center justify-end gap-2">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <Slider value={[volume * 100]} max={100} step={1} onValueChange={(v) => setVolume(v[0] / 100)} className="w-24" />
            <button onClick={() => setExpanded(true)} className="ml-2 text-muted-foreground hover:text-foreground">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
          <div className="lg:hidden flex justify-end">
            <button onClick={() => setExpanded(true)} className="text-muted-foreground"><Maximize2 className="w-4 h-4" /></button>
          </div>
        </div>
      </motion.div>

      {/* Full-screen player */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed inset-0 z-50 bg-background overflow-hidden"
          >
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `url(${current.cover})`, backgroundSize: "cover", filter: "blur(80px)" }} />
            <div className="absolute inset-0 bg-background/70" />
            <div className="relative z-10 h-full flex flex-col p-6 max-w-2xl mx-auto">
              <button onClick={() => setExpanded(false)} className="self-start text-muted-foreground hover:text-foreground">✕</button>
              <div className="flex-1 flex flex-col items-center justify-center gap-6">
                <motion.img
                  key={current.id}
                  initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  src={current.cover} alt={current.title}
                  className="w-72 h-72 sm:w-96 sm:h-96 rounded-2xl object-cover shadow-elevated"
                />
                <div className="text-center">
                  <h2 className="font-display text-3xl font-bold">{current.title}</h2>
                  <p className="text-muted-foreground mt-1">{current.artist}</p>
                </div>
                <div className="w-full max-w-md flex flex-col gap-2">
                  <Slider value={[progress]} max={duration || 1} step={1} onValueChange={(v) => { setProgress(v[0]); if (audioRef.current) audioRef.current.currentTime = v[0]; }} />
                  <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
                    <span>{fmtTime(progress)}</span><span>{fmtTime(duration)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <button onClick={toggleShuffle} className={shuffle ? "text-primary" : "text-muted-foreground"}><Shuffle className="w-5 h-5" /></button>
                  <button onClick={prev}><SkipBack className="w-7 h-7" /></button>
                  <button onClick={toggle} className="w-16 h-16 rounded-full bg-gradient-primary grid place-items-center shadow-glow hover:scale-105 transition-smooth">
                    {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                  </button>
                  <button onClick={next}><SkipForward className="w-7 h-7" /></button>
                  <button onClick={toggleRepeat} className={repeat ? "text-primary" : "text-muted-foreground"}><Repeat className="w-5 h-5" /></button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
