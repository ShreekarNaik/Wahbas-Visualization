var linearAlgebra = require("linear-algebra")(), // initialise it
	Vector = linearAlgebra.Vector,
	Matrix = linearAlgebra.Matrix;

var m = new Matrix([
	[1, 2, 3],
	[4, 5, 6],
]);

// default
var m2 = m.mulEach(5); // multiply every element by 5
m2 === m; // false

// in-place
var m2 = m.mulEach_(5); // notice the _ suffix
m2 === m; // true
