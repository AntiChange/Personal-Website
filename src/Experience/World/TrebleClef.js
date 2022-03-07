import * as THREE from "three";
import Experience from "../Experience.js";

export default class TrebleClef {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Resource
    this.resource = this.resources.items.trebleClef;

    this.setModel();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(2, 2, 2);
    this.model.rotation.set(Math.PI / 2, 0, 0);
    console.log(this.model);
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }
}
