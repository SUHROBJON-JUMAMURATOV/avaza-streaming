import cover1 from "@/assets/cover1.jpg";
import cover2 from "@/assets/cover2.jpg";
import cover3 from "@/assets/cover3.jpg";
import cover4 from "@/assets/cover4.jpg";
import cover5 from "@/assets/cover5.jpg";
import cover6 from "@/assets/cover6.jpg";
import video1 from "@/assets/video1.jpg";
import video2 from "@/assets/video2.jpg";
import video3 from "@/assets/video3.jpg";

export interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration: number; // seconds
  genre: string;
  audio: string; // url (sample)
}

export interface Video {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
  views: number;
}

const sample = "https://cdn.pixabay.com/audio/2022/03/15/audio_c8a73db58e.mp3"; // demo

export const songs: Song[] = [
  { id: "1", title: "Neon Dreams", artist: "Aurora Vale", cover: cover1, duration: 214, genre: "Synthwave", audio: sample },
  { id: "2", title: "Mountain Echo", artist: "Skylar Voss", cover: cover2, duration: 198, genre: "Indie", audio: sample },
  { id: "3", title: "Sunset Drive", artist: "Marlowe", cover: cover3, duration: 232, genre: "Pop", audio: sample },
  { id: "4", title: "Forest Whisper", artist: "Kai Nora", cover: cover4, duration: 256, genre: "Ambient", audio: sample },
  { id: "5", title: "Golden Sax", artist: "Leo Quinn", cover: cover5, duration: 189, genre: "Jazz", audio: sample },
  { id: "6", title: "Cloud Nine", artist: "Mira Sun", cover: cover6, duration: 175, genre: "Lo-Fi", audio: sample },
  { id: "7", title: "Midnight Pulse", artist: "Aurora Vale", cover: cover1, duration: 221, genre: "Synthwave", audio: sample },
  { id: "8", title: "Velvet Sky", artist: "Marlowe", cover: cover3, duration: 203, genre: "Pop", audio: sample },
];

export const playlists = [
  { id: "p1", name: "Daily Mix 1", cover: cover1, count: 24 },
  { id: "p2", name: "Chill Vibes", cover: cover6, count: 18 },
  { id: "p3", name: "Late Night", cover: cover4, count: 32 },
  { id: "p4", name: "Workout", cover: cover3, count: 22 },
  { id: "p5", name: "Jazz Lounge", cover: cover5, count: 15 },
  { id: "p6", name: "Indie Hits", cover: cover2, count: 28 },
];

export const videos: Video[] = [
  { id: "v1", title: "Live in the City", artist: "Aurora Vale", thumbnail: video1, duration: "4:12", views: 1240000 },
  { id: "v2", title: "Neon Nights", artist: "Marlowe", thumbnail: video2, duration: "3:48", views: 892000 },
  { id: "v3", title: "Acoustic Sessions", artist: "Kai Nora", thumbnail: video3, duration: "5:02", views: 543000 },
  { id: "v4", title: "Stage Lights", artist: "Mira Sun", thumbnail: video1, duration: "3:21", views: 312000 },
  { id: "v5", title: "Cyber Tour", artist: "Leo Quinn", thumbnail: video2, duration: "4:55", views: 728000 },
  { id: "v6", title: "Sunset Live", artist: "Skylar Voss", thumbnail: video3, duration: "4:30", views: 401000 },
];
