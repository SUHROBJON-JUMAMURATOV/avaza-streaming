import { useTranslation } from "react-i18next";
import { useVideos } from "@/hooks/useMedia";
import { VideoCard } from "@/components/cards/VideoCard";

const VideosPage = () => {
  const { t } = useTranslation();
  const { videos } = useVideos();
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="font-display text-4xl font-bold">{t("videos.title")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((v) => <VideoCard key={v.id} video={v} />)}
      </div>
    </div>
  );
};
export default VideosPage;
