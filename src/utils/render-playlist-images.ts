import createPlaylistIconElement from "./create-img";
import getPlaylistAnchors from "./get-playlist-links";

const imgMap = new Map<string, HTMLImageElement | HTMLDivElement>();

export default async function renderPlaylistImages(items: SpotifyApi.PlaylistObjectSimplified[]) {
    const playlistAnchors = await getPlaylistAnchors();

    playlistAnchors.forEach((playlistAnchor) => {
        const id = playlistAnchor.href.split('/').at(-1)!;
        const type = playlistAnchor.href.split('/').at(-2);
        const existingImg = imgMap.get(id);

        playlistAnchor.parentElement?.classList.add('playlist-item');

        if (existingImg) {
            playlistAnchor.parentElement?.prepend(existingImg);
            return
        }

        switch (type) {
            case 'playlist': {
                const playlistData = items.find(playlist => playlist.id === id);
                const img = createPlaylistIconElement(playlistData?.images[0]?.url as string || '');

                playlistAnchor.parentElement?.prepend(img);

                imgMap.set(id, img);
                break;
            }
            case 'folder': {
                const img = createPlaylistIconElement('http://127.0.0.1:5500/folder_white_24dp.svg');
                img.classList.add('folder');

                playlistAnchor.parentElement?.prepend(img);

                imgMap.set(id, img);
                break;
            }
            default: {
                console.warn(`[playlist-icons] playlist list anchor type not recognized: ${type}`);
            }
        }
    });
}
