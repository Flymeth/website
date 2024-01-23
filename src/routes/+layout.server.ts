import * as postMeta from "$lib/server/posts_utilities/_meta";
import { dev } from "$app/environment";
import { timestamp } from "$lib/server/posts_utilities/_meta.json";

// in dev, store the meta each 5 minutes
if(dev && Date.now() - timestamp >= 5 * 60 * 1000) {
    const list = postMeta.store()
    console.log("Saved Metadata:");
    console.log(JSON.stringify(list, undefined, 2));
}