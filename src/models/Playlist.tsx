import Nullable from '../helpers/Nullable';

type Playlist = {
    collaborative: boolean;
    description?: string;
    external_urls: {
        spotify: string
    };
    followers: {
        href: Nullable<string>,
        total: number
    };
    href: string;
    id: string;
    images: {
        url: string
    }[];
    name: string;
    owner: {
        external_urls: {
            spotify: string
        },
        href: string,
        id: string,
        type: string,
        uri: string
    };
    public: Nullable<boolean>;
    snapshot_id: string;
    tracks: {
        href: string,
        items: {
            added_at: string,
            added_by: {
                external_urls: {
                    spotify: string
                },
                href: string,
                id: string,
                type: string,
                uri: string
            },
            is_local: boolean,
            track: {
                album: {
                    album_type: string,
                    available_markets: string[],
                    external_urls: {
                        spotify: string
                    },
                    href: string,
                    id: string,
                    images: {
                        height: number,
                        url: string,
                        width: number
                    }[],
                    name: string,
                    type: string,
                    uri: string
                },
                artists: {
                    external_urls: {
                        spotify: string
                    },
                    href: string,
                    id: string,
                    name: string,
                    type: string,
                    uri: string
                }[],
                available_markets: string[],
                disc_number: number,
                duration_ms: number,
                explicit: boolean,
                external_ids: {
                    isrc: string
                },
                external_urls: {
                    spotify: string
                }
                href: string,
                id: string,
                name: string,
                popularity: number,
                preview_url: string,
                track_number: number,
                type: string,
                uri: string
            }
        }[],
        limit: number,
        next: string,
        offset: number,
        previous: Nullable<string>,
        total: number
    },
    type: string,
    uri: string
}

export default Playlist;