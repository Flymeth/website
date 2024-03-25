import * as three from "three";

export default class Scene {
	readonly scene = new three.Scene()
	readonly camera = new three.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight
	)
	readonly renderer = new three.WebGLRenderer({ alpha: true, antialias: true });
	readonly objects: {[key: string]: three.Object3D } = {}
	private animationStarted = false
	private forceStop = false

	static animate(scene: Scene) {
		if(scene.animationStarted) return
		scene.animationStarted = true
		const looper = () => {
			if(scene.forceStop) {
				scene.forceStop= false
				scene.animationStarted= false
				return
			}

			requestAnimationFrame(looper);
			scene.frame();
		}
		looper();
	}
	static stopAnimation(scene: Scene) {
		if(scene.animationStarted) scene.forceStop = true
	}

	constructor() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		window.addEventListener("resize", () => {
			this.renderer.setSize(window.innerWidth, window.innerHeight)
			this.camera.aspect= window.innerWidth / window.innerHeight
			this.camera.updateProjectionMatrix()
		})
	}

	frame(): void {  }
	async load(): Promise<void> {  }
	doEntrance?(): void {}
}