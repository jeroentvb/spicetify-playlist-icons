import createPlaylistIconElement from './create-img';
import { createMutationObserver } from './create-mutation-observer';
import { renderFolderIcon } from './render-folder-icon';

const imgMap = new Map<string, HTMLImageElement | HTMLDivElement>();

export function watchAddToPlaylistMenu(playlistData: SpotifyApi.PlaylistObjectSimplified[]): void {
   const renderPlaylistIcons = (playlistElements: HTMLCollection) => {
      (Array.from(playlistElements) as HTMLLIElement[])
         .filter((liElement) => !liElement.classList.contains('add-to-playlist-item') && !liElement.querySelector('input'))
         .forEach((liElement) => {
            const isFolder = !!liElement.querySelector('button span svg');
            const titleElement = liElement.querySelector<HTMLSpanElement>('button span');

            if (isFolder) {
               renderFolderIcon(liElement, 'add-to-playlist-item__folder');
               liElement.classList.add('add-to-playlist-item');

               createMutationObserver(() => {
                  const nestedPlaylists = liElement.querySelector<HTMLLIElement>('ul[tabindex="-1"] > div');
                  if (!nestedPlaylists) return;

                  renderPlaylistIcons(nestedPlaylists.children);
               }, liElement);
            } else {
               const playlist = playlistData.find((playlist) => playlist.name === titleElement?.innerText);

               if (!playlist) return;

               const img = imgMap.get(playlist.id) ?? createPlaylistIconElement(playlist?.images[0]?.url as string || '', 'add-to-playlist-item__img');

               liElement.prepend(img);
               liElement.classList.add('add-to-playlist-item');

               !imgMap.has(playlist.id) && imgMap.set(playlist.id, img);
            }
         });
   };

   createMutationObserver(() => {
      const addToPlaylistElement: HTMLDivElement | null = document.querySelector('#context-menu ul[tabindex="-1"] > div');
      if (!addToPlaylistElement) return;

      renderPlaylistIcons(addToPlaylistElement.children);
   });
}
