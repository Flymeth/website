import fs from "node:fs";
import path from "node:path";
import metadata from "./_meta.json";
import { pathName } from "../location";

interface Columns {
    path: string,
    ctime: number,
    atime: number,
    mtime: number,
    birthtime: number
}
export function store() {
    function getTree(dir?: string): Map<string, fs.Stats> {
        const folder = path.join(dir || "./posts")
        const filesAndFolders = fs.readdirSync(folder)

        const map = new Map<string, fs.Stats>()
        for(const element of filesAndFolders) {
            const elementPath = path.join(folder, element)
            const stat = fs.statSync(elementPath)
            if(stat.isDirectory()) {
                const tree = getTree(elementPath)
                Array.from(tree).forEach(([p, v]) => map.set(p, v))
            }else map.set(elementPath, stat)
        }

        return map
    }

    const tree = getTree()
    const list: Columns[] = []
    for(const [location, stats] of Array.from(tree)) {
        const row: {[key in keyof Columns]: Columns[key]} = {
            path: location,
            atime: stats.atime.getTime(),
            ctime: stats.ctime.getTime(),
            mtime: stats.mtime.getTime(),
            birthtime: stats.birthtime.getTime()
        }

        list.push(row)
    }
    const { __dirname } = pathName(import.meta)
    const outputPath = path.join(__dirname, "_meta.json")
    const output = JSON.stringify(list)
    fs.writeFileSync(outputPath, output)
    return list
}
export function getMetadata(src: string): Columns {
    const srcPath = path.normalize(src)
    console.log(metadata);
    
    console.log(srcPath, src);
    

    const mtdata = metadata.find(c => path.normalize(c.path) === srcPath)
    return mtdata || {
        atime: 0,
        birthtime: 0,
        ctime: 0,
        mtime: 0,
        path: src
    }
}