import MarkdownIt from "markdown-it";
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
        link?: string,
    },
    content: {
        md: string,
        html: string,
        raw: string
    }
}
const parser = new MarkdownIt({

})
let tempMetadatas: Project["metadata"] | undefined = undefined;
parser.use(markdownItYamlPlugin, {
    cb: (json: Project["metadata"]) => tempMetadatas= json
})

export async function getProjects() {
    const projects = new Set<Project>()
    
    // Importing projects markdown files
    const files = import.meta.glob("./*.md", {as: "raw", eager: true})
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