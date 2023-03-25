const data = [];


export default async function getAllPlaylistData(url: string, items: SpotifyApi.PlaylistObjectSimplified[] = []): Promise<SpotifyApi.PlaylistObjectSimplified[]> {
   const res: SpotifyApi.ListOfCurrentUsersPlaylistsResponse = await Spicetify.CosmosAsync.get(url);

   return [
      ...res.items,
      ...(res.next ? await getAllPlaylistData(res.next) : []),
   ];
}
