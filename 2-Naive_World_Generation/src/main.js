import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { World } from './world.js';

// FPS Counter
const stats = new Stats()
document.body.appendChild(stats.dom)

// Scene
const scene = new THREE.Scene();
const world = new World();
world.generate();
scene.add(world);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x80a0e0);
document.body.appendChild( renderer.domElement );

// Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight );
camera.position.set(-32, 16, -32);
camera.lookAt(0, 0, 0);

// Orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set(16, 0, 16);
controls.update();

// Lighting
function setupLights() {
    const sun = new THREE.DirectionalLight();
    sun.position.set(1, 2, 3);
    scene.add(sun);

    const ambient = new THREE.AmbientLight();
    ambient.intensity = 0.5;
    scene.add(ambient);
}

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();  // Update orbital controller
    stats.update();     // Update FPS counter
	renderer.render( scene, camera );
}

// Window resize event handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
// GUI Setup
// const gui = new GUI();
// const folder = gui.addFolder('Cube');
// folder.add(cube.position, 'x', -2, 2, 0.1).name('X Position');
// folder.addColor(cube.material, 'color');

setupLights();
animate();