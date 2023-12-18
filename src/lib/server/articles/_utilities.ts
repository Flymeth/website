import MarkdownIt from "markdown-it";
import markdownItYamlPlugin from "markdown-it-meta-yaml";
import path from "node:path";
import hljs from "highlight.js";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

export interface Article {
    metadata: {
        title: string,
        description: string,
        file: string,
        id: string,
        time: {
            created: Date,
            edited: Date
        },
        bannerURL?: string,
    },
    content: {
        md: string,
        html: string,
        raw: string
    }
}
const parser = new MarkdownIt({
    // ? From the MdIt doc
    highlight: (code, language) => {
        if (language && hljs.getLanguage(language)) {
          try {
            return hljs.highlight(code, { language }).value;
          } catch (__) {}
        }
    
        return ''; // use external default escaping
    }
})
let tempMetadatas: Article["metadata"] | undefined = undefined;
parser.use(markdownItYamlPlugin, {
    cb: (json: Article["metadata"]) => tempMetadatas= json
})

export async function getArticles() {
    const articles = new Set<Article>()
    
    // Importing projects markdown files
    const files = import.meta.glob("./*.md", {as: "raw", eager: true})
    const dirname = path.dirname(fileURLToPath(import.meta.url))
    for(const name in files) {
        const raw = files[name] as string

        const { birthtime, mtime } = fs.statSync(path.join(dirname, name))

        const md = raw.replace(
            /---(?:.|[\r\n])*^---/m, ""
        ).trim()
        const html = parser.render(raw)
        if(!tempMetadatas) continue
        
        tempMetadatas.file = path.basename(name)
        tempMetadatas.time = {
            created: birthtime,
            edited: mtime
        }
        tempMetadatas.id = tempMetadatas.file.replace(".md", "")
        articles.add({
            metadata: tempMetadatas, content: { raw, md, html }
        })
        tempMetadatas= undefined
    }

    return articles
}