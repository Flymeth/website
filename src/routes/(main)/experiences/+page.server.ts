import { getExperiences } from "$lib/server/posts_utilities/experiences";

export const load = async () => {
	return {
		experiences: await getExperiences(),
	};
};
