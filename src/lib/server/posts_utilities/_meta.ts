import fs from "node:fs";
import path from "node:path";
import { dev } from "$app/environment"

const filename = "_meta.json"
const filepath = dev ? `static/${filename}` : `/${filename}`;
interface Columns {
    path: string,
    ctime: number,
    atime: number,
    mtime: number,
    birthtime: number
}
const cache: Columns[] = []

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
    fs.writeFileSync(filepath, JSON.stringify(list))
    return list
}
export function getMetadata(src: string) {
    if(!cache.length) {
        const data = fs.readFileSync(filepath, { encoding: "utf-8" })
        const list: Columns[] = JSON.parse(data)
        if(list.length) cache.push(...list)
        else cache.push(...store())
    }

    const srcPath = path.normalize(src)
    const mtdata = cache.find(c => path.normalize(c.path) === srcPath)
    if(!mtdata) throw new Error(`No saved metadata found for file "${path}"`)
    return mtdata
}