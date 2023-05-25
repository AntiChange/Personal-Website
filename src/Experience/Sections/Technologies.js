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
    this.github = this.resources.items.githubModel;
    this.postgres = this.resources.items.postgresModel;
    this.mongodb = this.resources.items.mongodbModel;
    this.unity = this.resources.items.unityModel;

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
    this.threejsModel.position.set(29.1, 0, 0.5);
    this.threejsModel.rotation.set(Math.PI / 2, 0, Math.PI / 24);
    this.scene.add(this.threejsModel);
    
    // Github Model
    this.githubModel = this.github.scene;
    this.githubModel.scale.set(0.27, 0.27, 0.27);
    this.githubModel.position.set(31.0, 1, 0.5);
    this.githubModel.rotation.set(Math.PI / 2, 0, 0);
    this.scene.add(this.githubModel);
    
    // Postgres Model
    this.postgresModel = this.postgres.scene;
    this.postgresModel.scale.set(0.23, 0.23, 0.23);
    this.postgresModel.position.set(33.0, -0.5, 0.5);
    this.postgresModel.rotation.set(Math.PI / 2, 0, 0);
    this.scene.add(this.postgresModel);
    
    // MongoDB Model
    this.mongodbModel = this.mongodb.scene;
    this.mongodbModel.scale.set(0.4, 0.4, 0.4);
    this.mongodbModel.position.set(33.05, 1, 0.5);
    this.mongodbModel.rotation.set(Math.PI / 2, 0, 0);
    this.scene.add(this.mongodbModel);
    
    // Unity Model
    this.unityModel = this.unity.scene;
    this.unityModel.scale.set(0.6, 0.6, 0.6);
    this.unityModel.position.set(35.05, 0.5, 0.5);
    this.unityModel.rotation.set(Math.PI / 2, 0, 0);
    this.scene.add(this.unityModel);
  }

  breathe() {
    this.reactModel.rotation.z = Math.cos(this.time.elapsed / 1000) * 0.3;
    this.threejsModel.rotation.z = Math.cos(this.time.elapsed / 1000) * 0.3 + Math.PI / 24;
    this.githubModel.rotation.z = Math.cos(this.time.elapsed / 1000) * 0.3;
    this.postgresModel.rotation.z = Math.cos(this.time.elapsed / 1000) * 0.3;
    this.mongodbModel.rotation.z = Math.cos(this.time.elapsed / 1000) * 0.3;
    this.unityModel.rotation.z = Math.cos(this.time.elapsed / 1000) * 0.3;
  }
}
