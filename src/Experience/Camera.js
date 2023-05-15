import * as THREE from "three";
import Experience from "./Experience.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.light = new THREE.PointLight("#ffffff", 10);
    this.light.decay = 1.2;
    this.scene.add(this.light);

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(0, 0, 10);
    this.scene.add(this.instance);
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.instance.position.x = this.experience.scroll.scrollX;
    this.light.position.copy(this.instance.position);
  }
}
