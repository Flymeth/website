import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons";
import Scene from "./_default";
import * as THREE from "three";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export class IndexScene extends Scene {
	private loaded = false;
	private orbit: OrbitControls;
	constructor() {
		super();
		this.orbit = new OrbitControls(this.camera, this.renderer.domElement)
	}

	frame(): void {
		this.orbit.update()
		this.renderer.render(this.scene, this.camera);
	}

	doEntrance() {
		const screen = this.objects["laptop"]?.getObjectByName("Display")
		if(!screen) throw new Error("The laptop has no screen.")

		gsap.fromTo(screen.rotation, {
			x: 191 * Math.PI / 180,
		}, {
			x: 3 * Math.PI / 8,
			ease: "power4.inOut",
			duration: 1.5
		})
	}

	loadGsapAnimation() {
		const laptop = this.objects["laptop"]
		if(!laptop) throw new Error("Laptop object not found.");
		const laptopScaleFactor = 10;
		laptop.scale.setScalar(laptopScaleFactor);

		const tlLaptop = gsap.timeline({
			scrollTrigger: {
				trigger: "header",
				start: "top top",
				end: "bottom top",
				scrub: .25
			},
			defaults: {
				ease: "power1.inOut"
			}
		})

		const screen = laptop.getObjectByName("Display")
		if(!screen) throw new Error("The laptop has no screen.")
		tlLaptop.fromTo(screen.rotation, {
			x: 3 * Math.PI / 8,
		}, {
			x: 191 * Math.PI / 180,
			ease: "none"
		})
		tlLaptop.fromTo(laptop.rotation, {
			y: -Math.PI / 12,
			x: Math.PI / 6,
		}, {
			y: -Math.PI,
			x: 0
		}, "<")
		tlLaptop.fromTo(laptop.position, {
			x: window.innerWidth / 1000,
			y: -1,
			z: -5
		}, {
			x: -window.innerWidth / 135,
			y: 3
		}, "<")
		tlLaptop.to(laptop.scale, {
			x: 0,
			y: 0,
			z: 0
		}, "<")
	}

	async load(): Promise<void> {
		if(this.loaded) return;

		// Load textures/models
		const loader = new GLTFLoader()

		const { scene: laptop } = await loader.loadAsync("/models/laptop/laptop.glb")
		laptop.name = "laptop"
		await this.renderer.compileAsync(laptop, this.camera, this.scene).then(() => this.scene.add(laptop))

		const ambiantLight = new THREE.AmbientLight(0xffffff);
		this.scene.add(ambiantLight)

		// this.scene.background = new THREE.Color(0x140E20)
		
		this.objects["laptop"] = laptop
		this.objects["light"] = ambiantLight
		this.loadGsapAnimation();

		this.loaded= true
	}
}
