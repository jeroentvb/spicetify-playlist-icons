import { LEGACY_MODE_KEY, LS_BIG_ICONS_KEY } from '../constants';
import { createMutationObserver } from './create-mutation-observer';
import { getElement } from './get-playlist-links';
import { deRenderPlaylistIcons, renderPlaylistImages } from './render-playlist-images';

export async function initLegacyMode(playlistData: SpotifyApi.PlaylistObjectSimplified[]): Promise<void> {
   let legacyMode: boolean = JSON.parse(localStorage.getItem(LEGACY_MODE_KEY) as string) ?? false;
   const showBigIcons: boolean = JSON.parse(localStorage.getItem(LS_BIG_ICONS_KEY) as string) ?? false;

   try {
      const playlistElement = await getElement('#spicetify-playlist-list');

      let observer: MutationObserver | undefined;
      const initPlaylistWatcher = () => {
         renderPlaylistImages(playlistData);
         observer = createMutationObserver(() => renderPlaylistImages(playlistData));
      };

      if (legacyMode) initPlaylistWatcher();
      if (showBigIcons) playlistElement.classList.add('big-icons');

      /**
      * Menu item to toggle big icons
      */
      new Spicetify.Menu.SubMenu('Playlist Icons', [
         new Spicetify.Menu.Item('Legacy mode', legacyMode, (menu: Spicetify.Menu.Item) => {
            menu.setState(!menu.isEnabled);
            localStorage.setItem(LEGACY_MODE_KEY, JSON.stringify(!legacyMode));
            legacyMode = !legacyMode;
            if (legacyMode) {
               initPlaylistWatcher();
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
   } catch(err) {
      console.log('[Playlist icons] Legacy mode can not be enabled');
   }
}