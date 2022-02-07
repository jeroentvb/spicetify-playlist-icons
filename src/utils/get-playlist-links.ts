export default function getPlaylists(): Promise<NodeListOf<HTMLAnchorElement>> {
    return new Promise(resolve => {
        const elementExists = setInterval(() => {
            const playLists = document.querySelectorAll<HTMLAnchorElement>('#spicetify-playlist-list li a');

            if (playLists.length > 0) {
                clearInterval(elementExists);
                resolve(playLists);
            }
        }, 100);
    })
}
