import * as THREE from "three";
import Experience from "../Experience.js";
import { MeshLine, MeshLineMaterial } from "three.meshline";

export default class Staff {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    // Material (three.meshline was used due to varying line thicknesses)
    const material = new MeshLineMaterial({
      color: 0x000000,
      lineWidth: 0.1,
    });

    // Geometry
    const lines = [];
    let points = [];
    points.push(new THREE.Vector3(-3.5, 2.05, 0));
    points.push(new THREE.Vector3(-3.5, -2.05, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new MeshLine();
    line.setPoints(points);
    line.setGeometry(geometry);
    const mesh = new THREE.Mesh(
      line,
      new MeshLineMaterial({ color: 0x000000, lineWidth: 0.5 })
    );
    lines.push(mesh);
    this.scene.add(mesh);
    for (let i = 0; i < 5; i++) {
      points = [];
      points.push(new THREE.Vector3(-3.5, i * 1 + -2, 0));
      points.push(new THREE.Vector3(1000, i * 1 + -2, 0));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new MeshLine();
      line.setPoints(points);
      line.setGeometry(geometry);
      const mesh = new THREE.Mesh(line, material);
      lines.push(mesh);
      this.scene.add(mesh);
    }
  }
}
