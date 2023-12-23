import { error } from "@sveltejs/kit";
import { getArticles } from "$lib/server/posts_utilities/articles";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const article = Array.from(await getArticles()).find(a => a.metadata.id === params.article_id)
    if(!article) throw error(404, {message: `The article "${params.article_id}" has not been found.`})

    return { article }
}