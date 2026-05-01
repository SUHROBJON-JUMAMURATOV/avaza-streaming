import { useTranslation } from "react-i18next";
import { songs, videos } from "@/data/mock";
import { SongCard } from "@/components/cards/SongCard";
import { VideoCard } from "@/components/cards/VideoCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { usePlayer } from "@/store/player";

const Saved = () => {
  const { t } = useTranslation();
  const { savedSongs, savedVideos } = usePlayer();
  const ss = songs.filter((s) => savedSongs.includes(s.id));
  const sv = videos.filter((v) => savedVideos.includes(v.id));
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="font-display text-4xl font-bold">{t("saved.title")}</h1>
      <Tabs defaultValue="songs">
        <TabsList className="glass">
          <TabsTrigger value="songs">{t("saved.songs")} ({ss.length})</TabsTrigger>
          <TabsTrigger value="videos">{t("saved.videos")} ({sv.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="songs" className="mt-6">
          {ss.length === 0 ? <p className="text-muted-foreground">{t("saved.empty")}</p> : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">{ss.map((s) => <SongCard key={s.id} song={s} queue={ss} />)}</div>
          )}
        </TabsContent>
        <TabsContent value="videos" className="mt-6">
          {sv.length === 0 ? <p className="text-muted-foreground">{t("saved.empty")}</p> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{sv.map((v) => <VideoCard key={v.id} video={v} />)}</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Saved;
