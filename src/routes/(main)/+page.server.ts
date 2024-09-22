import { getProjects } from "$lib/server/posts_utilities/projects";

const showOfProjects: string[] = ["rework-akaru", "chessguez"];
export const load = async () => {
  return {
    showOfProjects: Array.from(getProjects()).filter((project) =>
      showOfProjects.includes(project.metadata.id)
    ),
  };
};
