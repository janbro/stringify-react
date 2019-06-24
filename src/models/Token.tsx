import { ReactNode } from "react";

type Token = {
    item: {
        album: {
            images: {
                url: string | undefined;
            }[];
        };
        duration_ms: number;
        name: ReactNode;
        artists: {
            name: ReactNode;
        }[];
    };
    is_playing: any;
    access_token?: string;
    token?: string;
}

export default Token;
