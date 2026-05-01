import { Play } from "lucide-react";
import { motion } from "framer-motion";

export const PlaylistCard = ({ name, cover, count }: { name: string; cover: string; count: number }) => (
  <motion.div whileHover={{ y: -4 }} className="group p-3 rounded-2xl bg-gradient-card border border-border/40 hover:border-primary/40 transition-smooth shadow-card cursor-pointer">
    <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
      <img src={cover} alt={name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 opacity-0 group-hover:opacity-100 transition-smooth" />
      <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-gradient-primary grid place-items-center opacity-0 group-hover:opacity-100 shadow-glow transition-smooth">
        <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
      </div>
    </div>
    <h3 className="font-semibold text-sm truncate">{name}</h3>
    <p className="text-xs text-muted-foreground">{count} tracks</p>
  </motion.div>
);
