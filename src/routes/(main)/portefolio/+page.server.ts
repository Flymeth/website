import { getProjects } from "$lib/server/projects/_utilities";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
    return {
        projects: getProjects()
    }
}