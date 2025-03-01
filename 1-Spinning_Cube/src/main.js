import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// FPS Counter
const stats = new Stats()
document.body.appendChild(stats.dom)

// Scene
const scene = new THREE.Scene();

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight );
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);

// Orbit controls
const controls = new OrbitControls( camera, renderer.domElement );

// Lighting
function setupLights() {
    const sun = new THREE.DirectionalLight();
    sun.position.set(1, 2, 3);
    scene.add(sun);

    const ambient = new THREE.AmbientLight();
    ambient.intensity = 0.5;
    scene.add(ambient);
}

// Test cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Render loop
function animate() {
    requestAnimationFrame(animate);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
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
const gui = new GUI();
const folder = gui.addFolder('Cube');
folder.add(cube.position, 'x', -2, 2, 0.1).name('X Position');
folder.addColor(cube.material, 'color');

setupLights();
animate();