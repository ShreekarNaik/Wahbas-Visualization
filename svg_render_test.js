// Works Great
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { SVGRenderer } from "three/addons/renderers/SVGRenderer.js";
import { TTFLoader } from "three/addons/loaders/TTFLoader.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

console.log(THREE);

let camera, scene, renderer, controls;

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera(
		33,
		window.innerWidth / window.innerHeight,
		0.1,
		100
	);
	camera.position.z = 10;

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0, 0, 0);

	renderer = new SVGRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.01;
	controls.update();

	//

	const vertices = [];
	const divisions = 50;

	for (let i = 0; i <= divisions; i++) {
		const v = (i / divisions) * (Math.PI * 2);

		const x = Math.sin(v);
		const z = Math.cos(v);

		vertices.push(x, 0, z);
	}

	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute(
		"position",
		new THREE.Float32BufferAttribute(vertices, 3)
	);

	//

	for (let i = 1; i <= 4; i++) {
		const material = new THREE.LineBasicMaterial({
			color: Math.random() * 0xffffff,
			linewidth: Math.random() * 10 + 1,
		});
		const line = new THREE.Line(geometry, material);
		line.scale.setScalar(i / 3);
		scene.add(line);
	}

	const material = new THREE.LineDashedMaterial({
		color: "blue",
		linewidth: 2,
		dashSize: 10,
		gapSize: 10,
	});
	const line = new THREE.Line(geometry, material);
	line.scale.setScalar(2);
	scene.add(line);

	//
	// Add Text
	// const loader = new FontLoader();
	// loader.load("fonts/coda_regular.json", function (font) {
	// 	const geometry = new TextGeometry("0    1    2   3  4", {
	// 		font: font,
	// 		size: 0.5,
	// 		height: 0,
	// 		curveSegments: 24,
	// 		bevelEnabled: false,
	// 	});
	// 	const material = new THREE.MeshBasicMaterial({ color: "#dddddd" });
	// 	const mesh = new THREE.Mesh(geometry, material);
	// 	scene.add(mesh);
	// });

	// const textElement = document.createElement("div");
	// textElement.innerText = "Hello, 3D Scene!";
	// textElement.style.position = "absolute";
	// textElement.style.fontSize = "24px";
	// textElement.style.color = "white";

	// // Append it to the document body (but it will be positioned in the 3D space)
	// document.body.appendChild(textElement);

	// Load Coda-Regular.ttf font from fonts directory and create text geometry

	const loader = new TTFLoader();
	const fontLoader = new FontLoader();
	loader.load(
		"./fonts/Coda-Regular.ttf", // Path to the font file
		(fnt) => {
			// Parse the font using FontLoader once TTF file is loaded
			const font = fontLoader.parse(fnt);

			// Create a TextGeometry with the parsed font
			const geometry = new TextGeometry("Hello three.js!", {
				font: font,
				size: 0.1,
				height: 0,
				curveSegments: 12,
				bevelEnabled: false,
				bevelThickness: 0,
				bevelSize: 0,
				bevelOffset: 0,
				bevelSegments: 0,
			});

			// Create a material for the text mesh
			const material = new THREE.MeshBasicMaterial({ color: "#ffffff" });

			// Create the text mesh with the geometry and material
			const mesh = new THREE.Mesh(geometry, material);

			// Add the mesh to the scene
			scene.add(mesh);
		}
	);

	// // Add a grid helper to the scene
	// const gridHelper = new THREE.GridHelper(10, 10);
	// // increase the line thickness
	// gridHelper.material.linewidth = 1;
	// // add a radial gradient from the origin to outer side of the grid

	// scene.add(gridHelper);

	window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	let count = 0;
	const time = performance.now() / 1000;
	controls.update();
	scene.traverse(function (child) {
		child.rotation.x = count + time / 20;
		child.rotation.z = count + time / 20;

		count++;
	});

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}
