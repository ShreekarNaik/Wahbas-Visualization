import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { InfiniteGridHelper } from "./InfiniteGridHelper.js";
import themes from "./theme.js";

const currentTheme = themes.currentTheme;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(currentTheme.backgroundColor);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(6, 8, 14);
orbit.enableDamping = true;
orbit.dampingFactor = 0.01;
orbit.update();

const gridHelper = new InfiniteGridHelper(2, 4, currentTheme.gridColor, 100);
scene.add(gridHelper);

function createArrow(dir, color, length = 4.5) {
	const arrow = new THREE.ArrowHelper(
		dir.clone().normalize(),
		new THREE.Vector3(0, 0, 0),
		length,
		color
	);
	return arrow;
}

function addAxes(scene) {
	scene.add(
		createArrow(new THREE.Vector3(1, 0, 0), currentTheme.arrowXColor)
	);
	scene.add(
		createArrow(new THREE.Vector3(0, 1, 0), currentTheme.arrowYColor)
	);
	scene.add(
		createArrow(new THREE.Vector3(0, 0, 1), currentTheme.arrowZColor)
	);
}

function generateRotationMatrix(A, B) {
	if (!A)
		A = new THREE.Vector3(
			Math.random(),
			Math.random(),
			Math.random()
		).normalize();
	if (!B)
		B = new THREE.Vector3(
			Math.random(),
			Math.random(),
			Math.random()
		).normalize();
	// while (Math.abs(A.dot(B)) > 0.99) {
	// 	B = new THREE.Vector3(
	// 		Math.random(),
	// 		Math.random(),
	// 		Math.random()
	// 	).normalize();
	// }
	let C = new THREE.Vector3().crossVectors(A, B).normalize();
	let B_ortho = new THREE.Vector3().crossVectors(C, A).normalize();
	let R = new THREE.Matrix3();
	R.set(A.x, B_ortho.x, C.x, A.y, B_ortho.y, C.y, A.z, B_ortho.z, C.z);
	return R;
}

function visualizeRotation(scene, R, length = 0.5) {
	const iNew = new THREE.Vector3(1, 0, 0).applyMatrix3(R);
	const jNew = new THREE.Vector3(0, 1, 0).applyMatrix3(R);
	const kNew = new THREE.Vector3(0, 0, 1).applyMatrix3(R);
	scene.add(createArrow(iNew, currentTheme.arrowXColor, 3)); // Light red for rotated X
	scene.add(createArrow(jNew, currentTheme.arrowYColor, 3)); // Light green for rotated Y
	scene.add(createArrow(kNew, currentTheme.arrowZColor, 3)); // Light blue for rotated Z
}

function updateA(t) {
	// Dynamic vector A based on time t
	return new THREE.Vector3(
		Math.sin(t / 1000),
		Math.cos(t / 1000),
		1
	).normalize();
}

const B = new THREE.Vector3(1, 2, 3).normalize();

// Add original fixed axes for reference
const xAxis = createArrow(new THREE.Vector3(1, 0, 0), 0xff0000, 4.5); // Red for X
const yAxis = createArrow(new THREE.Vector3(0, 1, 0), 0x00ff00, 4.5); // Green for Y
const zAxis = createArrow(new THREE.Vector3(0, 0, 1), 0x0000ff, 4.5); // Blue for Z
scene.add(xAxis, yAxis, zAxis);

function clearSceneArrows() {
	scene.children = scene.children.filter(
		(child) =>
			!(child instanceof THREE.ArrowHelper) ||
			child === xAxis ||
			child === yAxis ||
			child === zAxis
	);
}

function getvs(R, w, noise_level) {
	// Multiply R with the matrix of ws
	let vs = [];
	for (let i = 0; i < w.length; i++) {
		let v = new THREE.Vector3(w[i].x, w[i].y, w[i].z).applyMatrix3(R);
		vs.push(v + noise_level[i] * Math.random());
	}
	return vs;
}

function wabhas(ws, vs) {
	// temporary return
	let R_est = new THREE.Matrix3();
	R_est.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
	return R_est;
}

addAxes(scene);
const rotationMatrix = generateRotationMatrix(
	new THREE.Vector3(1, -2, 0),
	new THREE.Vector3(1, 2, 3)
);
visualizeRotation(scene, rotationMatrix);

// Create a random list of n=3 dimensional reference vectors
const referenceVectors = [];
const nvectors = 4;
const scale = 5;
for (let i = 0; i < nvectors; i++) {
	referenceVectors.push(
		new THREE.Vector3(
			Math.random() * scale,
			Math.random() * scale,
			Math.random() * scale
		)
	);
}
console.log(referenceVectors);

const noise_levels = [0.1, 0.1, 0.2];

// extrapolate noise level to all vectors
for (let i = 0; i < nvectors; i++) {
	noise_levels.push(0.1);
}

function animate() {
	requestAnimationFrame(animate);

	// Clear previous arrows except the original axes
	clearSceneArrows();

	// Update dynamic A vector
	const time = performance.now();
	const A = updateA(time);

	const rotationMatrix = generateRotationMatrix(A, B);
	visualizeRotation(scene, rotationMatrix);

	const vs = getvs(rotationMatrix, referenceVectors, noise_levels);

	const R_est = wabhas(referenceVectors, vs);

	// Visualize the estimated rotation matrix
	visualizeRotation(scene, R_est);

	orbit.update();
	renderer.render(scene, camera);
}
animate();
