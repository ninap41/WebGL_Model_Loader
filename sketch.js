let angle = 45
let texturesMap
let objectsMap
let lightingMap
let gameStart = true
let cam1


function preload() {
	objectsMap = ModelLoader().objectsMap
	texturesMap = ModelLoader().texturesMap
	lightingMap = ModelLoader().lightingMap
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
	texture(texturesMap["wood"])
	plane(room.w, room.h)
	pop()

	// Draw a ceiling
	push()
	translate(0, -115, 0)
	rotateX(PI / 2)
	texture(texturesMap["wood"])
	plane(room.w, room.h)
	pop()

	// Draw the walls
	//RIGHT
	push()
	fill(150)
	translate(room.w + -room.center, 0, 0)
	rotateY(PI / 2)
	texture(texturesMap["brick"])
	plane(room.w, room.wallHeight)
	pop()

	//LEFT
	push()
	translate(-room.w + room.center, 0, 0)
	rotateY(PI / 2)
	texture(texturesMap["brick"])
	plane(room.w, room.wallHeight) // Left wall
	pop()

	//Back
	push()
	translate(0, 0, - room.center)
	rotateY(PI)
	texture(texturesMap["brick"])
	plane(room.w, room.wallHeight) // Left wall
	pop()

	// //Front
	push()
	translate(0, 0, + room.center)
	rotateY(PI)
	texture(texturesMap["brick"])
	plane(room.w, room.wallHeight) // Left wall
	pop()
}


function loadObjects() {
	
	if (window.targetobjects) {
		const {coordinates, rotation, scale: scale_, textures, id} = window.targetobjects
    const convertRotation = (r) => devTools().degrees_to_radians(r)

		push()
		translate(coordinates[0],coordinates[1], coordinates[2])
		rotateX(convertRotation(rotation[0]))
		rotateY(convertRotation(rotation[1]))
		rotateZ(convertRotation(rotation[2]))
		scale(scale_)
		texture(texturesMap[textures])
		model(objectsMap[id])
		pop()
	}

}

function loadGlobalLights() {
	if (window.targetlighting) {
		const {type,  color: colors_,  } = window.targetlighting
		if(type === "ambient") {
			ambientLight(colors_[0], colors_[1], colors_[2], 1);
			specularMaterial(250); 

		}
	}

 }

function draw() {
	background(0)
	noStroke();
	loadGlobalLights();
	loadRoom();
	loadObjects();
	firstPerson(cam1)
}
