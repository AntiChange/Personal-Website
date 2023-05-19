import * as THREE from "three";
import { Mesh } from "three";
import Experience from "../Experience.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// JS class for "languages" section
export default class Languages {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    // Resources
    this.font = this.resources.items.sectionFont;
    this.cSharp = this.resources.items.cSharpModel;

    // 3D "Languages" text
    const textGeometry = new TextGeometry("Languages", {
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
    textMesh.position.set(18.7, 2.2, 0);
    this.scene.add(textMesh);

    // Models
    this.setModel();
  }
  
  setModel() {
    // C Sharp Model
    this.cSharpModel = this.cSharp.scene;
    this.cSharpModel.scale.set(0.55, 0.55, 0.55);
    this.cSharpModel.position.set(19.6, 0.5, 0.5);
    this.cSharpModel.rotation.set(Math.PI / 2, 3 * Math.PI / 2, Math.PI / 2);
    this.scene.add(this.cSharpModel);
  }

  breathe() {
    this.cSharpModel.rotation.y = Math.cos(this.time.elapsed / 1000) * 0.1 + 3 * Math.PI / 2;
  }
}