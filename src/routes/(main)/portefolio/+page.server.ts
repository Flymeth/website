import { getProjects } from "$lib/server/posts_utilities/projects";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
    return {
        projects: getProjects()
    }
}