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
    this.cPlusPlus = this.resources.items.cPlusPlusModel;
    this.c = this.resources.items.cModel;

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
    // C# Model
    this.cSharpModel = this.cSharp.scene;
    this.cSharpModel.scale.set(0.6, 0.6, 0.6);
    this.cSharpModel.position.set(19.6, 0.49, 0.5);
    this.cSharpModel.rotation.set(Math.PI / 2, 3 * Math.PI / 2, Math.PI / 2 + Math.PI / 24);
    this.scene.add(this.cSharpModel);
    
    // C++ Model
    this.cPlusPlusModel = this.cPlusPlus.scene;
    this.cPlusPlusModel.scale.set(0.6, 0.6, 0.6);
    this.cPlusPlusModel.position.set(19.6, -0.49, 0.5);
    this.cPlusPlusModel.rotation.set(Math.PI / 2, 3 * Math.PI / 2, Math.PI / 2);
    this.scene.add(this.cPlusPlusModel);
    
    // C Model
    this.cModel = this.c.scene;
    this.cModel.scale.set(0.6, 0.6, 0.6);
    this.cModel.position.set(19.6, -1.45, 0.5);
    this.cModel.rotation.set(Math.PI / 2, 3 * Math.PI / 2, Math.PI / 2);
    this.scene.add(this.cModel);
  }

  breathe() {
    this.cSharpModel.rotation.y = Math.cos(this.time.elapsed / 1000) * 0.3 + 3 * Math.PI / 2;
    this.cPlusPlusModel.rotation.y = Math.cos(this.time.elapsed / 1000) * 0.3 + 3 * Math.PI / 2;
    this.cModel.rotation.y = Math.cos(this.time.elapsed / 1000) * 0.3 + 3 * Math.PI / 2;
  }
}