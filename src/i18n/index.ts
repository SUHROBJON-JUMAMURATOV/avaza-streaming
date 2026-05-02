import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  uz: {
    translation: {
      brand: "UZ-MUSIC.UZ",
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
        hero_sub: "Yuqori sifatli audio, HD video va shaxsiy tavsiyalar — UZ-MUSIC.UZ bilan",
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
      common: { loading: "Yuklanmoqda…", more: "Yana", less: "Yopish", upload: "Yuklash", delete: "O'chirish", edit: "Tahrirlash", save: "Saqlash", cancel: "Bekor qilish" },
      auth: {
        login: "Kirish", signup: "Ro'yxatdan o'tish", logout: "Chiqish",
        email: "Email", password: "Parol", full_name: "To'liq ism",
        login_title: "Hisobingizga kiring", signup_title: "Yangi hisob yarating",
        no_account: "Hisobingiz yo'qmi?", have_account: "Hisobingiz bormi?",
        login_success: "Muvaffaqiyatli kirdingiz!", signup_success: "Hisob yaratildi!",
        admin_panel: "Admin panel",
      },
      admin: {
        title: "Admin Panel", songs: "Qo'shiqlar", videos: "Videolar",
        upload_song: "Qo'shiq yuklash", upload_video: "Video yuklash",
        title_field: "Sarlavha", artist: "Artist", genre: "Janr",
        audio_file: "Audio fayl", video_file: "Video fayl", cover_image: "Muqova rasmi", thumbnail: "Thumbnail",
        uploading: "Yuklanmoqda...", uploaded: "Yuklandi!",
      },
    },
  },
  ru: {
    translation: {
      brand: "UZ-MUSIC.UZ",
      tagline: "Музыка и видео — в одном месте",
      nav: { home: "Главная", search: "Поиск", library: "Моя библиотека", videos: "Видео", saved: "Сохранённое", playlists: "Плейлисты", admin: "Админ-панель" },
      home: {
        hero_title: "Откройте свою музыку",
        hero_sub: "Высокое качество звука, HD-видео и персональные рекомендации — с UZ-MUSIC.UZ",
        play_now: "Слушать сейчас", explore: "Смотреть", trending: "В тренде", new_releases: "Новинки", made_for_you: "Для вас", top_videos: "Топ видео",
      },
      search: { placeholder: "Поиск треков, артистов и видео…", all: "Все", songs: "Треки", videos: "Видео", artists: "Артисты", no_results: "Ничего не найдено" },
      library: { title: "Моя библиотека", empty: "Библиотека пуста — добавьте что-нибудь!" },
      saved: { title: "Сохранённое", songs: "Треки", videos: "Видео", images: "Изображения", empty: "Пока ничего не сохранено" },
      videos: { title: "Видео", views: "просмотров" },
      player: { play: "Играть", pause: "Пауза", next: "Следующий", prev: "Предыдущий", shuffle: "Перемешать", repeat: "Повтор", queue: "Очередь", like: "Нравится", download: "Скачать" },
      common: { loading: "Загрузка…", more: "Ещё", less: "Скрыть", upload: "Загрузить", delete: "Удалить", edit: "Изменить", save: "Сохранить", cancel: "Отмена" },
      auth: {
        login: "Войти", signup: "Регистрация", logout: "Выйти",
        email: "Email", password: "Пароль", full_name: "Полное имя",
        login_title: "Войдите в аккаунт", signup_title: "Создайте аккаунт",
        no_account: "Нет аккаунта?", have_account: "Есть аккаунт?",
        login_success: "Вход выполнен!", signup_success: "Аккаунт создан!",
        admin_panel: "Админ-панель",
      },
      admin: {
        title: "Админ-панель", songs: "Треки", videos: "Видео",
        upload_song: "Загрузить трек", upload_video: "Загрузить видео",
        title_field: "Название", artist: "Артист", genre: "Жанр",
        audio_file: "Аудиофайл", video_file: "Видеофайл", cover_image: "Обложка", thumbnail: "Превью",
        uploading: "Загрузка...", uploaded: "Загружено!",
      },
    },
  },
  en: {
    translation: {
      brand: "UZ-MUSIC.UZ",
      tagline: "Music & video — all in one",
      nav: { home: "Home", search: "Search", library: "My Library", videos: "Videos", saved: "Saved", playlists: "Playlists", admin: "Admin Panel" },
      home: {
        hero_title: "Discover your sound",
        hero_sub: "High-quality audio, HD video and personal recommendations — powered by UZ-MUSIC.UZ",
        play_now: "Play now", explore: "Explore", trending: "Trending", new_releases: "New Releases", made_for_you: "Made For You", top_videos: "Top Videos",
      },
      search: { placeholder: "Search songs, artists or videos…", all: "All", songs: "Songs", videos: "Videos", artists: "Artists", no_results: "Nothing found" },
      library: { title: "My Library", empty: "Your library is empty — add something!" },
      saved: { title: "Saved", songs: "Songs", videos: "Videos", images: "Images", empty: "Nothing saved yet" },
      videos: { title: "Videos", views: "views" },
      player: { play: "Play", pause: "Pause", next: "Next", prev: "Previous", shuffle: "Shuffle", repeat: "Repeat", queue: "Queue", like: "Like", download: "Download" },
      common: { loading: "Loading…", more: "More", less: "Less", upload: "Upload", delete: "Delete", edit: "Edit", save: "Save", cancel: "Cancel" },
      auth: {
        login: "Sign In", signup: "Sign Up", logout: "Sign Out",
        email: "Email", password: "Password", full_name: "Full Name",
        login_title: "Welcome back", signup_title: "Create your account",
        no_account: "Don't have an account?", have_account: "Already have an account?",
        login_success: "Signed in successfully!", signup_success: "Account created!",
        admin_panel: "Admin Panel",
      },
      admin: {
        title: "Admin Panel", songs: "Songs", videos: "Videos",
        upload_song: "Upload Song", upload_video: "Upload Video",
        title_field: "Title", artist: "Artist", genre: "Genre",
        audio_file: "Audio file", video_file: "Video file", cover_image: "Cover image", thumbnail: "Thumbnail",
        uploading: "Uploading...", uploaded: "Uploaded!",
      },
    },
  },
};

const stored = typeof window !== "undefined" ? localStorage.getItem("uzmusic_lang") : null;

i18n.use(initReactI18next).init({
  resources,
  lng: stored || "uz",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
