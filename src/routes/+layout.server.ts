import * as postMeta from "$lib/server/posts_utilities/_meta";
import { dev } from "$app/environment";

let saved = false;
if(!saved) {
    if(dev) {
        const list = postMeta.store()
        console.log("Saved Metadata:");
        console.log(JSON.stringify(list, undefined, 2));
    }
    saved = true
}