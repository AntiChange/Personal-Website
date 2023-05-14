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
    this.rightSunLight = new THREE.PointLight("#ffffff", 10);
    this.rightSunLight.castShadow = true;
    this.rightSunLight.shadow.camera.far = 15;
    this.rightSunLight.shadow.mapSize.set(1024, 1024);
    this.rightSunLight.shadow.normalBias = 0.05;
    this.rightSunLight.position.set(5.3, 0, -5.3);

    this.leftSunLight = new THREE.PointLight("#ffffff", 10);
    this.leftSunLight.castShadow = true;
    this.leftSunLight.shadow.camera.far = 15;
    this.leftSunLight.shadow.mapSize.set(1024, 1024);
    this.leftSunLight.shadow.normalBias = 0.05;
    this.leftSunLight.position.set(-5.3, 0, 5.3);

    this.scene.add(this.rightSunLight, this.leftSunLight);

    this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
    this.scene.add(this.ambientLight);

    // Debug
    if (this.debug.active) {
      this.debug.ui.add(this.rightSunLight.position, "x", -10, 10, 0.1);
      this.debug.ui.add(this.rightSunLight.position, "y", -10, 10, 0.1);
      this.debug.ui.add(this.rightSunLight.position, "z", -10, 10, 0.1);
      this.debug.ui.add(this.leftSunLight.position, "x", -10, 10, 0.1);
      this.debug.ui.add(this.leftSunLight.position, "y", -10, 10, 0.1);
      this.debug.ui.add(this.leftSunLight.position, "z", -10, 10, 0.1);
      this.debug.ui.add(this.ambientLight, "intensity", -10, 10, 0.1);
      const rightPointLightHelper = new THREE.PointLightHelper(
        this.rightSunLight,
        0.2
      );
      const leftPointLightHelper = new THREE.PointLightHelper(
        this.rightSunLight,
        0.2
      );
      this.scene.add(leftPointLightHelper, rightPointLightHelper);
    }
  }
}
