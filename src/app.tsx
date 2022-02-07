import getPlaylists from "./utils/get-playlist-links";

import { TEMP_DATA } from "./temp/TEMP_DATA";

async function main() {
  while (!Spicetify?.Platform || !Spicetify?.CosmosAsync) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // const res: SpotifyApi.ListOfCurrentUsersPlaylistsResponse = await Spicetify.CosmosAsync.get('https://api.spotify.com/v1/me/playlists?limit=50');
  const res: SpotifyApi.ListOfCurrentUsersPlaylistsResponse = TEMP_DATA;
  // console.log('thing', res)

  const playlistAnchors = await getPlaylists();
  console.log(playlistAnchors)

  Array.from(playlistAnchors).forEach(async (playlistAnchor, i) => {
    if (i === 2) {
      const id = playlistAnchor.href.split('/').at(-1);
      const type = playlistAnchor.href.split('/').at(-2);

      if (type === 'playlist') {
        const playlistData = res.items.find(playlist => playlist.id === id);
        
        const img = document.createElement('img');
        img.setAttribute('src', playlistData?.images[0].url as string); // Dirty
        img.style.width = '2em';
        img.style.height = 'auto';

        // TODO mutation observer or something. Gets derendered when out of view
        playlistAnchor.parentElement?.prepend(img);
        
        // const res = await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/playlists/${id}`);
        // console.log(res);
      }
    }
  });
}

export default main;
