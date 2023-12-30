import path from "node:path";
import fs from "node:fs";

export interface Music {
    metadata: {
        title: string,
        file: string,
        date: Date,
    },
    audioSrc: string,
}
export function getMusics() {
    const musics = new Set<Music>()
    
    // Listing music files
    const files = fs.readdirSync("./posts/music")

    for(const filePath of files) {
        const filename = path.basename(filePath)
        const audioSrc = `/posts/music/${filename}`
        const { birthtime } = fs.statSync(`./posts/music/${filename}`)
        const title = filename.replace(".mp3", "").split("_").join(" ")

        musics.add({
            metadata: {
                file: filename,
                date: birthtime,
                title
            }, audioSrc
        })
    }

    return musics
}