import { watchAddToPlaylistMenu } from './utils/add-to-playlist-icons';

import './assets/css/styles.scss';
import { Playlist, RootFolder, TreeItem } from './types/rootlist-contents.model';

function flattenPlaylists(items: TreeItem[]): Playlist[] {
   return items.flatMap(item => item.type === 'folder' ? flattenPlaylists(item.items) : [item]);
}

async function main() {
   while (!Spicetify?.Platform?.RootlistAPI) {
      await new Promise(resolve => setTimeout(resolve, 100));
   }

   const playlistData = await Spicetify.Platform.RootlistAPI.getContents().then((res: RootFolder) => flattenPlaylists(res.items));

   // Watch for context menu and add icons to it
   watchAddToPlaylistMenu(playlistData);
}

export default main;
