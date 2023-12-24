import MarkdownIt from "markdown-it";
import markdownItYamlPlugin from "markdown-it-meta-yaml";
import path from "node:path";
import hljs from "highlight.js";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { pathName } from "../location";

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
//? To open links in a new tab (from the MdIt docs)
parser.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // Add a new `target` attribute, or replace the value of the existing one.
    tokens[idx].attrSet('target', '_blank');

    // Pass the token to the default renderer.
    return self.renderToken(tokens, idx, options);
};

let tempMetadatas: Article["metadata"] | undefined = undefined;
parser.use(markdownItYamlPlugin, {
    cb: (json: Article["metadata"]) => tempMetadatas= json
})

export async function getArticles() {
    const articles = new Set<Article>()
    
    // Importing projects markdown files
    const files = import.meta.glob("../../../../posts/articles/*.md", {as: "raw", eager: true})
    console.log(files);
    
    const { __dirname } = pathName(import.meta)

    for(const filePath in files) {
        const raw = files[filePath] as string

        const filename = path.basename(filePath)
        const { birthtime, mtime } = fs.statSync(`./posts/articles/${filename}`)

        const md = raw.replace(
                /---(?:.|[\r\n])*^---/m, ""
        ).trim()
        const html = parser.render(raw)
        if(!tempMetadatas) continue
        
        tempMetadatas.file = filename
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