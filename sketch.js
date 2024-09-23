const roamEnabled = true
let angle = 45
let canvas
let textureMap
let modelMap

let gameStart = true
let cam1

function preload() {
	textureMap = TextureModule()

	// modelMap = ModelModule()
}
function setup() {
	canvas = createCanvas(windowWidth, windowHeight, WEBGL)
	cam1 = createCamera()
}

function loadRoom() {
	let room = {
		w: 500,
		h: 500,
		wallHeight: 250,
		center: 250,
	}
	// Draw a floor

	push()
	translate(0, 120, 0)
	rotateX(PI / 2)
	texture(textureMap["wood"])
	plane(room.w, room.h)
	pop()

	// Draw a ceiling
	push()
	translate(0, -115, 0)
	rotateX(PI / 2)
	texture(textureMap["wood"])
	plane(room.w, room.h)
	pop()

	// Draw the walls
	//RIGHT
	push()
	fill(150)
	translate(room.w + -room.center, 0, 0)
	rotateY(PI / 2)
	texture(textureMap["brick"])
	plane(room.w, room.wallHeight)
	pop()

	//LEFT
	push()
	translate(-room.w + room.center, 0, 0)
	rotateY(PI / 2)
	texture(textureMap["brick"])
	plane(room.w, room.wallHeight) // Left wall
	pop()

	//Back
	push()
	translate(0, 0, -room.center)
	rotateY(PI)
	texture(textureMap["brick"])
	plane(room.w, room.wallHeight) // Left wall
	pop()

	// //Front
	push()
	translate(0, 0, +room.center)
	rotateY(PI)
	texture(textureMap["brick"])
	plane(room.w, room.wallHeight) // Left wall
	pop()
}

function draw() {
	background(0)
	loadRoom()

	firstPerson(cam1)
	// let halfWidth = planeWidth / 2;
	// let halfHeight = planeHeight / 2;

	// // Coordinates of the four corners
	// let topLeft = createVector(-halfWidth, 0, -halfHeight);
	// let topRight = createVector(halfWidth, 0, -halfHeight);
	// let bottomRight = createVector(halfWidth, 0, halfHeight);
	// let bottomLeft = createVector(-halfWidth, 0, halfHeight);
}
