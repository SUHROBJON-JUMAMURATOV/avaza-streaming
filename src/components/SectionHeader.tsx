import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
export const SectionHeader = ({ title }: { title: string }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-end justify-between mb-4">
      <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">{title}</h2>
      <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-smooth">
        {t("common.more")} <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
};
