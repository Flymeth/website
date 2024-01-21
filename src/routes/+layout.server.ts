import * as postMeta from "$lib/server/posts_utilities/_meta";
import { dev } from "$app/environment";
import { get, writable } from "svelte/store";

// const saved = writable(false);
// if(!get(saved)) {
//     if(dev) {
//         const list = postMeta.store()
//         console.log("Saved Metadata:");
//         console.log(JSON.stringify(list, undefined, 2));
//     }
//     saved.set(true)
// }