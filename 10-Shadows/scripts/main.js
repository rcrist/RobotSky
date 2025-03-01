import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { createUI } from './ui.js';
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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );

// Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight );
camera.position.set(-32, 48, -32);
camera.lookAt(0, 0, 0);

// Orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set(16, 0, 16);
controls.update();

// Lighting
function setupLights() {
    const sun = new THREE.DirectionalLight();
    sun.position.set(50, 50, 50);
    sun.castShadow = true;
    sun.shadow.camera.left = -40;
    sun.shadow.camera.right = 40;
    sun.shadow.camera.top = 40;
    sun.shadow.camera.bottom = -40
    sun.shadow.camera.near = 0.1;
    sun.shadow.camera.far = 100;
    sun.shadow.bias = 0.0005;
    sun.shadow.mapsize = new THREE.Vector2(1024, 1024);
    scene.add(sun);

    const shadowHelper = new THREE.CameraHelper(sun.shadow.camera);
    scene.add(shadowHelper);

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
createUI(world);
setupLights();
animate();