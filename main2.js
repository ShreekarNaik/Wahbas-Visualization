// import * as THREE from "three";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add Axes and Dots
createAxes(scene);
createDots(scene, 10);

camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();

function createDots(scene, range) {
	const dotMaterial = new THREE.PointsMaterial({
		color: 0x888888,
		size: 0.1,
	});
	const dotGeometry = new THREE.BufferGeometry();
	const vertices = [];

	for (let x = -range; x <= range; x++) {
		for (let y = -range; y <= range; y++) {
			for (let z = -range; z <= range; z++) {
				vertices.push(x, y, z);
			}
		}
	}

	dotGeometry.setAttribute(
		"position",
		new THREE.Float32BufferAttribute(vertices, 3)
	);
	const dots = new THREE.Points(dotGeometry, dotMaterial);
	scene.add(dots);
}

function createAxes(scene) {
	const size = 20;
	const divisions = 20;

	const gridHelper = new THREE.GridHelper(
		size,
		divisions,
		0xff0000,
		0x00ff00
	);
	scene.add(gridHelper);

	const zAxisMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
	const zAxisGeometry = new THREE.BufferGeometry().setFromPoints([
		new THREE.Vector3(0, 0, -size / 2),
		new THREE.Vector3(0, 0, size / 2),
	]);
	const zAxis = new THREE.Line(zAxisGeometry, zAxisMaterial);
	scene.add(zAxis);
}
