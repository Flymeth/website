import * as three from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Scene from "./_default";

export class LayoutScene extends Scene {
	private backgrounds: {
		light: three.Texture | null,
		dark: three.Texture | null
	}
	private loaded= false;
	constructor() {
		super()
		this.backgrounds = {
			light: null, dark: null
		}
	}

	frame(): void {
		this.objects["keyboard"].rotation.x+= .0005
		this.objects["keyboard"].rotation.y+= .0005
		this.objects["keyboard"].rotation.z+= .0005

		this.objects["rocket"].rotation.x-= .0005
		this.objects["rocket"].rotation.y+= .0005
		this.objects["rocket"].rotation.z-= .0005

		this.objects["laptop"].rotation.x+= .0005
		this.objects["laptop"].rotation.y-= .0005
		this.objects["laptop"].rotation.z+= .0005

		this.camera.rotation.x+= .0005
		this.camera.rotation.y+= .0002
		this.camera.rotation.z+= .0003

		this.renderer.render(this.scene, this.camera);
	}

	setBG(theme: keyof typeof this.backgrounds) {
		const bg = this.backgrounds[theme]
		if(!bg) return;

		bg.mapping = three.EquirectangularReflectionMapping;
	
		bg.wrapS = three.RepeatWrapping;
		bg.wrapT = three.RepeatWrapping;
	
		this.scene.background = bg;
		this.scene.environment = bg;
	}

	async load(): Promise<void> {
		if(this.loaded) return;
		this.camera.position.z = 6;
	
		// Load textures/models
		const envLoader = new three.TextureLoader();
		this.backgrounds = {
			light: await envLoader.loadAsync("/env_maps/alpha_mayoris.webp"),
			dark: await envLoader.loadAsync("/env_maps/nebulas.webp")
		}
		this.setBG("dark")

		const loader = new GLTFLoader()
		
		const { scene: keyboard } = await loader.loadAsync("/models/keyboard/keyboard.glb")
		await this.renderer.compileAsync(keyboard, this.camera, this.scene).then(() => this.scene.add(keyboard))

		const { scene: laptop } = await loader.loadAsync("/models/laptop/laptop.glb")
		laptop.scale.set(20, 20, 20)
		laptop.position.set(0, 5, -10)
		await this.renderer.compileAsync(laptop, this.camera, this.scene).then(() => this.scene.add(laptop))

		const { scene: rocket } = await loader.loadAsync("/models/rocket/rocket.glb")
		rocket.scale.set(1.5, 1.5, 1.5)
		rocket.position.set(-10, -10, 10)
		await this.renderer.compileAsync(rocket, this.camera, this.scene).then(() => this.scene.add(rocket))

		this.objects["keyboard"] = keyboard
		this.objects["laptop"] = laptop
		this.objects["rocket"] = rocket

		this.loaded= true
	}
}
