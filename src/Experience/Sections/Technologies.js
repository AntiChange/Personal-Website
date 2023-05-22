import * as THREE from "three";
import { Mesh } from "three";
import Experience from "../Experience.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// JS class for "technologies" section
export default class Technologies {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    // Resources
    this.font = this.resources.items.sectionFont;
    this.react = this.resources.items.reactModel;
    this.threejs = this.resources.items.threejsModel;

    // 3D "Technologies" text
    const textGeometry = new TextGeometry("Technologies", {
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
    textMesh.position.set(27.7, 2.2, 0);
    this.scene.add(textMesh);

    // Models
    this.setModel();
  }

  setModel() {
    // React Model
    this.reactModel = this.react.scene;
    this.reactModel.scale.set(0.25, 0.25, 0.25);
    this.reactModel.position.set(29.0, -1.85, 0.5);
    this.reactModel.rotation.set(Math.PI / 2, 0, 0);
    this.scene.add(this.reactModel);
    
    // ThreeJS Model
    this.threejsModel = this.threejs.scene;
    this.threejsModel.scale.set(0.27, 0.27, 0.27);
    this.threejsModel.position.set(29.0, 0, 0.5);
    this.threejsModel.rotation.set(Math.PI / 2, 0, Math.PI / 24);
    this.scene.add(this.threejsModel);
  }

  breathe() {
    this.reactModel.rotation.z = Math.cos(this.time.elapsed / 1000) * 0.3;
    this.threejsModel.rotation.z = Math.cos(this.time.elapsed / 1000) * 0.3 + Math.PI / 24;
  }
}
