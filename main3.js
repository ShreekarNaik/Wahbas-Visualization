import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(windowWidth, windowHeight);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = windowWidth / windowHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

// Create Icosahedron
const geo = new THREE.IcosahedronGeometry(2, 1);
const mat = new THREE.MeshStandardMaterial({
	color: 0x00ff00,
	flatShading: true,
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

// Create wireframe
const wiremat = new THREE.MeshBasicMaterial({
	color: 0x000000,
	wireframe: true,
	transparent: true,
	opacity: 0.5,
});
const wireframe = new THREE.Mesh(geo, wiremat);
wireframe.scale.setScalar(1.001);
mesh.add(wireframe);

// Create Hemisphere Light
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);

function animate(t = 0) {
	requestAnimationFrame(animate);
	// mesh.rotation.x += 0.001;
	// mesh.rotation.y += 0.005;
	renderer.render(scene, camera);
}

animate();
