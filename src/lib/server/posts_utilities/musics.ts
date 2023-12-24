import path from "node:path";
import fs from "node:fs";

export interface Music {
    metadata: {
        title: string,
        file: string,
        date: Date,
    },
    audio: HTMLAudioElement,
}
export function getMusics() {
    const musics = new Set<Music>()
    
    // Listing music files
    const files = fs.readdirSync("./posts/music")

    for(const filePath of files) {
        const filename = path.basename(filePath)
        const audio = new Audio(`./posts/music/${filename}`)
        const { birthtime } = fs.statSync(`./posts/music/${filename}`)
        const title = filename.replace(".mp3", "").split("_").join(" ")

        musics.add({
            metadata: {
                file: filename,
                date: birthtime,
                title
            }, audio
        })
    }

    return musics
}