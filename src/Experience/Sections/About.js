import * as THREE from "three";
import Experience from "../Experience.js";

// JS class for "about me" section
export default class About {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    // Resources
    this.violin = this.resources.items.violinModel;

    this.setModel();
  }

  setModel() {
    this.violinModel = this.violin.scene;
    this.violinModel.scale.set(1, 1, 1);
    this.violinModel.position.set(8, -2, 0);
    this.violinModel.rotation.set(-Math.PI / 12, 0, -Math.PI / 4);
    this.scene.add(this.violinModel);
  }

  breathe() {
    this.violinModel.position.y =
      Math.cos(this.time.elapsed / 1000) * 0.1 - 2;
    this.violinModel.rotation.y =
      Math.cos(this.time.elapsed / 1000) * 0.1;
  }
}
