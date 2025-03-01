import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

function loadTexture(path) {
  const texture = textureLoader.load(path);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  return texture;
}

const textures = {
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

export const blocks = {
  empty: {
    id: 0,
    name: 'empty',
    visible: false
  },
  grass: {
    id: 1,
    name: 'grass',
    material: [
      new THREE.MeshLambertMaterial({ map: textures.norzPodzolSide }), // right
      new THREE.MeshLambertMaterial({ map: textures.norzPodzolSide }), // left
      new THREE.MeshLambertMaterial({ map: textures.norzPodzol }), // top
      new THREE.MeshLambertMaterial({ map: textures.norzDirt }), // bottom
      new THREE.MeshLambertMaterial({ map: textures.norzPodzolSide }), // front
      new THREE.MeshLambertMaterial({ map: textures.norzPodzolSide })  // back
    ]
  },
  dirt: {
    id: 2,
    name: 'dirt',
    material: new THREE.MeshLambertMaterial({ map: textures.norzDirt })
  },
  stone: {
    id: 3,
    name: 'stone',
    material: new THREE.MeshLambertMaterial({ map: textures.norzStone }),
    scale: { x: 30, y: 30, z: 30 },
    scarcity: 0.8
  },
  coalOre: {
    id: 4,
    name: 'coal_ore',
    material: new THREE.MeshLambertMaterial({ map: textures.norzRedSand }),
    scale: { x: 20, y: 20, z: 20 },
    scarcity: 0.8
  },
  ironOre: {
    id: 5,
    name: 'iron_ore',
    material: new THREE.MeshLambertMaterial({ map: textures.norzYellowTerracotta }),
    scale: { x: 40, y: 40, z: 40 },
    scarcity: 0.9
  }
};

export const resources = [
  blocks.stone,
  blocks.coalOre,
  blocks.ironOre
];