let angle = 45
let textureMap
let objectMap
let gameStart = true
let cam1


function preload() {
	objectMap = ModelLoader().objectMap
	textureMap = ModelLoader().textureMap
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
	translate(0, 0, - room.center)
	rotateY(PI)
	texture(textureMap["brick"])
	plane(room.w, room.wallHeight) // Left wall
	pop()

	// //Front
	push()
	translate(0, 0, + room.center)
	rotateY(PI)
	texture(textureMap["brick"])
	plane(room.w, room.wallHeight) // Left wall
	pop()
}


function loadObjects() {

	if (window.targetObject) {
		push()
		translate(window.targetObject.coordinates[0], window.targetObject.coordinates[1], window.targetObject.coordinates[2])
		rotateX(devTools().degrees_to_radians(window.targetObject.rotation[0]))
		rotateY(devTools().degrees_to_radians(window.targetObject.rotation[1]))
		rotateZ(devTools().degrees_to_radians(window.targetObject.rotation[2]))
		scale(window.targetObject.scale)
		texture(textureMap[window.targetObject.texture])
		model(objectMap[window.targetObject.id])
		pop()
	}

}

function draw() {
	background(0)
	noStroke();


	loadRoom()
	loadObjects()
	firstPerson(cam1)
}
