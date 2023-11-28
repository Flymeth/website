import path from "node:path";
import fs from "node:fs";
import MarkdownIt from "markdown-it";
import markdownItYamlPlugin from "markdown-it-meta-yaml";
import { pathName } from "../location";

export interface Project {
    metadata: {
        name: string,
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
const filesFolder = pathName(import.meta).__dirname

const parser = new MarkdownIt({

})
let tempMetadatas: Project["metadata"] | undefined = undefined;
parser.use(markdownItYamlPlugin, {
    cb: (json: Project["metadata"]) => tempMetadatas= json
})

export function getProjects() {
    const projects = new Set<Project>()
    
    const filesList = fs.readdirSync(filesFolder).filter(file => file.endsWith(".md"))
    for(const fileName of filesList) {
        const raw = fs.readFileSync(path.join(filesFolder, fileName), {encoding: "utf-8"})
        const md = raw.replace(
            /---(?:.|[\r\n])*^---/m, ""
        ).trim()
        const html = parser.render(raw)
        if(!tempMetadatas) continue

        projects.add({
            metadata: tempMetadatas, content: { raw, md, html }
        })
        tempMetadatas= undefined
    }

    return projects
}