let models = {
	// desk: "./assets/obj.obj",
}

const ModelModule = () => {
	const modelMap = {}
	Object.keys(models).forEach((key) => {
		modelMap[key] = loadModel(models[key])
	})
	return modelMap
}

p5.prototype.registerMethod("ModelModule", ModelModule)
