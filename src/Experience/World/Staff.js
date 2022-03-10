import * as THREE from "three";
import Experience from "../Experience.js";
import { MeshLine, MeshLineMaterial } from "three.meshline";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export default class Staff {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.font = this.resources.items.defaultFont;
    this.matcap = this.resources.items.blackMatcap;

    // Material (three.meshline was used due to varying line thicknesses)
    const material = new MeshLineMaterial({
      color: 0x000000,
      lineWidth: 0.1,
    });

    // Start line
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

    // 5 Staves
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

    // Sharps (3D text)
    const textGeometry = new TextGeometry("#", {
      font: this.font,
      size: 0.8,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    textGeometry.computeBoundingBox();
    textGeometry.rotateY(-Math.PI / 8);
    const textMaterial = new THREE.MeshStandardMaterial({});
    textMaterial.color = 0x000000;
    const text = new THREE.Mesh(textGeometry, textMaterial);

    this.scene.add(text);
  }
}
