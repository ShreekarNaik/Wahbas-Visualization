import * as THREE from "three";

export class Arrow extends THREE.Object3D {
	/**
	 * Constructs an Arrow.
	 * @param {Number} thickness - The thickness of the arrow (used as the shaft width).
	 * @param {THREE.Vector3} start - The start point (tail) of the arrow.
	 * @param {THREE.Vector3} end - The end point (tip) of the arrow.
	 * @param {THREE.Vector3} normal - A vector defining the “up” direction (the normal of the arrow’s rectangle plane).
	 * @param {Number} triangleAspectRatio - Ratio of the triangle’s base length to its height.
	 * @param {Number} lineAspectRatio - Ratio of the shaft’s length to its width.
	 * @param {Number|String} color - Color of the arrow (used in the default material).
	 */
	constructor(
		thickness,
		start,
		end,
		normal,
		triangleAspectRatio,
		lineAspectRatio,
		color = 0xffffff
	) {
		super();

		// Store parameters (cloned so the originals aren’t modified)
		this.thickness = thickness;
		this.start = start.clone();
		this.end = end.clone();
		this.normal = normal.clone().normalize();
		this.triangleAspectRatio = triangleAspectRatio;
		this.lineAspectRatio = lineAspectRatio;
		this.color = color;

		// Compute arrow direction and distance from start to end.
		const dir = new THREE.Vector3().subVectors(end, start);
		const distance = dir.length();
		dir.normalize();

		// Define the arrow’s model dimensions.
		// Shaft (rectangle) dimensions:
		const shaftLength = lineAspectRatio * thickness; // local length of the shaft
		// Triangle (arrowhead) dimensions:
		const triangleBase = triangleAspectRatio * thickness;
		const triangleHeight = thickness; // for simplicity
		// Total model–space arrow length.
		const totalLocalLength = shaftLength + triangleHeight;

		// Determine a uniform scale so that the model arrow spans the distance.
		const scaleFactor = distance / totalLocalLength;

		// --- Build the geometry in model space (arrow pointing along +Y) ---

		// Create the shaft as a rectangle.
		// Using PlaneGeometry(width, height). We want the shaft to start at y=0 and extend to y=shaftLength.
		const shaftGeometry = new THREE.PlaneGeometry(thickness, shaftLength);
		// Shift the geometry upward so that its bottom edge is at y=0.
		shaftGeometry.translate(0, shaftLength / 2, 0);

		// Create the triangle geometry.
		// Define a triangle in the XY plane.
		const triangleGeometry = new THREE.BufferGeometry();
		const triangleVertices = new Float32Array([
			// Base left vertex (at y = 0)
			-triangleBase / 2,
			0,
			0,
			// Base right vertex (at y = 0)
			triangleBase / 2,
			0,
			0,
			// Tip vertex (at y = triangleHeight)
			0,
			triangleHeight,
			0,
		]);
		triangleGeometry.setAttribute(
			"position",
			new THREE.BufferAttribute(triangleVertices, 3)
		);
		triangleGeometry.computeVertexNormals();

		// Create a default material with the provided color and double-sided faces.
		const defaultMaterial = new THREE.MeshBasicMaterial({
			color: this.color,
			side: THREE.DoubleSide,
		});

		// Create mesh objects.
		this.shaftMesh = new THREE.Mesh(shaftGeometry, defaultMaterial);
		this.triangleMesh = new THREE.Mesh(triangleGeometry, defaultMaterial);
		// Position the triangle so its base aligns with the top of the shaft.
		this.triangleMesh.position.set(0, shaftLength, 0);

		// Group the two parts into one Object3D.
		this.arrowGroup = new THREE.Group();
		this.arrowGroup.add(this.shaftMesh);
		this.arrowGroup.add(this.triangleMesh);

		// Scale the group so that the total length equals the distance between start and end.
		this.arrowGroup.scale.set(scaleFactor, scaleFactor, scaleFactor);

		// --- Orientation: rotate the arrowGroup so that its Y–axis aligns with the arrow direction ---

		// In our model, the arrow points along +Y.
		const localUp = new THREE.Vector3(0, 1, 0);
		// Compute a quaternion that rotates localUp to our arrow direction.
		const baseQuat = new THREE.Quaternion().setFromUnitVectors(
			localUp,
			dir
		);

		// Next, rotate about the arrow’s axis so that the front face (initially along +Z) aligns with the provided normal.
		const localFront = new THREE.Vector3(0, 0, 1);
		const currentFront = localFront.clone().applyQuaternion(baseQuat);

		// Determine the rotation needed about the arrow’s axis (dir) to bring currentFront into alignment with normal.
		let angle = currentFront.angleTo(this.normal);
		// Use cross product to determine the sign.
		const cross = new THREE.Vector3().crossVectors(
			currentFront,
			this.normal
		);
		if (dir.dot(cross) < 0) {
			angle = -angle;
		}
		const twistQuat = new THREE.Quaternion().setFromAxisAngle(dir, angle);

		// Combine the quaternions.
		baseQuat.multiply(twistQuat);

		// Apply the combined rotation to the arrow group.
		this.arrowGroup.quaternion.copy(baseQuat);

		// Position the arrow group at the start point.
		this.arrowGroup.position.copy(this.start);

		// Add the arrow group as a child of this Object3D.
		this.add(this.arrowGroup);
	}

	/**
	 * Allows the user to set a custom material for both parts of the arrow.
	 * @param {THREE.Material} material
	 */
	setMaterial(material) {
		this.shaftMesh.material = material;
		this.triangleMesh.material = material;
	}

	/**
	 * Adds the arrow to a given scene.
	 * @param {THREE.Scene} scene
	 */
	addToScene(scene) {
		scene.add(this);
	}
}

// ----- USAGE EXAMPLE -----
// (Assuming you have a THREE.Scene named 'scene')

// Parameters:
// const thickness = 0.2;
// const start = new THREE.Vector3(0, 0, 0);
// const end = new THREE.Vector3(0, 5, 0); // arrow will be 5 units long
// const normal = new THREE.Vector3(0, 0, 1); // the front face will point toward +Z
// const triangleAspectRatio = 2; // triangle base will be 2 * thickness
// const lineAspectRatio = 15; // shaft length will be 15 * thickness in the model

// // Create the arrow.
// const arrow = new Arrow(
// 	thickness,
// 	start,
// 	end,
// 	normal,
// 	triangleAspectRatio,
// 	lineAspectRatio
// );

// // Optionally change the material (e.g., to a red color):
// // arrow.setMaterial(new THREE.MeshBasicMaterial({ color: 0xff0000 }));

// // Add to the scene.
// arrow.addToScene(scene);
