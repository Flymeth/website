import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItYamlPlugin from "markdown-it-meta-yaml";
import path from "node:path";

export interface Project {
    metadata: {
        name: string,
        file: string,
        description: string,
        iconURL?: string,
        bannerURL?: string,
        github?: string,
        prototype?: string,
        link?: string,
        csb?: string,
        codepen?: string,
        stackoverflow?: string,
        discord?: string
    },
    content: {
        md: string,
        html: string,
        raw: string
    }
}
const parser = new MarkdownIt({
    //? From the MdIt docs
    highlight: (code, language) => {
        if (language && hljs.getLanguage(language)) {
          try {
            return hljs.highlight(code, { language }).value;
          } catch (__) {}
        }
    
        return ''; // use external default escaping
    },
})
//? To open links in a new tab (from the MdIt docs)
parser.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // Add a new `target` attribute, or replace the value of the existing one.
    tokens[idx].attrSet('target', '_blank');

    // Pass the token to the default renderer.
    return self.renderToken(tokens, idx, options);
};

let tempMetadatas: Project["metadata"] | undefined = undefined;
parser.use(markdownItYamlPlugin, {
    cb: (json: Project["metadata"]) => tempMetadatas= json
}).use(markdownItAttrs)

export async function getProjects() {
    const projects = new Set<Project>()
    
    // Importing projects markdown files
    const files = import.meta.glob("../../../../posts/projects/*.md", {as: "raw", eager: true})
    for(const name in files) {
        const raw = files[name] as string

        const md = raw.replace(
            /---(?:.|[\r\n])*^---/m, ""
        ).trim()
        const html = parser.render(raw)
        if(!tempMetadatas) continue
        
        tempMetadatas.file = path.basename(name)
        projects.add({
            metadata: tempMetadatas, content: { raw, md, html }
        })
        tempMetadatas= undefined
    }

    return projects
}