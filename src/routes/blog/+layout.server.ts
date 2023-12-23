import { getArticles } from "$lib/server/posts_utilities/articles";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
    return {
        articles: await getArticles()
    }
}