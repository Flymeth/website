export interface Experience {
	title: string;
	description: string;
	date: Date | [Date, Date];
	skills: string[];
	links: {
		[key: string]: string;
	};
	document?: string;
}

export async function getExperiences() {
	const glob = import.meta.glob<string>(
		"../../../../posts/experiences/*.json",
		{
			as: "raw",
			eager: true,
		}
	);

	const experiences: Experience[] = [];
	for (const file in glob) {
		const exp = JSON.parse(glob[file]);
		experiences.push({
			...exp,
			date:
				exp.date instanceof Array
					? exp.date.map((d: number) => new Date(d))
					: new Date(exp.date),
		});
	}

	return experiences;
}
