let textures = {
	brick: "../assets/brick.avif",
	wood: "../assets/wood.jpg",
}

const TextureModule = () => {
	const textureMap = {}
	Object.keys(textures).forEach((key) => {
		textureMap[key] = loadImage(textures[key])
	})
	console.log(textureMap, "HEY?")
	return textureMap
}

p5.prototype.registerMethod("TextureModule", TextureModule)
