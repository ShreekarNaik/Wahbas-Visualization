import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { InfiniteGridHelper } from "./InfiniteGridHelper.js";
// import { parseColor, rgb_theme } from "./theme.js";
import themes from "./theme.js";

const currentTheme = themes.currentTheme;

// const currentTheme = rgb_theme.dark; // Switch to 'light' as needed

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background.
renderer.setClearColor(currentTheme.backgroundColor);

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
const gridHelper = new InfiniteGridHelper(2, 4, currentTheme.gridColor, 100);

// color the grid lines white.
// gridHelper.material.color.set(0xffffff);
scene.add(gridHelper);

const arrowLength = 4.5; // Length of the arrows
const arrowColorX = currentTheme.arrowXColor; // Red for X-axis
const arrowColorY = currentTheme.arrowYColor; // Green for Y-axis
const arrowColorZ = currentTheme.arrowZColor; // Blue for Z-axis

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

// Testing 3
// Orientation doesn't work properly
// function createLineSprite(start, end, thickness, color) {
// 	// Convert to Vector3 if not already
// 	const startPoint = new THREE.Vector3(...start);
// 	const endPoint = new THREE.Vector3(...end);

// 	// Calculate distance and direction
// 	const distance = startPoint.distanceTo(endPoint);
// 	const direction = new THREE.Vector3()
// 		.subVectors(endPoint, startPoint)
// 		.normalize();

// 	// Create a canvas to draw the line texture
// 	const canvas = document.createElement("canvas");
// 	canvas.width = 2;
// 	canvas.height = 64;
// 	const context = canvas.getContext("2d");

// 	// Draw the line as a vertical rectangle
// 	context.fillStyle = color;
// 	context.fillRect(0, 0, 2, 64);

// 	// Create texture
// 	const texture = new THREE.CanvasTexture(canvas);
// 	texture.magFilter = THREE.LinearFilter;
// 	texture.minFilter = THREE.LinearFilter;

// 	// Create sprite material
// 	const material = new THREE.SpriteMaterial({ map: texture, color: color });

// 	// Create sprite
// 	const sprite = new THREE.Sprite(material);

// 	// Set sprite scale to match line thickness and distance
// 	sprite.scale.set(thickness, distance, 1);

// 	// Position sprite at the midpoint
// 	const midpoint = new THREE.Vector3()
// 		.addVectors(startPoint, endPoint)
// 		.multiplyScalar(0.5);
// 	sprite.position.copy(midpoint);

// 	// Align sprite with the line direction
// 	sprite.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

// 	sprite.onBeforeRender = function (renderer, scene, camera) {
// 		const worldQuaternion = new THREE.Quaternion();
// 		sprite.getWorldQuaternion(worldQuaternion);
// 		sprite.quaternion.copy(worldQuaternion);
// 	};

// 	return sprite;
// }

// const line = createLineSprite([0, 0, 0], [0, 5, 5], 0.2, "#ff0000");
// scene.add(line);

// Testing 3 ends

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
