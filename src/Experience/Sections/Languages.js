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
    this.python = this.resources.items.pythonModel;
    this.js = this.resources.items.jsModel;
    this.css = this.resources.items.cssModel;
    this.html = this.resources.items.htmlModel;

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
    this.cSharpModel.position.set(19.7, 0.49, 0.5);
    this.cSharpModel.rotation.set(Math.PI / 2, 3 * Math.PI / 2, Math.PI / 2 + Math.PI / 24);
    this.scene.add(this.cSharpModel);
    
    // C++ Model
    this.cPlusPlusModel = this.cPlusPlus.scene;
    this.cPlusPlusModel.scale.set(0.6, 0.6, 0.6);
    this.cPlusPlusModel.position.set(19.7, -0.49, 0.5);
    this.cPlusPlusModel.rotation.set(Math.PI / 2, 3 * Math.PI / 2, Math.PI / 2);
    this.scene.add(this.cPlusPlusModel);
    
    // C Model
    this.cModel = this.c.scene;
    this.cModel.scale.set(0.6, 0.6, 0.6);
    this.cModel.position.set(19.7, -1.45, 0.5);
    this.cModel.rotation.set(Math.PI / 2, 3 * Math.PI / 2, Math.PI / 2);
    this.scene.add(this.cModel);
    
    // Python Model
    this.pythonModel = this.python.scene;
    this.pythonModel.scale.set(0.015, 0.015, 0.015);
    this.pythonModel.position.set(21.6, 1.4, 0.5);
    this.pythonModel.rotation.set(0, 0, 0);
    this.scene.add(this.pythonModel);
    
    // JS Model
    this.jsModel = this.js.scene;
    this.jsModel.scale.set(6.5, 6.5, 6.5);
    this.jsModel.position.set(23.8, 1.0, 0.5);
    this.jsModel.rotation.set(Math.PI / 2, -Math.PI / 2, Math.PI / 2);
    this.scene.add(this.jsModel);
    
    // CSS Model
    this.cssModel = this.css.scene;
    this.cssModel.scale.set(0.0055, 0.0055, 0.0055);
    this.cssModel.position.set(23.8, -0.30, 0.5);
    this.cssModel.rotation.set(0, 0, 0);
    this.scene.add(this.cssModel);
    
    // HTML Model
    this.htmlModel = this.html.scene;
    this.htmlModel.scale.set(0.0055, 0.0055, 0.0055);
    this.htmlModel.position.set(23.8, -1.75, 0.5);
    this.htmlModel.rotation.set(0, 0, 0);
    this.scene.add(this.htmlModel);
  }

  breathe() {
    this.cSharpModel.rotation.y = Math.cos(this.time.elapsed / 1000) * 0.3 + 3 * Math.PI / 2;
    this.cPlusPlusModel.rotation.y = Math.cos(this.time.elapsed / 1000) * 0.3 + 3 * Math.PI / 2;
    this.cModel.rotation.y = Math.cos(this.time.elapsed / 1000) * 0.3 + 3 * Math.PI / 2;
    this.pythonModel.rotation.z = Math.cos(this.time.elapsed / 1000) * 0.3;
    this.jsModel.rotation.y = Math.cos(this.time.elapsed / 1000) * 0.3 - Math.PI / 2;
    this.cssModel.rotation.z = Math.cos(this.time.elapsed / 1000) * 0.3;
    this.htmlModel.rotation.z = Math.cos(this.time.elapsed / 1000) * 0.3;
  }
}