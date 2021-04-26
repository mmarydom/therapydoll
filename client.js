// client-side js
// run by the browser each time your view template is loaded


//Import required source code
import * as THREE from 'lib/three.module.js';

import { OrbitControls } from 'lib/OrbitControls.js';
import { GLTFLoader } from 'lib/GLTFLoader.js';

//Identify div in HTML to place scene
var container = document.getElementById('space');

//Create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xdfdfdf);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth / 2 * 10, window.innerHeight / 2 + 100);
container.appendChild(renderer.domElement);

//0x2E8E99

//Material to be added to model
var newMaterial = new THREE.MeshStandardMaterial({color: 0x2E8E00});

//Load GLTF model, add material, and add it to the scene
const loader = new GLTFLoader().load(
  "models/Xbot.glb",
  function(gltf) {

    //Scan loaded model for mesh and apply defined material if mesh is present
    gltf.scene.traverse(function(child) {
      if (child.isMesh) {
        child.material = newMaterial;
      }
    });

    //Add model to scene
    scene.add(gltf.scene);
  },
  undefined,
  function(error) {
    console.error(error);
  }
);


//Add Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 2;
controls.maxDistance = 10;
controls.target.set(0, 0, -0.2);
controls.update();

// Position our camera so we can see the shape
camera.position.z = 4;

// Add a directional light to the scene
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
scene.add(directionalLight);

// Add an ambient light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// Start the render loop
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();

//Respond to Window Resizing
window.addEventListener("resize", onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth/ 2, window.innerHeight / 2);
  render();
}
