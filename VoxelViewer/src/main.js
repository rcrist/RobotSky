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

// Texture loader
const textureLoader = new THREE.TextureLoader();

function loadTexture(path) {
    const texture = textureLoader.load(path);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    return texture;
}

const textures = {
    // Minecraft textures
    dirt: loadTexture('textures/dirt.png'),
    grass: loadTexture('textures/grass.png'),
    grassSide: loadTexture('textures/grass_side.png'),
    stone: loadTexture('textures/stone.png'),
    coalOre: loadTexture('textures/coal_ore.png'),
    ironOre: loadTexture('textures/iron_ore.png'),

    // Norzeteus Space textures
    norzDirt: loadTexture('norz_textures/dirt.png'),
    norzMoss: loadTexture('norz_textures/moss_block.png'),
    norzPodzol: loadTexture('norz_textures/podzol_top.png'),
    norzPodzolSide: loadTexture('norz_textures/podzol_side.png'),
    norzRedSand: loadTexture('norz_textures/red_sand.png'),
    norzStone: loadTexture('norz_textures/stonebrick0.png'),
    norzYellowTerracotta: loadTexture('norz_textures/yellow_terracotta.png'),
  };

// Test cube
const geometry = new THREE.BoxGeometry();
const grassMaterial = [
            new THREE.MeshLambertMaterial({ map: textures.grassSide }), // right
            new THREE.MeshLambertMaterial({ map: textures.grassSide }), // left
            new THREE.MeshLambertMaterial({ map: textures.grass }), // top
            new THREE.MeshLambertMaterial({ map: textures.dirt }), // bottom
            new THREE.MeshLambertMaterial({ map: textures.grassSide }), // front
            new THREE.MeshLambertMaterial({ map: textures.grassSide })  // back
          ];
const dirtMaterial = new THREE.MeshLambertMaterial({ map: textures.dirt });
const stoneMaterial = new THREE.MeshLambertMaterial({ map: textures.stone });
const coalMaterial = new THREE.MeshLambertMaterial({ map: textures.coalOre });
const ironMaterial = new THREE.MeshLambertMaterial({ map: textures.ironOre });

const norzDirtMaterial = new THREE.MeshLambertMaterial({ map: textures.norzDirt });
const norzPodzolMaterial  = [
    new THREE.MeshLambertMaterial({ map: textures.norzPodzolSide }), // right
    new THREE.MeshLambertMaterial({ map: textures.norzPodzolSide }), // left
    new THREE.MeshLambertMaterial({ map: textures.norzPodzol }), // top
    new THREE.MeshLambertMaterial({ map: textures.norzDirt }), // bottom
    new THREE.MeshLambertMaterial({ map: textures.norzPodzolSide }), // front
    new THREE.MeshLambertMaterial({ map: textures.norzPodzolSide })  // back
  ];
const norzMossMaterial = new THREE.MeshLambertMaterial({ map: textures.norzMoss });
const norzRedSandMaterial = new THREE.MeshLambertMaterial({ map: textures.norzRedSand });
const norzStoneMaterial = new THREE.MeshLambertMaterial({ map: textures.norzStone });
const norzYellowTerracottaMaterial = new THREE.MeshLambertMaterial({ map: textures.norzYellowTerracotta });

const material = { 
    grass: grassMaterial,
    stone: stoneMaterial,
    dirt: dirtMaterial,
    coal: coalMaterial,
    iron: ironMaterial,
    norzDirt: norzDirtMaterial,
    norzPodzol: norzPodzolMaterial,
    norzMoss: norzMossMaterial,
    norzRedSand: norzRedSandMaterial,
    norzStone: norzStoneMaterial,
    norzYellowTerracotta: norzYellowTerracottaMaterial,
 };
let cube = new THREE.Mesh( geometry, material['grass'] );
scene.add( cube );

// Render loop
function animate() {
    requestAnimationFrame(animate);
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
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
const materialFolder = gui.addFolder('Texture');
materialFolder.add(cube, 'material', { 
    grass: grassMaterial,
    stone: stoneMaterial,
    dirt: dirtMaterial,
    coal: coalMaterial,
    iron: ironMaterial,
    norzDirt: norzDirtMaterial,
    norzPodzol: norzPodzolMaterial,
    norzMoss: norzMossMaterial,
    norzRedSand: norzRedSandMaterial,
    norzStone: norzStoneMaterial,
    norzYellowTerracotta: norzYellowTerracottaMaterial,
 }).onChange( value => {
    cube.material = value;
 }).name("Material");

const folder = gui.addFolder('Cube Position');
folder.add(cube.position, 'x', -2, 2, 0.1).name('X Position');
folder.add(cube.position, 'y', -2, 2, 0.1).name('Y Position');
folder.add(cube.position, 'x', -2, 2, 0.1).name('Z Position');

setupLights();
animate();