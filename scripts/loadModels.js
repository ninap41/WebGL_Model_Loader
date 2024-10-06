
const ModelModule = () => {
	const modelMap = {}
	const textureMap = {}

	Object.keys(window.models).forEach((key) => {
		modelMap[key] = loadModel(models[key].path, true)
	})
	Object.keys(window.textures).forEach((key) => {
		textureMap[key] = loadImage(textures[key])
	})
		return { modelMap, textureMap}
}

	
/* for sketch.js */ p5.prototype.registerMethod("ModelModule", ModelModule)


