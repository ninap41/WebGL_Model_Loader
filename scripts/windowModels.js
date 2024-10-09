
window.lights = {
	"light1": {
		"id": '1',
		"on": true,
		"type": "ambient",
		"description": "dark ambient light",
		"color": [0, 0, 0],
		// constant (float) – coefficient for the constant term
		// linear (float) – coefficient for the linear term
		// quadratic (float) – coefficient for the quadratic term
		// "lightFallOff": [],
		"lightSpecular": [],//rgb
	},
	"light2": {
		"id": '1',
		"on": true,
		"type": "spotlight",
		"description": "bright white spotlight",
		"color": [255, 255, 255],
		// "lightFallOff": [],
		"lightSpecular": [], //rgb
	},
}
window.targetLight = window.lights["desk"]

window.textures = {
	brick: "../assets/brick.avif",
	wood: "../assets/wood.jpg",
	plant: "../assets/plant_texture.jpg",
}

window.models = {
	desk: {
		"id": "desk",
		"path": "./assets/desk_tinker.obj",
		"texture": "wood",
		"scale": 0.5,
		"coordinates": [-153, 81, -186],
		"rotation": [90, 0, 0]
	},
	plant: {
		"id": "plant",
		"path": "./assets/plant.obj",
		"scale": 1,
		"texture": "plant",
		"coordinates": [-10, 29, -226],
		"rotation": [187, 0, 0]
	}
}

window.targetObject = window.models["desk"]