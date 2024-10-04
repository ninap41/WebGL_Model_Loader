const roamEnabled = true
let angle = 45
window.canvas
let textureMap
let modelMap
let gameStart = true
let cam1

function preload() {
	modelMap = ModelModule().modelMap
	textureMap = ModelModule().textureMap
}

function setup() {
	window.canvas = createCanvas(windowWidth, windowHeight, WEBGL)
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


function loadModel_() {
	push()
	translate(window.targetObject[0], window.targetObject[1], window.targetObject[2])
	rotateX(PI/2)
	texture(textureMap["wood"])
	model(modelMap["desk"])
	pop()
}

function draw() {
	background(0)
	stroke(0);

	noStroke();
	loadRoom()
	loadModel_()
	firstPerson(cam1)

}
