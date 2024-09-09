import path from "node:path";
import fs from "node:fs";
import type { TableOfContent } from "../mdParser";
import parseMarkdown from "../mdParser";
import { getMetadata } from "./_meta";

export interface Article {
	metadata: {
		title: string;
		description: string;
		file: string;
		id: string;
		ressources: string[];
		category: string;
		tags: string[];
		time: {
			created: Date;
			edited: Date;
		};
		coverURL?: string;
	};
	toc: TableOfContent;
	content: {
		md: string;
		html: string;
		raw: string;
	};
}

export async function getArticles() {
	const articles = new Set<Article>();

	// Importing projects markdown files
	const files = import.meta.glob("../../../../posts/articles/*.md", {
		query: "?raw",
		eager: true,
		import: "default"
	});
	for (const filePath in files) {
		const raw = files[filePath] as string;
		const { parsed, meta } = parseMarkdown<Article["metadata"]>(raw);
		if (!(meta.metadata && meta.toc)) continue;

		const filename = path.basename(filePath);
		const { birthtime, mtime } = getMetadata(
			`./posts/articles/${filename}`
		);
		meta.metadata.file = filename;
		meta.metadata.time = {
			created: new Date(birthtime),
			edited: new Date(mtime),
		};
		meta.metadata.id = meta.metadata.file.replace(".md", "");
		articles.add({
			metadata: meta.metadata,
			toc: meta.toc,
			content: parsed,
		});
	}

	return articles;
}
