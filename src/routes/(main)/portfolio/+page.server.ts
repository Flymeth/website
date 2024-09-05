import { getProjects } from "$lib/server/posts_utilities/projects";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  const projects = Array.from(await getProjects());
  const activeProjectName = url.searchParams.get("open");

  const activeProjectIndex =
    typeof activeProjectName === "string"
      ? projects.findIndex(
          (p) =>
            p.metadata.name.toLowerCase() === activeProjectName.toLowerCase()
        )
      : -1;
  return {
    projects,
    preopen: activeProjectIndex >= 0 ? activeProjectIndex : null,
  };
};
