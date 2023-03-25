import { renderPlaylistImages } from './utils/render-playlist-images';
import getAllPlaylistData from './utils/get-all-playlists';
import { getElement } from './utils/get-playlist-links';
import { LS_BIG_ICONS_KEY } from './constants';

import './assets/css/styles.scss';

async function main() {
   while (!Spicetify?.Platform || !Spicetify?.CosmosAsync) {
      await new Promise(resolve => setTimeout(resolve, 100));
   }

   /**
   * Setup, get elements and data
   */
   const showBigIcons: boolean = JSON.parse(localStorage.getItem(LS_BIG_ICONS_KEY) as string) ?? false;

   const playlistData = await getAllPlaylistData('https://api.spotify.com/v1/me/playlists?limit=50');

   const playlistElement = await getElement('#spicetify-playlist-list');

   const observer = new MutationObserver(async () => {
      // Needed to prevent an infinite looooooooooooooooooooooooooooooooooooooooooooooop
      observer.disconnect();
      await renderPlaylistImages(playlistData);
      observer.observe(playlistElement, { childList: true, subtree: true });
   });

   /**
   * Init
   */
   await renderPlaylistImages(playlistData);
   observer.observe(playlistElement, { childList: true, subtree: true });
   if (showBigIcons) playlistElement.classList.add('big-icons');

   /**
   * Menu item to toggle big icons
   */
   new Spicetify.Menu.Item('Big playlist icons', showBigIcons, (menu: Spicetify.Menu.Item) => {
      menu.setState(!menu.isEnabled);
      localStorage.setItem(LS_BIG_ICONS_KEY, JSON.stringify(!showBigIcons));
      playlistElement.classList.toggle('big-icons');
   }).register();
}

export default main;
