import * as three from "three";
import { GLTFLoader, OBJLoader } from "three/examples/jsm/Addons";

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
	
	const UFOLoader = new GLTFLoader();
	const {scene: UFO} = await UFOLoader.loadAsync("/models/UFO/Rigged_Modular UFO 2.8.glb.gltf")
	await renderer.compileAsync(UFO, camera, scene).then(() => scene.add(UFO))

	const cubeLoader = new OBJLoader()
	const burningCube = await cubeLoader.loadAsync("/models/cubes/burning_cube/model.obj")
	await renderer.compileAsync(burningCube, camera, scene).then(() => scene.add(burningCube))
	burningCube.position.set(-5, 2, 1)
	
	// Animate/render everything
	function frame() {
		UFO.rotation.y = (UFO.rotation.y + 0.0025) % (2 * Math.PI)
		
		burningCube.rotation.x+= .00025
		burningCube.rotation.y+= .00025
		
		camera.rotation.x+= .0005
		camera.rotation.y+= .0002
		camera.rotation.z+= .0002
		renderer.render(scene, camera);
	}

	function animate() {
		requestAnimationFrame(animate);
		frame();
	}

	return {
		scene, camera, renderer, frame, animate,
		objects: {
			UFO
		},
		tools: {
			setBG
		}
	}
}

