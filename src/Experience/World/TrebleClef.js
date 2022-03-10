import * as THREE from "three";
import Experience from "../Experience.js";
import gsap from "gsap";

export default class TrebleClef {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    // Resource
    this.resource = this.resources.items.trebleClef;

    this.setModel();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(2, 2, 2);
    this.model.position.set(0, 0.5, 0);
    this.model.rotation.set(Math.PI / 2, 0, Math.PI / 16);
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  playAnimation() {
    gsap.to(this.model.rotation, {
      duration: 2.3,
      ease: "power2.inOut",
      x: "+=6",
      z: "+=0.4",
    });
  }

  update() {
    this.model.rotation.z += Math.cos(this.time.elapsed / 1000) * 0.002;
    this.model.position.y += Math.cos(this.time.elapsed / 1000) * 0.001;
  }
}
