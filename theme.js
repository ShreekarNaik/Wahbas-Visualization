import * as THREE from "three";

// export function parseColor(color) {
// 	return new THREE.Color(color); // Handles rgb() or hex automatically
// }

// const themes = {
// 	light: {
// 		backgroundColor: 0xf0f0f0,
// 		gridColor: 0xcccccc,
// 		arrowXColor: 0xff0000,
// 		arrowYColor: 0x00ff00,
// 		arrowZColor: 0x0000ff,
// 	},
// 	dark: {
// 		backgroundColor: 0x010101,
// 		gridColor: 0xffffff,
// 		arrowXColor: 0xff5555,
// 		arrowYColor: 0x55ff55,
// 		arrowZColor: 0x5555ff,
// 	},
// 	custom: {
// 		backgroundColor: 0x222244,
// 		gridColor: 0x88ccff,
// 		arrowXColor: 0xffaa00,
// 		arrowYColor: 0x00ffaa,
// 		arrowZColor: 0xaa00ff,
// 	},
// };

// export const rgb_theme = {
// 	light: {
// 		backgroundColor: "rgb(240, 240, 240)",
// 		gridColor: "rgb(255, 255, 255)",
// 		arrowXColor: "rgb(255, 0, 0)",
// 		arrowYColor: "rgb(0, 255, 0)",
// 		arrowZColor: "rgb(0, 0, 255)",
// 	},
// 	dark: {
// 		backgroundColor: "rgb(15, 1, 37)",
// 		gridColor: "rgb(31, 3, 83)",
// 		arrowXColor: "rgb(189, 27, 41)",
// 		arrowYColor: "rgb(69, 197, 69)",
// 		arrowZColor: "rgb(34, 34, 165)",
// 	},
// 	custom: {
// 		backgroundColor: "rgb(1, 1, 1)",
// 		gridColor: "rgb(255, 255, 255)",
// 		arrowXColor: "rgb(252, 54, 54)",
// 		arrowYColor: "rgb(85, 255, 85)",
// 		arrowZColor: "rgb(17, 17, 99)",
// 	},
// };

// export default themes;

function parseColor(color) {
	return new THREE.Color(color);
}

function getParsedTheme(theme) {
	const parsedTheme = {};
	for (const key in theme) {
		parsedTheme[key] = parseColor(theme[key]);
	}
	return parsedTheme;
}

const themes = {
	light: {
		backgroundColor: "rgb(240, 240, 240)",
		gridColor: "rgb(204, 204, 204)",
		arrowXColor: "rgb(255, 0, 0)",
		arrowYColor: "rgb(0, 255, 0)",
		arrowZColor: "rgb(0, 0, 255)",
	},
	dark: {
		backgroundColor: "rgb(1, 1, 1)",
		gridColor: "rgb(255, 255, 255)",
		arrowXColor: "rgb(255, 85, 85)",
		arrowYColor: "rgb(85, 255, 85)",
		arrowZColor: "rgb(85, 85, 255)",
	},

	sea: {
		backgroundColor: "#d1f8ef",
		gridColor: "#a1e3f9",
		arrowXColor: "rgb(238, 94, 94)",
		arrowYColor: "rgb(97, 236, 127)",
		arrowZColor: "rgb(34, 86, 165)",
	},
};

export default {
	currentTheme: getParsedTheme(themes.sea),
};
