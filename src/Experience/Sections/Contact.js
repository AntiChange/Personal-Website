import * as THREE from "three";
import { Mesh } from "three";
import Experience from "../Experience.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// JS class for "contact" section
export default class Contact {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    // Resources
    this.font = this.resources.items.sectionFont;
    this.gmail = this.resources.items.gmailModel;

    // 3D "Contact" text
    const textGeometry = new TextGeometry("Contact me", {
      font: this.font,
      size: 0.3,
      height: 0.02,
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
    textMesh.position.set(39.2, 2.2, 0);
    this.scene.add(textMesh);

    // Models
    this.setModel();
  }

  setModel() {
    // Gmail Model
    this.gmailModel = this.gmail.scene;
    this.gmailModel.scale.set(0.12, 0.12, 0.12);
    this.gmailModel.position.set(40.5, -1.85, 0.5);
    this.gmailModel.rotation.set(Math.PI / 2, 0, 0);
    this.scene.add(this.gmailModel);
  }

  breathe() {
    this.gmailModel.scale.set(
      Math.cos(this.time.elapsed / 1000) * 0.01 + 0.12,
      Math.cos(this.time.elapsed / 1000) * 0.01 + 0.12,
      Math.cos(this.time.elapsed / 1000) * 0.01 + 0.12
    );
    this.gmailModel.rotation.x =
      Math.cos(this.time.elapsed / 1000) * 0.2 + Math.PI / 2;
    this.gmailModel.rotation.z = Math.cos(this.time.elapsed / 1000) * 0.2;
  }
}
