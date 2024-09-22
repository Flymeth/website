import * as three from "three";
import Scene from "../scene";
import loader from "../loader";

export class LayoutScene extends Scene {
  private backgrounds: {
    light: Promise<three.Texture> | null;
    dark: Promise<three.Texture> | null;
  };
  private loaded = false;
  constructor() {
    super();
    this.backgrounds = {
      light: null,
      dark: null,
    };
  }

  frame(): void {
    this.objects["keyboard"].rotation.x += 0.0005;
    this.objects["keyboard"].rotation.y += 0.0005;
    this.objects["keyboard"].rotation.z += 0.0005;

    this.objects["rocket"].rotation.x -= 0.0005;
    this.objects["rocket"].rotation.y += 0.0005;
    this.objects["rocket"].rotation.z -= 0.0005;

    this.objects["laptop"].rotation.x += 0.0005;
    this.objects["laptop"].rotation.y -= 0.0005;
    this.objects["laptop"].rotation.z += 0.0005;

    this.camera.rotation.x += 0.0005;
    this.camera.rotation.y += 0.0002;
    this.camera.rotation.z += 0.0003;

    this.renderer.render(this.scene, this.camera);
  }

  async setBG(theme: keyof typeof this.backgrounds) {
    const bg = await this.backgrounds[theme];
    if (!bg) return;

    bg.mapping = three.EquirectangularReflectionMapping;

    bg.wrapS = three.RepeatWrapping;
    bg.wrapT = three.RepeatWrapping;

    this.scene.background = bg;
    this.scene.environment = bg;
  }

  async load(): Promise<void> {
    if (this.loaded) return;
    this.camera.position.z = 6;

    // Load textures/models
    const envLoader = new three.TextureLoader();
    this.backgrounds = {
      light: envLoader.loadAsync("/env_maps/alpha_mayoris.webp"),
      dark: envLoader.loadAsync("/env_maps/nebulas.webp"),
    };
    this.setBG("dark");

    const { scene: keyboard } = await loader.loadAsync(
      "/models/keyboard/compressed.glb"
    );
    await this.renderer
      .compileAsync(keyboard, this.camera, this.scene)
      .then(() => this.scene.add(keyboard));

    const { scene: laptop } = await loader.loadAsync(
      "/models/laptop/laptop.glb"
    );
    laptop.scale.set(20, 20, 20);
    laptop.position.set(0, 5, -10);
    await this.renderer
      .compileAsync(laptop, this.camera, this.scene)
      .then(() => this.scene.add(laptop));

    const { scene: rocket } = await loader.loadAsync(
      "/models/rocket/compressed.glb"
    );
    rocket.scale.set(1.5, 1.5, 1.5);
    rocket.position.set(-10, -10, 10);
    await this.renderer
      .compileAsync(rocket, this.camera, this.scene)
      .then(() => this.scene.add(rocket));

    this.objects["keyboard"] = keyboard;
    this.objects["laptop"] = laptop;
    this.objects["rocket"] = rocket;

    this.loaded = true;
  }
}
