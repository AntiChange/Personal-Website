import * as THREE from "three";
import Experience from "../Experience.js";
import { MeshLine, MeshLineMaterial } from "three.meshline";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import gsap from "gsap";

export default class Staff {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.lines = [];
    this.sharps = [];
    this.timeSignature = [];

    // Resources
    this.font = this.resources.items.defaultFont;
    this.matcap = this.resources.items.blackMatcap;

    // Material (three.meshline was used due to varying line thicknesses)
    const material = new MeshLineMaterial({
      color: 0x000000,
      lineWidth: 0.1,
    });

    // Start line
    let points = [];
    points.push(new THREE.Vector3(-3.5, 2.05, 0));
    points.push(new THREE.Vector3(-3.5, -2.05, 0));
    let geometry = new THREE.BufferGeometry().setFromPoints(points);
    let line = new MeshLine();
    line.setPoints(points);
    line.setGeometry(geometry);
    let mesh = new THREE.Mesh(
      line,
      new MeshLineMaterial({ color: 0x000000, lineWidth: 0.5 })
    );
    this.lines.push(mesh);
    this.scene.add(mesh);

    // 5 Staves
    for (let i = 0; i < 5; i++) {
      points = [];
      points.push(new THREE.Vector3(-3.5, i * 1 + -2, 0));
      points.push(new THREE.Vector3(1000, i * 1 + -2, 0));
      geometry = new THREE.BufferGeometry().setFromPoints(points);
      line = new MeshLine();
      line.setPoints(points);
      line.setGeometry(geometry);
      mesh = new THREE.Mesh(line, material);
      this.lines.push(mesh);
      this.scene.add(mesh);
    }

    // Work Experience Barline
    points = [];
    points.push(new THREE.Vector3(11.8, 2.05, 0));
    points.push(new THREE.Vector3(11.8, -2.05, 0));
    geometry = new THREE.BufferGeometry().setFromPoints(points);
    line = new MeshLine();
    line.setPoints(points);
    line.setGeometry(geometry);
    mesh = new THREE.Mesh(line, material);
    this.lines.push(mesh);
    this.scene.add(mesh);

    // Sharps (3D text)
    const sharpGeometry = new TextGeometry("#", {
      font: this.font,
      size: 1,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
      color: 0x00000,
    });
    sharpGeometry.computeBoundingBox();
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const sharp1 = new THREE.Mesh(sharpGeometry, textMaterial);
    sharp1.position.set(1, 1.35, 0);
    sharp1.rotateY(-Math.PI / 16);
    const sharp2 = new THREE.Mesh(sharpGeometry, textMaterial);
    sharp2.position.set(1.4, -0.05, 0);
    sharp2.rotateY(-Math.PI / 16);
    this.scene.add(sharp1, sharp2);
    this.sharps.push(sharp1);
    this.sharps.push(sharp2);

    // Time signature (4/4)
    const signatureGeometry = new TextGeometry("4", {
      font: this.font,
      size: 2,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
      color: 0x00000,
    });
    signatureGeometry.computeBoundingBox();
    const first4 = new THREE.Mesh(signatureGeometry, textMaterial);
    first4.translateX(2.8);
    first4.translateY(0);
    first4.rotateY(-Math.PI / 16);
    const second4 = new THREE.Mesh(signatureGeometry, textMaterial);
    second4.translateX(2.8);
    second4.translateY(-2);
    second4.rotateY(-Math.PI / 16);
    this.timeSignature.push(first4);
    this.timeSignature.push(second4);
    this.scene.add(first4, second4);
  }

  playAnimation() {
    gsap.to(this.sharps[0].rotation, {
      duration: 1.7,
      ease: "power2.inOut",
      y: Math.PI * 2,
      x: Math.PI * 2,
    });
    gsap.to(this.sharps[1].rotation, {
      duration: 2.2,
      ease: "power2.inOut",
      y: Math.PI * 2,
      x: Math.PI * 2,
    });
    gsap.to(this.timeSignature[0].rotation, {
      duration: 3,
      ease: "power4.inOut",
      z: -Math.PI * 2,
    });
    gsap.to(this.timeSignature[1].rotation, {
      duration: 3.5,
      ease: "power4.inOut",
      z: -Math.PI * 2,
    });
  }

  breathe() {
    for (let sharp of this.sharps) {
      sharp.rotation.y = Math.sin(this.time.elapsed / 1000) * 0.2;
    }
    this.sharps[0].position.y =
      Math.cos(this.time.elapsed / 1000) * 0.09 + 1.45;
    this.sharps[1].position.y =
      Math.cos(this.time.elapsed / 1000) * 0.09 - 0.05;
    for (let signature of this.timeSignature) {
      signature.rotation.y = -Math.cos(this.time.elapsed / 1000) * 0.2;
    }
  }
}
