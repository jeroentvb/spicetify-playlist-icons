import createPlaylistIconElement from './create-img';
import getPlaylistAnchors from './get-playlist-links';

import { renderFolderIcon } from './render-folder-icon';

const imgMap = new Map<string, HTMLImageElement | HTMLDivElement>();

export async function renderPlaylistImages(items: SpotifyApi.PlaylistObjectSimplified[]) {
   const playlistAnchors = await getPlaylistAnchors();

   playlistAnchors.forEach((playlistAnchor) => {
      const id = playlistAnchor.href.split('/').at(-1) as string;
      const type = playlistAnchor.href.split('/').at(-2);
      const existingImg = imgMap.get(id);

      playlistAnchor.parentElement?.classList.add('playlist-item');

      if (existingImg) {
         playlistAnchor.parentElement?.prepend(existingImg);
         return;
      }

      switch (type) {
         case 'playlist': {
            const playlistData = items.find(playlist => playlist.id === id);
            const img = createPlaylistIconElement(playlistData?.images[0]?.url as string || '', 'playlist-item__img');

            playlistAnchor.parentElement?.prepend(img);

            imgMap.set(id, img);
            break;
         }
         case 'folder': {
            if (!playlistAnchor.parentElement) return;
            const iconWrapper = renderFolderIcon(playlistAnchor.parentElement, 'playlist-item__img', 'folder');

            imgMap.set(id, iconWrapper);
            break;
         }
         default: {
            console.warn(`[playlist-icons] playlist list anchor type not recognized: ${type}`);
         }
      }
   });
}

export async function deRenderPlaylistIcons() {
   Array.from(document.getElementsByClassName('playlist-item__img')).forEach(img => img.remove());
   Array.from(document.getElementsByClassName('playlist-item')).forEach(item => item.classList.remove('playlist-item'));
}
