import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Scene from "./_default";
import { AmbientLight, Vector3 } from "three";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { degToRad } from "three/src/math/MathUtils.js";

gsap.registerPlugin(ScrollTrigger);

export class IndexScene extends Scene {
	private loaded = false;
	// private orbit: OrbitControls;
	constructor() {
		super();
		// this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
	}

	frame(): void {
		this.renderer.render(this.scene, this.camera);
	}

	doEntrance() {
		const screen = this.objects["laptop"]?.getObjectByName("Display");
		if (!screen) throw new Error("The laptop has no screen.");

		gsap.fromTo(
			screen.rotation,
			{
				x: degToRad(191),
			},
			{
				x: degToRad(67.5),
				ease: "power4.inOut",
				duration: 1.5,
			}
		);
	}

	loadGsapAnimation() {
		const laptop = this.objects["laptop"];
		if (!laptop) throw new Error("Laptop object not found.");
		const laptopScaleFactor = 10;
		laptop.scale.setScalar(laptopScaleFactor);
		laptop.rotation.set(degToRad(25), degToRad(-15), degToRad(0));
		this.camera.position.add(new Vector3(0, 0, 4.5));
		this.camera.lookAt(laptop.position);

		const laptopVS = this.getViewSize({ point: laptop.position });
		laptop.position.add(
			new Vector3(laptopVS.width / 25, -laptopVS.height / 5)
		);

		const screen = laptop.getObjectByName("Display");
		if (!screen) throw new Error("The laptop has no screen.");

		const tlLaptop = gsap.timeline({
			scrollTrigger: {
				trigger: "header",
				start: "top top",
				end: "bottom top",
				scrub: 2,
			},
			defaults: {
				ease: "power1.inOut",
			},
		});
		tlLaptop.fromTo(
			screen.rotation,
			{
				x: degToRad(67.5),
			},
			{
				x: degToRad(191),
			}
		);

		tlLaptop.to(
			laptop.position,
			{
				y: `+=${laptopVS.height / 1.25}`,
			},
			"<"
		);
		tlLaptop.to(laptop.rotation, { y: 0, z: 0 }, "<+=5%");
	}

	async load(): Promise<void> {
		if (this.loaded) return;

		// Load textures/models
		const loader = new GLTFLoader();

		const { scene: laptop } = await loader.loadAsync(
			"/models/laptop/laptop.glb"
		);
		laptop.name = "laptop";
		await this.renderer
			.compileAsync(laptop, this.camera, this.scene)
			.then(() => this.scene.add(laptop));

		const ambiantLight = new AmbientLight(0xffffff);
		this.scene.add(ambiantLight);

		this.objects["laptop"] = laptop;
		this.objects["light"] = ambiantLight;
		this.loadGsapAnimation();

		this.loaded = true;
	}
}
