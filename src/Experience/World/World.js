import Experience from "../Experience.js";
import Environment from "./Environment.js";
import TrebleClef from "./TrebleClef.js";
import Staff from "./Staff.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.trebleclef = new TrebleClef();
      this.staff = new Staff();
      this.environment = new Environment();

      // Initial animation once loaded
      this.trebleclef.playAnimation();
    });
  }

  update() {
    if (this.trebleclef) this.trebleclef.update();
  }
}
