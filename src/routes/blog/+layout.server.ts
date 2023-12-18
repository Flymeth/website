import { getArticles } from "$lib/server/articles/_utilities";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
    return {
        articles: await getArticles()
    }
}