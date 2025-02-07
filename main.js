// import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import { InfiniteGridHelper } from "./InfiniteGridHelper.js";
// import themes from "./theme.js";

// const currentTheme = themes.currentTheme;
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// renderer.setClearColor(currentTheme.backgroundColor);

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
// 	45,
// 	window.innerWidth / window.innerHeight,
// 	0.1,
// 	1000
// );
// const orbit = new OrbitControls(camera, renderer.domElement);
// camera.position.set(6, 8, 14);
// orbit.enableDamping = true;
// orbit.dampingFactor = 0.01;
// orbit.update();

// const gridHelper = new InfiniteGridHelper(2, 4, currentTheme.gridColor, 100);
// scene.add(gridHelper);

// function createArrow(dir, color, length = 4.5) {
// 	const arrow = new THREE.ArrowHelper(
// 		dir.clone().normalize(),
// 		new THREE.Vector3(0, 0, 0),
// 		length,
// 		color
// 	);
// 	return arrow;
// }

// function generateRotationMatrix(A, B) {
// 	if (!A)
// 		A = new THREE.Vector3(
// 			Math.random(),
// 			Math.random(),
// 			Math.random()
// 		).normalize();
// 	if (!B)
// 		B = new THREE.Vector3(
// 			Math.random(),
// 			Math.random(),
// 			Math.random()
// 		).normalize();
// 	// while (Math.abs(A.dot(B)) > 0.99) {
// 	// 	B = new THREE.Vector3(
// 	// 		Math.random(),
// 	// 		Math.random(),
// 	// 		Math.random()
// 	// 	).normalize();
// 	// }
// 	let C = new THREE.Vector3().crossVectors(A, B).normalize();
// 	let B_ortho = new THREE.Vector3().crossVectors(C, A).normalize();
// 	let R = new THREE.Matrix3();
// 	R.set(A.x, B_ortho.x, C.x, A.y, B_ortho.y, C.y, A.z, B_ortho.z, C.z);
// 	return R;
// }

// function visualizeRotation(scene, R, length = 0.5) {
// 	const iNew = new THREE.Vector3(1, 0, 0).applyMatrix3(R);
// 	const jNew = new THREE.Vector3(0, 1, 0).applyMatrix3(R);
// 	const kNew = new THREE.Vector3(0, 0, 1).applyMatrix3(R);
// 	scene.add(createArrow(iNew, currentTheme.arrowXColor, 3)); // Light red for rotated X
// 	scene.add(createArrow(jNew, currentTheme.arrowYColor, 3)); // Light green for rotated Y
// 	scene.add(createArrow(kNew, currentTheme.arrowZColor, 3)); // Light blue for rotated Z
// }

// addAxes(scene);
// const rotationMatrix = generateRotationMatrix(
// 	new THREE.Vector3(1, -2, 0),
// 	new THREE.Vector3(1, 2, 3)
// );
// visualizeRotation(scene, rotationMatrix);

// function animate() {
// 	requestAnimationFrame(animate);
// 	orbit.update();
// 	renderer.render(scene, camera);
// }
// animate();

//
//
// Rotation working one but unnecessary refactoring happened
//
//
// import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import { InfiniteGridHelper } from "./InfiniteGridHelper.js";
// import themes from "./theme.js";

// const currentTheme = themes.currentTheme;

// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// renderer.setClearColor(currentTheme.backgroundColor);

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
// 	45,
// 	window.innerWidth / window.innerHeight,
// 	0.1,
// 	1000
// );

// const orbit = new OrbitControls(camera, renderer.domElement);
// orbit.enableDamping = true;
// orbit.dampingFactor = 0.01;
// camera.position.set(6, 8, 14);
// orbit.update();

// const gridHelper = new InfiniteGridHelper(2, 4, currentTheme.gridColor, 100);
// scene.add(gridHelper);

// const arrowLength = 4.5;
// let xArrow, yArrow, zArrow;

// function addAxes(scene) {
// 	scene.add(
// 		createArrow(new THREE.Vector3(1, 0, 0), currentTheme.arrowXColor)
// 	);
// 	scene.add(
// 		createArrow(new THREE.Vector3(0, 1, 0), currentTheme.arrowYColor)
// 	);
// 	scene.add(
// 		createArrow(new THREE.Vector3(0, 0, 1), currentTheme.arrowZColor)
// 	);
// }

// function generateRotationMatrix(t) {
// 	let A = new THREE.Vector3(
// 		Math.sin(t / 100),
// 		Math.cos(t / 200 - 20),
// 		Math.sin(t / 100 + 30)
// 	).normalize();

// 	let B = new THREE.Vector3(1, 1, 1).normalize();

// 	while (Math.abs(A.dot(B)) > 0.99) {
// 		B = new THREE.Vector3(
// 			Math.random(),
// 			Math.random(),
// 			Math.random()
// 		).normalize();
// 	}

// 	let C = new THREE.Vector3().crossVectors(A, B).normalize();
// 	let B_ortho = new THREE.Vector3().crossVectors(C, A).normalize();

// 	let R = new THREE.Matrix3();
// 	R.set(A.x, B_ortho.x, C.x, A.y, B_ortho.y, C.y, A.z, B_ortho.z, C.z);

// 	return { R, A, B_ortho, C };
// }

// function updateAxes(t) {
// 	const { A, B_ortho, C } = generateRotationMatrix(t);

// 	if (xArrow) scene.remove(xArrow);
// 	if (yArrow) scene.remove(yArrow);
// 	if (zArrow) scene.remove(zArrow);

// 	xArrow = new THREE.ArrowHelper(
// 		A,
// 		new THREE.Vector3(0, 0, 0),
// 		arrowLength,
// 		currentTheme.arrowXColor
// 	);
// 	yArrow = new THREE.ArrowHelper(
// 		B_ortho,
// 		new THREE.Vector3(0, 0, 0),
// 		arrowLength,
// 		currentTheme.arrowYColor
// 	);
// 	zArrow = new THREE.ArrowHelper(
// 		C,
// 		new THREE.Vector3(0, 0, 0),
// 		arrowLength,
// 		currentTheme.arrowZColor
// 	);

// 	scene.add(xArrow);
// 	scene.add(yArrow);
// 	scene.add(zArrow);
// }

// addAxes(scene);

// let time = 0;
// function animate() {
// 	requestAnimationFrame(animate);
// 	orbit.update();
// 	updateAxes(time);
// 	time += 0.05;
// 	renderer.render(scene, camera);
// }
// animate();

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

//
//
// Math Helpers
function wahbasR(vectorsV, vectorsB) {
	const B = new THREE.Matrix3();

	// Calculate matrix B
	vectorsB.forEach((bi, i) => {
		const vi = vectorsV[i];
		const biVec = new THREE.Vector3(...bi);
		const viVec = new THREE.Vector3(...vi);
		const outerProduct = new THREE.Matrix3();
		outerProduct.set(
			biVec.x * viVec.x,
			biVec.x * viVec.y,
			biVec.x * viVec.z,
			biVec.y * viVec.x,
			biVec.y * viVec.y,
			biVec.y * viVec.z,
			biVec.z * viVec.x,
			biVec.z * viVec.y,
			biVec.z * viVec.z
		);
		B.add(outerProduct);
	});

	// SVD (using Three.js for eigen decomposition instead)
	const { U, Vt } = svdDecomposition(B);

	// Compute R_est = U @ diag([1, 1, det(U @ Vt)]) @ Vt
	const detUVt = determinant3(U.multiply(Vt));
	const diag = new THREE.Matrix3();
	diag.set(1, 0, 0, 0, 1, 0, 0, 0, detUVt);

	const R_est = new THREE.Matrix3().multiplyMatrices(U, diag).multiply(Vt);

	return R_est;
}

// Helper: Random normalized vector
function randomNormalizedVector() {
	const vec = new THREE.Vector3(Math.random(), Math.random(), Math.random());
	return vec.normalize();
}

// Initialize references function
function initializeReferences(R_true, numRefs = 5) {
	const w_new = Array.from({ length: numRefs }, randomNormalizedVector);
	const v = w_new.map((vec) => {
		const v = new THREE.Vector3().copy(vec).applyMatrix4(R_true);
		return [v.x, v.y, v.z];
	});

	// Add noise and normalize
	const noiseLevels = [0.01, 0.01, 0.01, 0.02, 0.001];
	const b = v.map((vec, i) => {
		const noise = new THREE.Vector3(
			noiseLevels[i] * Math.random(),
			noiseLevels[i] * Math.random(),
			noiseLevels[i] * Math.random()
		);
		const noisyVec = new THREE.Vector3(...vec).add(noise).normalize();
		return [noisyVec.x, noisyVec.y, noisyVec.z];
	});

	return { v, b };
}

// Math Helpers End
//
//

function createArrow(dir, color, length = 4.5) {
	const arrow = new THREE.ArrowHelper(
		dir.clone().normalize(),
		new THREE.Vector3(0, 0, 0),
		length,
		color
	);
	return arrow;
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
	scene.add(createArrow(iNew, currentTheme.arrowXColor, 3));
	scene.add(createArrow(jNew, currentTheme.arrowYColor, 3));
	scene.add(createArrow(kNew, currentTheme.arrowZColor, 3));
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

function animate() {
	requestAnimationFrame(animate);

	// Clear previous arrows except the original axes
	clearSceneArrows();

	// Update dynamic A vector
	const time = performance.now();
	const A = updateA(time);

	// Generate rotation matrix and visualize
	const rotationMatrix = generateRotationMatrix(A, B);
	visualizeRotation(scene, rotationMatrix);

	orbit.update();
	renderer.render(scene, camera);
}

animate();
