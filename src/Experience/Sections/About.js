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
    this.font = this.resources.items.sectionFont;
    this.violin = this.resources.items.violinModel;
    this.program = this.resources.items.programModel;
    this.ableton = this.resources.items.abletonModel;
    this.youtube = this.resources.items.youtubeModel;

    // 3D "About me" text
    const textGeometry = new TextGeometry("About me", {
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
    textMesh.position.set(5, 2.2, 0);
    this.scene.add(textMesh);

    // Models
    this.setModel();
  }

  setModel() {
    // Violin Model
    this.violinModel = this.violin.scene;
    this.violinModel.scale.set(1, 1, 1);
    this.violinModel.position.set(5.4, -1.3, 0.5);
    this.violinModel.rotation.set(-Math.PI / 12, 0, -Math.PI / 4);
    this.scene.add(this.violinModel);

    // Program Model
    this.programModel = this.program.scene;
    this.programModel.scale.set(0.2, 0.2, 0.2);
    this.programModel.position.set(7.3, 0.11, 0.5);
    this.programModel.rotation.set(Math.PI / 2, 0, Math.PI / 12);
    this.scene.add(this.programModel);

    // Ableton Model
    this.abletonModel = this.ableton.scene;
    this.abletonModel.scale.set(0.4, 0.4, 0.4);
    this.abletonModel.position.set(8.9, 1.05, 0.5);
    this.abletonModel.rotation.set(Math.PI / 2, 0, Math.PI / 24);
    this.scene.add(this.abletonModel);

    // Youtube Model
    this.youtubeModel = this.youtube.scene;
    this.youtubeModel.scale.set(0.045, 0.045, 0.045);
    this.youtubeModel.position.set(10.4, 1.55, 0.5);
    this.youtubeModel.rotation.set(0, Math.PI / 24, -Math.PI / 12);
    this.scene.add(this.youtubeModel);
  }

  breathe() {
    this.violinModel.position.y = Math.cos(this.time.elapsed / 1000) * 0.1 - 1.3;
    this.violinModel.rotation.y = Math.cos(this.time.elapsed / 1000) * 0.1;
    this.violinModel.rotation.z =
      Math.cos(this.time.elapsed / 1000) * 0.1 - Math.PI / 4;

    this.programModel.position.y =
      Math.cos(this.time.elapsed / 1000) * 0.1 + 0.11;
    this.programModel.rotation.y = Math.cos(this.time.elapsed / 1000) * 0.1;
    this.programModel.rotation.z =
      Math.cos(this.time.elapsed / 1000) * 0.1 + Math.PI / 12;

    this.abletonModel.position.y =
      Math.cos(this.time.elapsed / 1000) * 0.1 + 1.05;
    this.abletonModel.rotation.y = Math.cos(this.time.elapsed / 1000) * 0.1;
    this.abletonModel.rotation.z =
      Math.cos(this.time.elapsed / 1000) * 0.1 + Math.PI / 24;

    this.youtubeModel.position.y =
      Math.cos(this.time.elapsed / 1000) * 0.1 + 1.55;
    this.youtubeModel.rotation.y =
      Math.cos(this.time.elapsed / 1000) * 0.1 + Math.PI / 24;
    this.youtubeModel.rotation.z =
      Math.cos(this.time.elapsed / 1000) * 0.1 - Math.PI / 12;
  }
}
