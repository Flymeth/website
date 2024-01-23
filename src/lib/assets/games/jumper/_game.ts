export default class Jumper {
    readonly canva: HTMLCanvasElement
    readonly ctx: CanvasRenderingContext2D
    private assetsLoaded = false
    state: "playing" | `menu_${number}` | "settings" | "about"

    constructor(canva: HTMLCanvasElement) {
        this.canva= canva
        const context = canva.getContext("2d")
        if(!context) throw new Error("Invalid context has been generated.")
        this.ctx = context

        this.state= "menu_0"
    }

    async loadAssets() {

        this.assetsLoaded= true
    }
    launch() {
        if(!this.assetsLoaded) throw new Error("The assets has not been loaded.")

    }
}