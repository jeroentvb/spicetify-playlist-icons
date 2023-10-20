import { deRenderPlaylistIcons, renderPlaylistImages } from './utils/render-playlist-images';
import getAllPlaylistData from './utils/get-all-playlists';
import { getElement } from './utils/get-playlist-links';
import { LEGACY_MODE_KEY, LS_BIG_ICONS_KEY } from './constants';
import { watchAddToPlaylistMenu } from './utils/add-to-playlist-icons';

import './assets/css/styles.scss';
import { createMutationObserver } from './utils/create-mutation-observer';

async function main() {
   while (!Spicetify?.Platform || !Spicetify?.CosmosAsync) {
      await new Promise(resolve => setTimeout(resolve, 100));
   }

   /**
   * Setup, get elements and data
   */
   const showBigIcons: boolean = JSON.parse(localStorage.getItem(LS_BIG_ICONS_KEY) as string) ?? false;

   let legacyMode: boolean = JSON.parse(localStorage.getItem(LEGACY_MODE_KEY) as string) ?? false;

   const playlistData = await getAllPlaylistData('https://api.spotify.com/v1/me/playlists?limit=50');

   const playlistElement = await getElement('#spicetify-playlist-list');

   let observer: MutationObserver | undefined;
   const initPlaylistWatcher = () => {
      renderPlaylistImages(playlistData);
      observer = createMutationObserver(() => renderPlaylistImages(playlistData));
   }

   /**
   * Init
   */
   if (legacyMode) initPlaylistWatcher()
   if (showBigIcons) playlistElement.classList.add('big-icons');

   // Watch for context menu and add icons to it
   watchAddToPlaylistMenu(playlistData);

   /**
   * Menu item to toggle big icons
   */
   new Spicetify.Menu.SubMenu('Playlist Icons', [
      new Spicetify.Menu.Item('Legacy mode', legacyMode, (menu: Spicetify.Menu.Item) => {
         menu.setState(!menu.isEnabled);
         localStorage.setItem(LEGACY_MODE_KEY, JSON.stringify(!legacyMode));
         legacyMode = !legacyMode;
         if (legacyMode) {
            initPlaylistWatcher()
         } else {
            observer?.disconnect();
            observer = undefined;
            deRenderPlaylistIcons();
         }
      }),
      new Spicetify.Menu.Item('Big playlist icons', showBigIcons, (menu: Spicetify.Menu.Item) => {
         menu.setState(!menu.isEnabled);
         localStorage.setItem(LS_BIG_ICONS_KEY, JSON.stringify(!showBigIcons));
         playlistElement.classList.toggle('big-icons');
      })
   ]).register();
}

export default main;
