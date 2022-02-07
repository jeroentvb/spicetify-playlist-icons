export interface IPlaylist {
    collaborative: boolean;
    description: string;
    external_urls: { spotify: string };
    href: string;
    id: string;
    images: IPlaylistImage[];
    name: string;
    owner: {
        display_name: string;
        external_urls: { spotify: string };
        href: string;
        id: string;
        type: string;
        uri: string;
    }
    primary_color: null
    public: boolean;
    snapshot_id: string;
    tracks: { href: string, total: number };
    type: string;
    uri: string;
    sharing_info?: {
        share_id: string;
        share_url: string;
        uri: string;
    },
}

export interface IPlaylistImage {
    height: number | null;
    url: string;
    width: number | null;
}