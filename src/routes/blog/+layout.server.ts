import { getArticles } from "$lib/server/posts_utilities/articles";
import type { LayoutServerLoad } from "./$types";
import thumbnails from "$lib/assets/data/blogs-images.json";

export const load: LayoutServerLoad = async () => {
	return {
		articles: await getArticles(),
		thumbnail: thumbnails[Math.floor(Math.random() * thumbnails.length)],
	};
};
