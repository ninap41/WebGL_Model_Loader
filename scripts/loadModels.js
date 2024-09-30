let models = {
	desk: {
		path: "./assets/desk_tinker.obj",
		scale: 1,
		coordinates: [-42, 120, 0],
		texture: null
	}
}

const ModelModule = () => {
	const modelMap = {}
	Object.keys(models).forEach((key) => {
		modelMap[key] = loadModel(models[key].path)
	})
		return modelMap
}

p5.prototype.registerMethod("ModelModule", ModelModule)
