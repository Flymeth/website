import { getMusics } from "$lib/server/posts_utilities/musics";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = () => {
    const musics = getMusics()
    console.log(musics);
    
    return {
        musics
    }
}