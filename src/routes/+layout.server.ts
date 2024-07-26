import * as postMeta from "$lib/server/posts_utilities/_meta";
import { dev } from "$app/environment";
import { timestamp } from "$lib/server/posts_utilities/_meta.json";
import type { ServerLoad } from "@sveltejs/kit";

export let load: ServerLoad = () => {
    // in dev, store the meta each 5 minutes
    if(dev && Date.now() - timestamp >= 5 * 60 * 1000) {
        postMeta.store()
        console.log("Metadata saved!");
    }
}
