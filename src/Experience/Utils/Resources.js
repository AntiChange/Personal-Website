import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import EventEmitter from "./EventEmitter.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import LoadingScreen from "../LoadingScreen.js";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.sources = sources;

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;
    this.loadingScreen = new LoadingScreen();

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    // Temporarily disable scrolling while loading page
    document.body.classList.add("stop-scrolling");
    const loadingBarElement = document.querySelector(".loading-bar");
    this.loaders = {};
    this.loadingManager = new THREE.LoadingManager(
      // Loaded
      () => {
        window.setTimeout(() => {
          this.loadingScreen.loadedAnimation();

          loadingBarElement.classList.add("ended");
          loadingBarElement.style.transform = "";

          this.trigger("ready");
        }, 500);
        window.setTimeout(() => {
          document.body.classList.remove("stop-scrolling");
          document.body.classList.add("done-loading");
          $('#blocker').remove();
          
          elements.addClass("active");
        }, 3000);
      },
      // Progress
      (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal;
        loadingBarElement.style.transform = `scaleX(${progressRatio})`;
      }
    );
    this.loaders.gltfLoader = new GLTFLoader(this.loadingManager);
    this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager);
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(
      this.loadingManager
    );
    this.loaders.fontLoader = new FontLoader(this.loadingManager);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    this.loaders.gltfLoader.setDRACOLoader(dracoLoader);
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "font") {
        this.loaders.fontLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;

    this.loaded++;
  }
}
