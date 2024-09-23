// p5.prototype.registerMethod("post", () => {
// 	devConfig.draw.call(devConfig)
// })

let devConfig = { devMode: true }

p5.prototype.registerMethod("devConfig", devConfig)
let devTools = () => {
	const colorKey = (val) => {
		if (val < 0) {
			return `<span style="color:red">${val}</span>`
		} else {
			return `<span style="color:green">${val}</span>`
		}
	}
	return { colorKey }
}
p5.prototype.registerMethod("devTools", devTools)
