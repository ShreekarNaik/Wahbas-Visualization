import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { InfiniteGridHelper } from "./InfiniteGridHelper.js";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background.
// renderer.setClearColor(0x010101);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

// Sets orbit control to move the camera around.
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;
orbit.dampingFactor = 0.01;

// Camera positioning.
camera.position.set(6, 8, 14);
// Has to be done everytime we update the camera position.
orbit.update();

// Creates a 12 by 12 grid helper.
const gridHelper = new InfiniteGridHelper(2, 4, 0xffffff, 100);
// color the grid lines white.
// gridHelper.material.color.set(0xffffff);
scene.add(gridHelper);

// Testing

const arrowLength = 4.5; // Length of the arrows
const arrowColorX = 0xff0000; // Red for X-axis
const arrowColorY = 0x00ff00; // Green for Y-axis
const arrowColorZ = 0x0000ff; // Blue for Z-axis

// Create arrows for each axis
const xArrow = new THREE.ArrowHelper(
	new THREE.Vector3(1, 0, 0),
	new THREE.Vector3(0, 0, 0),
	arrowLength,
	arrowColorX
);
const yArrow = new THREE.ArrowHelper(
	new THREE.Vector3(0, 1, 0),
	new THREE.Vector3(0, 0, 0),
	arrowLength,
	arrowColorY
);
const zArrow = new THREE.ArrowHelper(
	new THREE.Vector3(0, 0, 1),
	new THREE.Vector3(0, 0, 0),
	arrowLength,
	arrowColorZ
);

scene.add(xArrow);
scene.add(yArrow);
scene.add(zArrow);

// Testing ends

// Testing 2
// function createAxisCylinder(start, end, color) {
// 	const direction = new THREE.Vector3().subVectors(end, start);
// 	const length = direction.length();
// 	direction.normalize();

// 	const cylinderGeometry = new THREE.CylinderGeometry(0.05, 0.05, length); // Adjust radius for thickness
// 	const cylinderMaterial = new THREE.MeshBasicMaterial({ color: color });
// 	const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

// 	cylinder.position.copy(start);
// 	cylinder.lookAt(end); // Orient the cylinder towards the end point

// 	return cylinder;
// }

// Add axes using cylinders
// scene.add(
// 	createAxisCylinder(
// 		new THREE.Vector3(0, 0, 0),
// 		new THREE.Vector3(5, 0, 0),
// 		0xff0000
// 	)
// ); // X-axis
// scene.add(
// 	createAxisCylinder(
// 		new THREE.Vector3(0, 0, 0),
// 		new THREE.Vector3(0, 5, 0),
// 		0x00ff00
// 	)
// ); // Y-axis
// scene.add(
// 	createAxisCylinder(
// 		new THREE.Vector3(0, 0, 1),
// 		new THREE.Vector3(5, -1, 0),
// 		0x0000ff
// 	)
// ); // Z-axis

// Testing 2 ends

// // Creates an axes helper with an axis length of 4.
// const axesHelper = new THREE.AxesHelper(5);
// axesHelper.scale.setScalar(1.01);
// axesHelper.material.linewidth = 0.1;
// scene.add(axesHelper);

function animate() {
	requestAnimationFrame(animate);
	orbit.update();

	renderer.render(scene, camera);
}
animate();
// renderer.setAnimationLoop(animate);

// window.addEventListener("resize", function () {
// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();
// 	renderer.setSize(window.innerWidth, window.innerHeight);
// });
