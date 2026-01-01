import { watchAddToPlaylistMenu } from './utils/add-to-playlist-icons';

import './assets/css/styles.scss';
import { RootFolder } from './types/rootlist-contents.model';

async function main() {
   while (!Spicetify?.Platform?.RootlistAPI) {
      await new Promise(resolve => setTimeout(resolve, 100));
   }

   const playlistData = await Spicetify.Platform.RootlistAPI.getContents().then((res: RootFolder) => res.items.filter(item => item.type === 'playlist'));

   // Watch for context menu and add icons to it
   watchAddToPlaylistMenu(playlistData);
}

export default main;
