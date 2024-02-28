export default async function getAllPlaylistData(url: string): Promise<SpotifyApi.PlaylistObjectSimplified[]> {
   const res: SpotifyApi.ListOfCurrentUsersPlaylistsResponse = await Spicetify.CosmosAsync.get(url);

   return [
      ...res.items,
      ...(res.next ? await getAllPlaylistData(res.next) : []),
   ];
}
