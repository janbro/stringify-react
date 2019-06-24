import Nullable from '../helpers/Nullable';

type Song = {
    token?: Nullable<string>;
    item: {
        album: {
            images: {
                url: string | undefined;
            }[];
        };
        duration_ms: number;
        name: React.ReactNode;
        artists: {
            name: React.ReactNode;
        }[];
    };
    progress_ms: number;
    is_playing: any;
}

export default Song;