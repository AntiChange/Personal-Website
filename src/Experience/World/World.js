import Experience from "../Experience.js";
import Environment from "./Environment.js";
import TrebleClef from "./TrebleClef.js";
import Staff from "./Staff.js";
import About from "../Sections/About.js";

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
      this.about = new About();

      // Initial animation once loaded
      if (this.trebleclef) this.trebleclef.playAnimation();
      if (this.staff) this.staff.playAnimation();
    });
  }

  update() {
    if (this.trebleclef) this.trebleclef.breathe();
    if (this.staff) this.staff.breathe();
    if (this.about) this.about.breathe();
  }
}
