import getAllPlaylistData from './utils/get-all-playlists';
import { watchAddToPlaylistMenu } from './utils/add-to-playlist-icons';

import './assets/css/styles.scss';
import { initLegacyMode } from './utils/init-legacy-mode';

async function main() {
   while (!Spicetify?.Platform || !Spicetify?.CosmosAsync) {
      await new Promise(resolve => setTimeout(resolve, 100));
   }

   const playlistData = await getAllPlaylistData('https://api.spotify.com/v1/me/playlists?limit=50');

   // Try to init legacy mode
   initLegacyMode(playlistData);

   // Watch for context menu and add icons to it
   watchAddToPlaylistMenu(playlistData);
}

export default main;
