// import * as THREE from "three";

// class InfiniteGridHelper extends THREE.Mesh {
// 	constructor(
// 		size1 = 10,
// 		size2 = 100,
// 		color = new THREE.Color("white"),
// 		distance = 8000,
// 		axes = "xzy"
// 	) {
// 		const planeAxes = axes.substr(0, 2);

// 		const geometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1);

// 		const material = new THREE.ShaderMaterial({
// 			side: THREE.DoubleSide,
// 			uniforms: {
// 				uSize1: { value: size1 },
// 				uSize2: { value: size2 },
// 				uColor: { value: new THREE.Color(color).toArray() }, // Convert THREE.Color to array
// 				uDistance: { value: distance },
// 			},
// 			transparent: true,
// 			vertexShader: `
// 				varying vec3 worldPosition;
// 				uniform float uDistance;

// 				void main() {
// 					vec3 pos = position.${axes} * uDistance;
// 					pos.${planeAxes} += cameraPosition.${planeAxes};

// 					worldPosition = pos;
// 					gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
// 				}
// 			`,
// 			fragmentShader: `
// 				varying vec3 worldPosition;

// 				uniform float uSize1;
// 				uniform float uSize2;
// 				uniform vec3 uColor;
// 				uniform float uDistance;

// 				float getGrid(float size) {
// 					vec2 r = worldPosition.${planeAxes} / size;
// 					vec2 grid = abs(fract(r - 0.5) - 0.5) / (fwidth(r)*2.0) ;
// 					float line = min(grid.x, grid.y);
// 					return 1.0 - min(line, 1.0);
// 				}

// 				void main() {
// 					float d = 1.0 - min(distance(cameraPosition.${planeAxes}, worldPosition.${planeAxes}) / uDistance, 1.0);
// 					float g1 = getGrid(uSize1);
// 					float g2 = getGrid(uSize2);

// 					gl_FragColor = vec4(uColor.rgb, mix(g2, g1, g1) * pow(d, 3.0));
// 					gl_FragColor.a = mix(0.5 * gl_FragColor.a, gl_FragColor.a, g2);

// 					if (gl_FragColor.a <= 0.0) discard;
// 				}
// 			`,
// 			extensions: {
// 				derivatives: true,
// 			},
// 		});

// 		super(geometry, material);
// 		this.frustumCulled = false;
// 	}
// }

// export { InfiniteGridHelper };

// version 2:

// import * as THREE from "three";

// class InfiniteGridHelper extends THREE.Mesh {
// 	constructor(
// 		size1 = 10,
// 		size2 = 100,
// 		color = new THREE.Color("white"),
// 		distance = 8000,
// 		axes = "xzy",
// 		lineThickness = 49.0 // New parameter for line thickness
// 	) {
// 		const planeAxes = axes.substr(0, 2);

// 		const geometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1);

// 		const material = new THREE.ShaderMaterial({
// 			side: THREE.DoubleSide,
// 			uniforms: {
// 				uSize1: { value: size1 },
// 				uSize2: { value: size2 },
// 				uColor: { value: new THREE.Color(color).toArray() },
// 				uDistance: { value: distance },
// 				uLineThickness: { value: lineThickness }, // Line thickness uniform
// 			},
// 			transparent: true,
// 			vertexShader: `
// 				varying vec3 worldPosition;
// 				uniform float uDistance;

// 				void main() {
// 					vec3 pos = position.${axes} * uDistance;
// 					pos.${planeAxes} += cameraPosition.${planeAxes};

// 					worldPosition = pos;
// 					gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
// 				}
// 			`,
// 			fragmentShader: `
// 				varying vec3 worldPosition;

// 				uniform float uSize1;
// 				uniform float uSize2;
// 				uniform vec3 uColor;
// 				uniform float uDistance;
// 				uniform float uLineThickness;

// 				float getGrid(float size) {
// 					vec2 r = worldPosition.${planeAxes} / size;
// 					vec2 grid = abs(fract(r - 0.5) - 0.5);
// 					float line = min(grid.x, grid.y);
// 					return step(0.5 - (uLineThickness * 0.01), line); // Sharp edges with step
// 				}

// 				void main() {
// 					float d = 1.0 - min(distance(cameraPosition.${planeAxes}, worldPosition.${planeAxes}) / uDistance, 1.0);
// 					float g1 = 1.0 - getGrid(uSize1);
// 					float g2 = 1.0 - getGrid(uSize2);

// 					float alpha = mix(g2, g1, g1) * pow(d, 3.0);
// 					gl_FragColor = vec4(uColor.rgb, alpha);
// 					gl_FragColor.a = mix(0.5 * gl_FragColor.a, gl_FragColor.a, g2);

// 					if (gl_FragColor.a <= 0.0) discard;
// 				}
// 			`,
// 			extensions: {
// 				derivatives: true,
// 			},
// 		});

// 		super(geometry, material);
// 		this.frustumCulled = false;
// 	}

// 	// Method to dynamically update line thickness
// 	setLineThickness(thickness) {
// 		this.material.uniforms.uLineThickness.value = thickness;
// 	}
// }

// export { InfiniteGridHelper };

// version 3:

import * as THREE from "three";
// import { parseColor, rgb_theme } from "./theme.js";
// import themes from "./theme.js";
import themes from "./theme.js";

const currentTheme = themes.currentTheme;

class InfiniteGridHelper extends THREE.Mesh {
	constructor(
		size1 = 10,
		size2 = 100,
		color = parseColor(currentTheme.gridColor),
		distance = 8000,
		axes = "xzy",
		lineThickness = 3.0 // New parameter for line thickness
	) {
		const planeAxes = axes.substr(0, 2);

		const geometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1);

		const material = new THREE.ShaderMaterial({
			side: THREE.DoubleSide,
			uniforms: {
				uSize1: { value: size1 },
				uSize2: { value: size2 },
				uColor: { value: new THREE.Color(color).toArray() },
				uDistance: { value: distance },
				uLineThickness: { value: lineThickness }, // Line thickness uniform
			},
			transparent: true,
			vertexShader: `
				varying vec3 worldPosition;
				uniform float uDistance;

				void main() {
					vec3 pos = position.${axes} * uDistance;
					pos.${planeAxes} += cameraPosition.${planeAxes};
					
					worldPosition = pos;
					gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
				}
			`,
			fragmentShader: `
				varying vec3 worldPosition;

				uniform float uSize1;
				uniform float uSize2;
				uniform vec3 uColor;
				uniform float uDistance;
				uniform float uLineThickness;

				float getGrid(float size) {
					vec2 r = worldPosition.${planeAxes} / size;
					vec2 grid = abs(fract(r - 0.5) - 0.5) / (fwidth(r) * uLineThickness);
					float line = min(grid.x, grid.y);
					return smoothstep(0.5, 0.2, line); // Sharper transition with smoothstep
				}

				void main() {
					float d = 1.0 - min(distance(cameraPosition.${planeAxes}, worldPosition.${planeAxes}) / uDistance, 1.0);
					float g1 = getGrid(uSize1);
					float g2 = getGrid(uSize2);

					gl_FragColor = vec4(uColor.rgb, mix(g2, g1, g1) * pow(d, 3.0));
					gl_FragColor.a = mix(0.5 * gl_FragColor.a, gl_FragColor.a, g2);

					if (gl_FragColor.a <= 0.0) discard;
				}
			`,
			extensions: {
				derivatives: true,
			},
		});

		super(geometry, material);
		this.frustumCulled = false;
	}

	// Method to dynamically update line thickness
	setLineThickness(thickness) {
		this.material.uniforms.uLineThickness.value = thickness;
	}
}

export { InfiniteGridHelper };
