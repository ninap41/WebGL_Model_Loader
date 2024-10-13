
const ModelLoader = () => {
	const objectsMap = {}
	const textureMap = {}
	const lightingMap = {}

	Object.keys(window.objects).forEach((key) => {
		objectsMap[key] = loadModel(window.objects[key].path, true)
	})
	Object.keys(window.textures).forEach((key) => {
		textureMap[key] = loadImage(window.textures[key])
	})

	Object.keys(window.lighting).forEach((key) => {
		// lightingMap[key] = loadImage(window.lighting[key])
	})
	return { objectsMap, textureMap, lightingMap }
}

/* for sketch.js */ p5.prototype.registerMethod("ModelLoader", ModelLoader)


