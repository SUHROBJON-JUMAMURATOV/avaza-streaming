import { useTranslation } from "react-i18next";
import { playlists } from "@/data/mock";
import { PlaylistCard } from "@/components/cards/PlaylistCard";
const Playlists = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="font-display text-4xl font-bold">{t("nav.playlists")}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {playlists.map((p) => <PlaylistCard key={p.id} {...p} />)}
      </div>
    </div>
  );
};
export default Playlists;
