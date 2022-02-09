const data = [];


export default async function getAllPlaylistData(url: string, items: SpotifyApi.PlaylistObjectSimplified[] = []): Promise<SpotifyApi.PlaylistObjectSimplified[]> {
    const res: SpotifyApi.ListOfCurrentUsersPlaylistsResponse = await Spicetify.CosmosAsync.get(url);

    return [
        // ...items,
        ...res.items,
        ... !!res.next ? await getAllPlaylistData(res.next) : [],
    ];
}

// async function getPlaylistsPage(url: string, items: any[] = []): Promise<any[]> {
//     const res: SpotifyApi.ListOfCurrentUsersPlaylistsResponse = await Spicetify.CosmosAsync.get(url);

//     return [
//         ...items,
//         res.items,
//         ...[ !!res.next && await getPlaylistsPage(res.next) ],
//     ];


//     let items: any[];

//     const res: SpotifyApi.ListOfCurrentUsersPlaylistsResponse = await getPlaylistsPage('https://api.spotify.com/v1/me/playlists?limit=50');

//     getPlaylistsPage
// }