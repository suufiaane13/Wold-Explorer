/**
 * Piste unique : fichier audio depuis public/music
 */
const filename = 'Charlie Jeer - Everything Is Temporary (Continuous Mix).mp3';

export const currentTrack = {
  id: 1,
  title: 'Everything Is Temporary (Continuous Mix)',
  artist: 'Charlie Jeer',
  src: '/music/' + encodeURIComponent(filename),
  duration: '—',
  genre: 'Continuous Mix'
};
