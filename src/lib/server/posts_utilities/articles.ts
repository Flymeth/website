import MarkdownIt from "markdown-it";
import markdownItTocDoneRight from "markdown-it-toc-done-right";
import markdownItYamlPlugin from "markdown-it-meta-yaml";
import markdownItAnchors from "markdown-it-anchor";
import markdownItAttrs from "markdown-it-attrs";
import path from "node:path";
import hljs from "highlight.js";
import fs from "node:fs";

export interface navigation {
    title: string,
    level: number,
    link: string
}
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
    toc: navigation[],
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
    },
    linkify: true,
})
//? To open links in a new tab (from the MdIt docs)
parser.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // Add a new `target` attribute, or replace the value of the existing one.
    tokens[idx].attrSet('target', '_blank');

    // Pass the token to the default renderer.
    return self.renderToken(tokens, idx, options);
};

let tempMetadatas: Article["metadata"] | undefined = undefined;
let tempTOC: Article["toc"] | undefined = undefined;
parser.use(markdownItYamlPlugin, {
    cb: (json: Article["metadata"]) => tempMetadatas= json
}).use(markdownItAnchors, {
    permalinks: true
}).use(markdownItTocDoneRight, {
    callback(tocCode, ast) {
        tempTOC = []
        function parse(infos: typeof ast) {
            if(infos.l) tempTOC?.push({
                level: infos.l,
                title: infos.n,
                link: encodeURI(`#${infos.n.toLowerCase().split(" ").join("-")}`)
            })
            if(infos.c.length) infos.c.forEach(sub => parse(sub))
        }
        
        parse(ast)
    },
}).use(markdownItAttrs)

export async function getArticles() {
    const articles = new Set<Article>()
    
    // Importing projects markdown files
    const files = import.meta.glob("../../../../posts/articles/*.md", {as: "raw", eager: true})
    for(const filePath in files) {
        const raw = files[filePath] as string

        const md = raw.replace(
                /---(?:.|[\r\n])*^---/m, ""
        ).trim()

        const html = parser.render(raw)
        if(!(tempMetadatas && tempTOC)) continue
        
        const filename = path.basename(filePath)
        const { birthtime, mtime } = fs.statSync(`./posts/articles/${filename}`)
        tempMetadatas.file = filename
        tempMetadatas.time = {
            created: birthtime,
            edited: mtime
        }
        tempMetadatas.id = tempMetadatas.file.replace(".md", "")
        articles.add({
            metadata: tempMetadatas, content: { raw, md, html }, toc: tempTOC
        })
        tempMetadatas= tempTOC= undefined
    }

    return articles
}