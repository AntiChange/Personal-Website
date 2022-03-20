import * as THREE from "three";
import Experience from "./Experience.js";
import gsap from "gsap";

export default class LoadingScreen {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    /**
     * Overlay
     */
    const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    this.overlayMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uAlpha: { value: 1 },
      },
      vertexShader: `
            void main()
            {
                gl_Position = vec4(position, 1.0);
            }
        `,
      fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `,
    });
    const overlay = new THREE.Mesh(overlayGeometry, this.overlayMaterial);
    this.scene.add(overlay);
  }

  loadedAnimation() {
    gsap.to(this.overlayMaterial.uniforms.uAlpha, {
      duration: 3,
      value: 0,
      delay: 1,
    });
  }
}
