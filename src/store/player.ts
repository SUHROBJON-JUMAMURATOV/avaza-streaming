import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Song } from "@/data/mock";

interface PlayerState {
  current: Song | null;
  queue: Song[];
  index: number;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  shuffle: boolean;
  repeat: boolean;
  liked: string[];
  savedSongs: string[];
  savedVideos: string[];
  playSong: (song: Song, queue?: Song[]) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  setProgress: (p: number) => void;
  setDuration: (d: number) => void;
  setVolume: (v: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleLike: (id: string) => void;
  toggleSaveSong: (id: string) => void;
  toggleSaveVideo: (id: string) => void;
}

export const usePlayer = create<PlayerState>()(
  persist(
    (set, get) => ({
      current: null,
      queue: [],
      index: 0,
      isPlaying: false,
      volume: 0.8,
      progress: 0,
      duration: 0,
      shuffle: false,
      repeat: false,
      liked: [],
      savedSongs: [],
      savedVideos: [],
      playSong: (song, queue) => {
        const q = queue && queue.length ? queue : [song];
        const idx = q.findIndex((s) => s.id === song.id);
        set({ current: song, queue: q, index: idx >= 0 ? idx : 0, isPlaying: true, progress: 0 });
      },
      toggle: () => set((s) => ({ isPlaying: !s.isPlaying })),
      next: () => {
        const { queue, index, shuffle } = get();
        if (!queue.length) return;
        const ni = shuffle ? Math.floor(Math.random() * queue.length) : (index + 1) % queue.length;
        set({ index: ni, current: queue[ni], isPlaying: true, progress: 0 });
      },
      prev: () => {
        const { queue, index } = get();
        if (!queue.length) return;
        const ni = (index - 1 + queue.length) % queue.length;
        set({ index: ni, current: queue[ni], isPlaying: true, progress: 0 });
      },
      setProgress: (p) => set({ progress: p }),
      setDuration: (d) => set({ duration: d }),
      setVolume: (v) => set({ volume: v }),
      toggleShuffle: () => set((s) => ({ shuffle: !s.shuffle })),
      toggleRepeat: () => set((s) => ({ repeat: !s.repeat })),
      toggleLike: (id) => set((s) => ({ liked: s.liked.includes(id) ? s.liked.filter((x) => x !== id) : [...s.liked, id] })),
      toggleSaveSong: (id) => set((s) => ({ savedSongs: s.savedSongs.includes(id) ? s.savedSongs.filter((x) => x !== id) : [...s.savedSongs, id] })),
      toggleSaveVideo: (id) => set((s) => ({ savedVideos: s.savedVideos.includes(id) ? s.savedVideos.filter((x) => x !== id) : [...s.savedVideos, id] })),
    }),
    {
      name: "uzmusic-player",
      partialize: (s) => ({ liked: s.liked, savedSongs: s.savedSongs, savedVideos: s.savedVideos, volume: s.volume }),
    }
  )
);

export const fmtTime = (sec: number) => {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};
