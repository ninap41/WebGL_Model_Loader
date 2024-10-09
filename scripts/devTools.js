// p5.prototype.registerMethod("post", () => {
// 	devConfig.draw.call(devConfig)
// })

let devConfig = { devMode: true }

let devTools = () => {
	const colorKey = (val) => {
		if (val < 0) {
			return "<span style='color:red'>" + val + "</span>"
		} else {
			return "<span style='color:green'>" + val+ "</span>"
		}
	}
	const radians_to_degrees = (radians) => radians * (180 / Math.PI);
	const degrees_to_radians = (degrees) => degrees * (Math.PI / 180);
	// const rotateX =  (angle) => PI /2 - angle
	// const rotateY = (angle) => PI/2 - angle
	// const rotateZ = (angle) => PI/2 - angle
	return { colorKey, radians_to_degrees, degrees_to_radians }
}

p5.prototype.registerMethod("devConfig", devConfig)
p5.prototype.registerMethod("devTools", devTools)
