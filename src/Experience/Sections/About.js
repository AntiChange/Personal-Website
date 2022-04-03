import * as THREE from "three";
import { Mesh } from "three";
import Experience from "../Experience.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// JS class for "about me" section
export default class About {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    // Resources
    this.violin = this.resources.items.violinModel;
    this.font = this.resources.items.sectionFont;

    // 3D "About me" text
    const textGeometry = new TextGeometry("About me", {
      font: this.font,
      size: 0.3,
      height: 0.1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
      color: 0x00000,
    });
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const textMesh = new Mesh(textGeometry, textMaterial);
    textMesh.position.set(5, 2.2, 0);
    this.scene.add(textMesh);

    // Models
    this.setModel();
  }

  setModel() {
    this.violinModel = this.violin.scene;
    this.violinModel.scale.set(1, 1, 1);
    this.violinModel.position.set(5.5, -2, 0);
    this.violinModel.rotation.set(-Math.PI / 12, 0, -Math.PI / 4);
    this.scene.add(this.violinModel);
  }

  breathe() {
    this.violinModel.position.y = Math.cos(this.time.elapsed / 1000) * 0.1 - 2;
    this.violinModel.rotation.y = Math.cos(this.time.elapsed / 1000) * 0.1;
  }
}
