
const ModelLoader = () => {
	const objectMap = {}
	const textureMap = {}

	Object.keys(window.objects).forEach((key) => {
		objectMap[key] = loadModel(window.objects[key].path, true)
	})
	Object.keys(window.textures).forEach((key) => {
		textureMap[key] = loadImage(window.textures[key])
	})
	return { objectMap, textureMap }
}

/* for sketch.js */ p5.prototype.registerMethod("ModelLoader", ModelLoader)


