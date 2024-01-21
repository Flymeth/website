import path from "node:path";
import parseMarkdown from "../mdParser";

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
        codesandbox?: string,
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

export async function getProjects() {
    const projects = new Set<Project>()
    
    // Importing projects markdown files
    const files = import.meta.glob("../../../../posts/projects/*.md", {as: "raw", eager: true})
    for(const name in files) {
        const raw = files[name] as string
        const { parsed, meta } = parseMarkdown<Project["metadata"]>(raw)
        if(!meta.metadata) continue
        
        meta.metadata.file = path.basename(name)
        projects.add({
            metadata: meta.metadata, 
            content: parsed
        })
    }

    return projects
}