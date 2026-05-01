import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./i18n";
import { AppLayout } from "./components/layout/AppLayout";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import Library from "./pages/Library";
import VideosPage from "./pages/VideosPage";
import Saved from "./pages/Saved";
import Playlists from "./pages/Playlists";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/library" element={<Library />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/playlists" element={<Playlists />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
