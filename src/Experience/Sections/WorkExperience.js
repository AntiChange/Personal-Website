import * as THREE from "three";
import { Mesh } from "three";
import Experience from "../Experience.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// JS class for "work experience" section
export default class WorkExperience {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    // Resources
    this.font = this.resources.items.sectionFont;
    this.postalgia = this.resources.items.postalgiaModel;
    this.jobox = this.resources.items.joboxModel;

    // 3D "Work experience" text
    const textGeometry = new TextGeometry("Work experience", {
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
    textMesh.position.set(12, 2.2, 0);
    this.scene.add(textMesh);

    // Models
    this.setModel();
  }

  setModel() {
    // Postalgia Model
    this.postalgiaModel = this.postalgia.scene;
    this.postalgiaModel.scale.set(0.2, 0.2, 0.2);
    this.postalgiaModel.position.set(13.2, -0.9, 0.5);
    this.postalgiaModel.rotation.set(Math.PI / 2, 0, -Math.PI / 24);
    this.scene.add(this.postalgiaModel);

    // Jobox Model
    this.joboxModel = this.jobox.scene;
    this.joboxModel.scale.set(0.2, 0.2, 0.2);
    this.joboxModel.position.set(14.6, -0.5, 0.5);
    this.joboxModel.rotation.set(Math.PI / 2, 0, -Math.PI / 24);
    this.scene.add(this.joboxModel);
  }

  breathe() {
    this.postalgiaModel.position.y = Math.cos(this.time.elapsed / 1000) * 0.1 - 0.9;
    this.postalgiaModel.rotation.x = Math.cos(this.time.elapsed / 1000) * 0.1 + Math.PI / 2;
    this.postalgiaModel.rotation.z = Math.cos(this.time.elapsed / 1000) * 0.2 - Math.PI / 24;

    this.joboxModel.position.y = Math.cos(this.time.elapsed / 1000) * 0.1 - 0.5;
    this.joboxModel.rotation.x = Math.cos(this.time.elapsed / 1000) * 0.1 + Math.PI / 2;
    this.joboxModel.rotation.z = Math.cos(this.time.elapsed / 1000) * 0.2 - Math.PI / 24;
  }
}