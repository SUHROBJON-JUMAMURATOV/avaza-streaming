import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  uz: {
    translation: {
      brand: "AVAZA",
      tagline: "Musiqa va video — bir joyda",
      nav: {
        home: "Bosh sahifa",
        search: "Qidiruv",
        library: "Kutubxonam",
        videos: "Videolar",
        saved: "Saqlanganlar",
        playlists: "Pleylistlar",
        admin: "Admin panel",
      },
      home: {
        hero_title: "Sevimli musiqangizni kashf eting",
        hero_sub: "Yuqori sifatli audio, HD video va shaxsiy tavsiyalar — AVAZA bilan",
        play_now: "Hozir tinglash",
        explore: "Ko‘rib chiqish",
        trending: "Trendda",
        new_releases: "Yangi chiqishlar",
        made_for_you: "Siz uchun",
        top_videos: "Top videolar",
      },
      search: {
        placeholder: "Qo‘shiq, artist yoki video qidirish…",
        all: "Hammasi", songs: "Qo‘shiqlar", videos: "Videolar", artists: "Artistlar",
        no_results: "Hech narsa topilmadi",
      },
      library: { title: "Kutubxonam", empty: "Kutubxonangiz bo‘sh — biror narsa qo‘shing!" },
      saved: { title: "Saqlanganlar", songs: "Qo‘shiqlar", videos: "Videolar", images: "Rasmlar", empty: "Hali hech narsa saqlanmagan" },
      videos: { title: "Videolar", views: "ko‘rishlar" },
      player: { play: "Ijro", pause: "To‘xtatish", next: "Keyingi", prev: "Oldingi", shuffle: "Aralash", repeat: "Takror", queue: "Navbat", like: "Yoqdi", download: "Yuklab olish" },
      common: { loading: "Yuklanmoqda…", more: "Yana", less: "Yopish" },
    },
  },
  ru: {
    translation: {
      brand: "AVAZA",
      tagline: "Музыка и видео — в одном месте",
      nav: { home: "Главная", search: "Поиск", library: "Моя библиотека", videos: "Видео", saved: "Сохранённое", playlists: "Плейлисты", admin: "Админ-панель" },
      home: {
        hero_title: "Откройте свою музыку",
        hero_sub: "Высокое качество звука, HD-видео и персональные рекомендации — с AVAZA",
        play_now: "Слушать сейчас", explore: "Смотреть", trending: "В тренде", new_releases: "Новинки", made_for_you: "Для вас", top_videos: "Топ видео",
      },
      search: { placeholder: "Поиск треков, артистов и видео…", all: "Все", songs: "Треки", videos: "Видео", artists: "Артисты", no_results: "Ничего не найдено" },
      library: { title: "Моя библиотека", empty: "Библиотека пуста — добавьте что-нибудь!" },
      saved: { title: "Сохранённое", songs: "Треки", videos: "Видео", images: "Изображения", empty: "Пока ничего не сохранено" },
      videos: { title: "Видео", views: "просмотров" },
      player: { play: "Играть", pause: "Пауза", next: "Следующий", prev: "Предыдущий", shuffle: "Перемешать", repeat: "Повтор", queue: "Очередь", like: "Нравится", download: "Скачать" },
      common: { loading: "Загрузка…", more: "Ещё", less: "Скрыть" },
    },
  },
  en: {
    translation: {
      brand: "AVAZA",
      tagline: "Music & video — all in one",
      nav: { home: "Home", search: "Search", library: "My Library", videos: "Videos", saved: "Saved", playlists: "Playlists", admin: "Admin Panel" },
      home: {
        hero_title: "Discover your sound",
        hero_sub: "High-quality audio, HD video and personal recommendations — powered by AVAZA",
        play_now: "Play now", explore: "Explore", trending: "Trending", new_releases: "New Releases", made_for_you: "Made For You", top_videos: "Top Videos",
      },
      search: { placeholder: "Search songs, artists or videos…", all: "All", songs: "Songs", videos: "Videos", artists: "Artists", no_results: "Nothing found" },
      library: { title: "My Library", empty: "Your library is empty — add something!" },
      saved: { title: "Saved", songs: "Songs", videos: "Videos", images: "Images", empty: "Nothing saved yet" },
      videos: { title: "Videos", views: "views" },
      player: { play: "Play", pause: "Pause", next: "Next", prev: "Previous", shuffle: "Shuffle", repeat: "Repeat", queue: "Queue", like: "Like", download: "Download" },
      common: { loading: "Loading…", more: "More", less: "Less" },
    },
  },
};

const stored = typeof window !== "undefined" ? localStorage.getItem("avaza_lang") : null;

i18n.use(initReactI18next).init({
  resources,
  lng: stored || "uz",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
