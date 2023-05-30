import "./style.css";
import Experience from "./Experience/Experience.js";

require('./skrollr.js')
require('./sweetalert2.all.min.js')

// Start ThreeJS
const experience = new Experience(document.querySelector("canvas.webgl"));