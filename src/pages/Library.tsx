import { useTranslation } from "react-i18next";
import { songs, playlists } from "@/data/mock";
import { SongCard } from "@/components/cards/SongCard";
import { PlaylistCard } from "@/components/cards/PlaylistCard";
import { SectionHeader } from "@/components/SectionHeader";
import { usePlayer } from "@/store/player";

const Library = () => {
  const { t } = useTranslation();
  const { liked } = usePlayer();
  const likedSongs = songs.filter((s) => liked.includes(s.id));
  return (
    <div className="space-y-10 animate-fade-in">
      <h1 className="font-display text-4xl font-bold">{t("library.title")}</h1>
      <section>
        <SectionHeader title={t("nav.playlists")} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {playlists.map((p) => <PlaylistCard key={p.id} {...p} />)}
        </div>
      </section>
      <section>
        <SectionHeader title="❤️" />
        {likedSongs.length === 0 ? (
          <p className="text-muted-foreground">{t("library.empty")}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {likedSongs.map((s) => <SongCard key={s.id} song={s} queue={likedSongs} />)}
          </div>
        )}
      </section>
    </div>
  );
};
export default Library;
