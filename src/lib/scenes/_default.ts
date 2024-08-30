import * as three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ViewHelper } from "three/examples/jsm/helpers/ViewHelper";

export default class Scene<UseOrbitHelper = false, UseGridHelper = false> {
	readonly scene = new three.Scene();
	readonly camera = new three.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight
	);
	readonly renderer = new three.WebGLRenderer({
		alpha: true,
		antialias: true,
	});
	readonly objects: { [key: string]: three.Object3D } = {};
	private animationStarted = false;
	private forceStop = false;
	readonly orbit: UseOrbitHelper extends true ? OrbitControls : null;
	readonly grid: UseGridHelper extends true ? ViewHelper : null;

	/**
	 * @param fps Force the fps rate. Set bellow 0 to use the requestAnimationFrame method (default to `-1`)
	 * @returns
	 */
	static animate(scene: Scene, fps: number = -1) {
		if (scene.animationStarted) return;
		let interval: NodeJS.Timer;

		const looper = () => {
			if (scene.forceStop) {
				if (interval) clearInterval(interval);
				scene.forceStop = false;
				scene.animationStarted = false;
				return;
			}

			if (fps < 0) requestAnimationFrame(looper);
			scene.frame();
		};

		if (fps >= 0) interval = setInterval(looper, 1000 / fps);
		looper();
		scene.animationStarted = true;
	}
	static stopAnimation(scene: Scene) {
		if (scene.animationStarted) scene.forceStop = true;
	}

	constructor(
		useOrbitHelper?: UseOrbitHelper,
		useGridHelper?: UseGridHelper
	) {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		window.addEventListener("resize", () => {
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
		});

		this.orbit = (
			useOrbitHelper
				? new OrbitControls(this.camera, this.renderer.domElement)
				: null
		) as typeof this.orbit;
		this.grid = (
			useGridHelper ? new three.GridHelper(100, 10) : null
		) as typeof this.grid;
		if (this.grid) this.scene.add(this.grid);
	}

	getViewSize(at: { point: three.Vector3 } | { distance: number }) {
		let distance: number;
		if ("point" in at) distance = at.point.distanceTo(this.camera.position);
		else ({ distance } = at);

		const target = new three.Vector2();
		this.camera.getViewSize(distance, target);
		const { x, y } = target;
		return {
			width: x,
			height: y,
		};
	}

	frame(): void {}
	async load(): Promise<void> {}
	doEntrance?(): void {}
}
