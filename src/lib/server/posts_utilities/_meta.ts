import fs from "node:fs";
import path from "node:path";
import metadata from "./_meta.json";
import { pathName } from "../location";

interface Columns {
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
    const meta: {[key: string]: Columns} = {}
    for(const [location, stats] of Array.from(tree)) {
        meta[path.win32.normalize(location)] = {
            atime: stats.atime.getTime(),
            ctime: stats.ctime.getTime(),
            mtime: stats.mtime.getTime(),
            birthtime: stats.birthtime.getTime()
        }
    }
    const { __dirname } = pathName(import.meta)
    const outputPath = path.join(__dirname, "_meta.json")
    const output = JSON.stringify({
        timestamp: Date.now(),
        meta
    })
    fs.writeFileSync(outputPath, output)
    return meta
}
export function getMetadata(src: string): Columns {
    src = path.win32.normalize(src)

    //@ts-ignore
    if(src in metadata.meta) return metadata.meta[src]
    else return {
        atime: 0,
        birthtime: 0,
        ctime: 0,
        mtime: 0,
    }
}