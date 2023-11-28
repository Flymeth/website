import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

export function pathName(meta: ImportMeta) {
    const __filename = fileURLToPath(meta.url)
    const __dirname = dirname(__filename)
    return {__filename, __dirname}
}