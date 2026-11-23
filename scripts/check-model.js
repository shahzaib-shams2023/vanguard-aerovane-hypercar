import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import fs from 'fs';

// Read ferrari.glb file directly
const buffer = fs.readFileSync('./public/models/ferrari.glb');
const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

// We need a mock DOM/loader or we can check with a script in headless browser or Node.
// In headless browser is even easier since GLTFLoader + DRACOLoader runs in browser with wasm natively!
console.log('File size:', buffer.length);

