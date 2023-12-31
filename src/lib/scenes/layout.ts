import * as three from "three";
import { FBXLoader, GLTFLoader, OBJLoader } from "three/examples/jsm/Addons";

let cache: ReturnType<typeof newLayoutScene> | undefined;
export default async function generate() {
	if(cache) return cache
	cache = newLayoutScene()
	return cache
}
export async function newLayoutScene() {
	const scene = new three.Scene();
	const camera = new three.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight
	);
	const renderer = new three.WebGLRenderer({ alpha: true, antialias: true });
	camera.position.z = 6;
	renderer.setSize(window.innerWidth, window.innerHeight);

	// On resizing
	window.addEventListener("resize", () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect= window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	})
	
	// Load textures/models
	const envLoader = new three.TextureLoader();
	const backgrounds = {
		light: await envLoader.loadAsync("/env_maps/alpha_mayoris.jpg"),
		dark: await envLoader.loadAsync("/env_maps/nebulas.png")
	}
	function setBG(theme: keyof typeof backgrounds) {
		const bg = backgrounds[theme]

		bg.mapping = three.EquirectangularReflectionMapping;
	
		bg.wrapS = three.RepeatWrapping;
		bg.wrapT = three.RepeatWrapping;
	
		scene.background = bg;
		scene.environment = bg;
	}
	setBG("dark")

	const loader = new GLTFLoader()
	
	const { scene: keyboard } = await loader.loadAsync("/models/keyboard/keyboard.glb")
	await renderer.compileAsync(keyboard, camera, scene).then(() => scene.add(keyboard))

	const { scene: laptop } = await loader.loadAsync("/models/laptop/laptop.glb")
	laptop.scale.set(20, 20, 20)
	laptop.position.set(0, 5, -10)
	await renderer.compileAsync(laptop, camera, scene).then(() => scene.add(laptop))

	const { scene: rocket } = await loader.loadAsync("/models/rocket/rocket.glb")
	rocket.scale.set(1.5, 1.5, 1.5)
	rocket.position.set(-10, -10, 10)
	await renderer.compileAsync(rocket, camera, scene).then(() => scene.add(rocket))
	
	// Animate/render everything
	function frame() {
		keyboard.rotation.x+= .0005
		keyboard.rotation.y+= .0005
		keyboard.rotation.z+= .0005

		rocket.rotation.x-= .0005
		rocket.rotation.y+= .0005
		rocket.rotation.z-= .0005

		camera.rotation.x+= .0005
		camera.rotation.y+= .0002
		camera.rotation.z+= .0003
		renderer.render(scene, camera);
	}

	function animate() {
		requestAnimationFrame(animate);
		frame();
	}

	let __animating = false
	return {
		scene, camera, renderer, frame,
		animate: () => {
			if(!__animating) {
				__animating = true
				animate()
			}
		},
		objects: { keyboard, laptop, rocket },
		tools: {
			setBG
		}
	}
}

