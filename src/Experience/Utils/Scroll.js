import Experience from "../Experience.js";
import EventEmitter from "./EventEmitter.js";

export default class Scroll extends EventEmitter {
  constructor() {
    super();

    // Setup
    this.scrollX = 0;
    this.experience = new Experience();

    // Scroll event
    window.addEventListener("scroll", () => {
      this.scrollX = (window.scrollY / this.experience.sizes.width) * 10;
    });
  }
}
