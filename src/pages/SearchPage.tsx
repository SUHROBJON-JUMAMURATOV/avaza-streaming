import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Search as SearchIcon } from "lucide-react";
import { useSongs, useVideos } from "@/hooks/useMedia";
import { SongCard } from "@/components/cards/SongCard";
import { VideoCard } from "@/components/cards/VideoCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const SearchPage = () => {
  const { t } = useTranslation();
  const [q, setQ] = useState("");
  const { songs } = useSongs();
  const { videos } = useVideos();
  const fSongs = useMemo(() => songs.filter((s) => (s.title + s.artist + s.genre).toLowerCase().includes(q.toLowerCase())), [q]);
  const fVideos = useMemo(() => videos.filter((v) => (v.title + v.artist).toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="relative max-w-2xl">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          autoFocus value={q} onChange={(e) => setQ(e.target.value)}
          placeholder={t("search.placeholder")}
          className="w-full pl-12 pr-4 py-4 rounded-2xl glass-strong border border-border/40 focus:border-primary outline-none transition-smooth text-base"
        />
      </div>
      <Tabs defaultValue="all">
        <TabsList className="glass">
          <TabsTrigger value="all">{t("search.all")}</TabsTrigger>
          <TabsTrigger value="songs">{t("search.songs")}</TabsTrigger>
          <TabsTrigger value="videos">{t("search.videos")}</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6 space-y-8">
          {fSongs.length + fVideos.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">{t("search.no_results")}</p>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">{fSongs.map((s) => <SongCard key={s.id} song={s} queue={fSongs} />)}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{fVideos.map((v) => <VideoCard key={v.id} video={v} />)}</div>
            </>
          )}
        </TabsContent>
        <TabsContent value="songs" className="mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">{fSongs.map((s) => <SongCard key={s.id} song={s} queue={fSongs} />)}</div>
        </TabsContent>
        <TabsContent value="videos" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{fVideos.map((v) => <VideoCard key={v.id} video={v} />)}</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default SearchPage;
