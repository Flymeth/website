import { getProjects } from "$lib/server/posts_utilities/projects";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        projects: await getProjects()
    }
}