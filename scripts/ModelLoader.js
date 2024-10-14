
const ModelLoader = () => {
	const objectsMap = {}
	const texturesMap = {}

	Object.keys(window.objects).forEach((key) => {
		objectsMap[key] = loadModel(window.objects[key].path, true)
	})
	Object.keys(window.textures).forEach((key) => {
		texturesMap[key] = loadImage(window.textures[key])
	})

	return { objectsMap, texturesMap, lightingMap }
}

/* for sketch.js */ p5.prototype.registerMethod("ModelLoader", ModelLoader)


