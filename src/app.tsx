import renderPlaylistImages from "./utils/render-playlist-images";
import getAllPlaylistData from "./utils/get-all-playlists";
import { getElement } from "./utils/get-playlist-links";

import './assets/css/styles.scss';

async function main() {
  while (!Spicetify?.Platform || !Spicetify?.CosmosAsync) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  const res = await getAllPlaylistData('https://api.spotify.com/v1/me/playlists?limit=50');

  await renderPlaylistImages(res);

  const playlistElement = await getElement('#spicetify-playlist-list')
  const observer = new MutationObserver(async () => {
    // Needed to prevent an infinite looooooooooooooooooooooooooooooooooooooooooooooop
    observer.disconnect();

    await renderPlaylistImages(res);

    observer.observe(playlistElement, { childList: true, subtree: true });
  });
  observer.observe(playlistElement, { childList: true, subtree: true });
}

export default main;
