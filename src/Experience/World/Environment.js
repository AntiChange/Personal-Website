import * as THREE from "three";
import Experience from "../Experience.js";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("environment");
    }

    this.setSunLight();
  }

  setSunLight() {
    this.sunLight = new THREE.PointLight("#ffffff", 10);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(5.3, 0, -5.3);
    this.scene.add(this.sunLight);

    // Debug
    if (this.debug.active) {
      this.debug.ui.add(this.sunLight.position, "x", -10, 10, 0.1);
      this.debug.ui.add(this.sunLight.position, "y", -10, 10, 0.1);
      this.debug.ui.add(this.sunLight.position, "z", -10, 10, 0.1);
      const pointLightHelper = new THREE.PointLightHelper(this.sunLight, 0.2);
      this.scene.add(pointLightHelper);
    }
  }
}
