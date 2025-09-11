/**
 * Données des musiques YouTube pour la playlist
 */

// Fonction pour extraire l'ID YouTube d'une URL
export const extractYouTubeId = (url) => {
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : null;
};

// Playlist des musiques sélectionnées
export const musicPlaylist = [
  {
    id: 1,
    title: "Temperatura (Extended Mix)",
    artist: "Andor Gabriel & Jerome Sydor",
    youtubeId: "PRWxdugXJss",
    url: "https://www.youtube.com/watch?v=PRWxdugXJss",
    duration: "6:12",
    genre: "Deep House"
  },
  {
    id: 2,
    title: "CHIHIRO (Black Coffee Remix)",
    artist: "Billie Eilish", 
    youtubeId: "soL9nvyKJrk",
    url: "https://www.youtube.com/watch?v=soL9nvyKJrk",
    duration: "5:28",
    genre: "Electronic"
  },
  {
    id: 3,
    title: "Wish You Were Here (Guy Mantzur Remix)",
    artist: "Black Coffee feat. Msaki",
    youtubeId: "Y3eciqirTIk",
    url: "https://www.youtube.com/watch?v=Y3eciqirTIk", 
    duration: "7:15",
    genre: "Afro House"
  },
  {
    id: 4,
    title: "Everything I Own (Gorje Hewek Remix)",
    artist: "Nico Morano feat. Mewhy",
    youtubeId: "zuKzagmKygU",
    url: "https://www.youtube.com/watch?v=zuKzagmKygU",
    duration: "6:45",
    genre: "Progressive House"
  },
  {
    id: 5,
    title: "HACHICH/TOSEINA",
    artist: "ElGrandeToto",
    youtubeId: "RWkUIq7lFoE", 
    url: "https://www.youtube.com/watch?v=RWkUIq7lFoE",
    duration: "3:33",
    genre: "Rap Français"
  }
];

// Configuration du lecteur YouTube
export const youtubePlayerConfig = {
  height: '0',
  width: '0',
  playerVars: {
    autoplay: 0,
    controls: 0,
    disablekb: 1,
    fs: 0,
    iv_load_policy: 3,
    modestbranding: 1,
    rel: 0,
    showinfo: 0
  }
};
