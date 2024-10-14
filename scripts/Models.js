
window.lighting = {
	"light1": {
		"id": 'light1',
		"on": true,
		"type": "ambient",
		"description": "dark ambient light",
		"color": [0, 0, 0],

		
		/* "lightFallOff": [ 
				constant (float) – coefficient for the constant term,
				 linear (float) – coefficient for the linear term,
			 quadratic (float) – coefficient for the quadratic term
		 ],
		// "lightSpecular": [],//rgb */
	},
	"light2": {
		"id": 'light2',
		"on": true,
		"type": "spotlight",
		"description": "bright white spotlight",
		"coordinates":[0,0,0],
		"color": [255, 255, 255],
		// "lightFallOff": [],
		// "lightSpecular": [0,0,0], //rgb
	},
}

window.textures = {
	brick: "../assets/brick.avif",
	wood: "../assets/wood.jpg",
	plant: "../assets/plant_texture.jpg",
}

window.objects = {
	desk: {
		"id": "desk",
		"path": "./assets/desk_tinker.obj",
		"textures": "wood",
		"scale": 0.5,
		"passible": false,
		"coordinates": [-153, 81, -186],
		"rotation": [90, 0, 0]
	},
	plant: {
		"id": "plant",
		"path": "./assets/plant.obj",
		"scale": 1,
		"passible": false,
		"textures": "plant",
		"coordinates": [-10, 29, -226],
		"rotation": [187, 0, 0]
	}
}


window.targetlighting = window.lighting['light2']

// window.targetObject = window.objects["desk"]
// window.targetlighting = window.lighting['light2']

window.targetobjects = window.objects["desk"]
