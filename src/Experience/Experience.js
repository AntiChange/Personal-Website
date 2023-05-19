import * as THREE from "three";

import Debug from "./Utils/Debug.js";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Resources from "./Utils/Resources.js";
import sources from "./sources.js";
import Scroll from "./Utils/Scroll.js";

let instance = null;

export default class Experience {
  constructor(_canvas) {
    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;

    // Global access
    window.experience = this;

    // Options
    this.canvas = _canvas;

    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    this.scroll = new Scroll();

    // Labels
    this.points = [
      {
        // Violin label
        position: new THREE.Vector3(5.4, -0.65, 0),
        element: document.querySelector(".point-0"),
      },
      {
        // "Program" label
        position: new THREE.Vector3(6.95, 0.44, 0),
        element: document.querySelector(".point-1"),
      },
      {
        // Ableton label
        position: new THREE.Vector3(8.57, 1.5, 0),
        element: document.querySelector(".point-2"),
      },
      {
        // Youtube label
        position: new THREE.Vector3(10.05, 2.39, 0),
        element: document.querySelector(".point-3"),
      },
      {
        // Postalgia label
        position: new THREE.Vector3(12.83, -0.1, 0),
        element: document.querySelector(".point-4"),
      },
      {
        // Jobox label
        position: new THREE.Vector3(14.8, 0.94, 0),
        element: document.querySelector(".point-5"),
      },
      {
        // Pixlee label
        position: new THREE.Vector3(16.9, 1.9, 0),
        element: document.querySelector(".point-6"),
      },
      {
        // C# label
        position: new THREE.Vector3(19.22, 0.9, 0),
        element: document.querySelector(".point-7"),
      },
    ];

    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      this.update();
    });

    // Return to top of page on refresh
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    for (const point of this.points) {
      const screenPosition = point.position.clone();
      screenPosition.project(this.camera.instance);

      const translateX = screenPosition.x * this.sizes.width * 0.524;
      const translateY =
        -(screenPosition.y * this.sizes.height * 0.5) + this.scroll.scrollY;

      point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
    }
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    // Traverse the whole scene
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) this.debug.ui.destroy();
  }
}
