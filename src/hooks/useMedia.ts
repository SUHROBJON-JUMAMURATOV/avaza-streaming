import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Song, Video } from "@/data/mock";
import { songs as mockSongs, videos as mockVideos } from "@/data/mock";

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const reload = async () => {
    const { data } = await supabase.from("songs").select("*").order("created_at", { ascending: false });
    if (data && data.length) {
      setSongs(
        data.map((s) => ({
          id: s.id,
          title: s.title,
          artist: s.artist,
          genre: s.genre || "",
          duration: s.duration || 0,
          cover: s.cover_url || mockSongs[0].cover,
          audio: s.audio_url,
        }))
      );
    } else {
      setSongs(mockSongs);
    }
    setLoading(false);
  };
  useEffect(() => { reload(); }, []);
  return { songs, loading, reload };
}

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const reload = async () => {
    const { data } = await supabase.from("videos").select("*").order("created_at", { ascending: false });
    if (data && data.length) {
      setVideos(
        data.map((v) => ({
          id: v.id,
          title: v.title,
          artist: v.artist,
          thumbnail: v.thumbnail_url || mockVideos[0].thumbnail,
          duration: v.duration || "0:00",
          views: v.views || 0,
          videoUrl: v.video_url,
        } as Video & { videoUrl?: string }))
      );
    } else {
      setVideos(mockVideos);
    }
    setLoading(false);
  };
  useEffect(() => { reload(); }, []);
  return { videos, loading, reload };
}