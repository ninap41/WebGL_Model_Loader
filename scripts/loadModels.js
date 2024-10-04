let textures = {
	brick: "../assets/brick.avif",
	wood: "../assets/wood.jpg",
}

let models = {
	desk: {
		id: "desk",
		path: "./assets/desk_tinker.obj",
		scale: .5,
		coordinates: [-42, 120, 0],
	},
	// plant: {
	// 	path: "./assets/plant.obj",
	// 	scale: 10,
	// 	coordinates: [-42, 120, 0],
	// }
}

const ModelModule = () => {
	const modelMap = {}
	const textureMap = {}
	Object.keys(models).forEach((key) => {
		modelMap[key] = loadModel(models[key].path, true)
	})
	Object.keys(textures).forEach((key) => {
		textureMap[key] = loadImage(textures[key])
	})
		return { modelMap, textureMap }
}

p5.prototype.registerMethod("ModelModule", ModelModule)
