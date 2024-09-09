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
type ExperienceJSONFile = Omit<Experience, "date"> & {
  date: number | [number, number];
};

export async function getExperiences() {
  const glob = import.meta.glob<string>(
    "../../../../posts/experiences/*.json",
    {
      eager: true,
      query: "?raw",
      import: "default",
    }
  );
  const experiences: Experience[] = [];
  for (const file in glob) {
    const exp: ExperienceJSONFile = JSON.parse(glob[file]);
    experiences.push({
      ...exp,
      date:
        exp.date instanceof Array
          ? (exp.date.map((d: number) => new Date(d)) as [Date, Date])
          : new Date(exp.date),
    });
  }

  return experiences;
}
