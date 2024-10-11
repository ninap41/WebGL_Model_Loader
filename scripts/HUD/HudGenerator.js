const HudGenerator = (enabledContext) => {
	const key = "Object"
	document.getElementById(`${key}-translator`).innerHTML = ``

	listenerRefs []
	
	const selectModel = document.getElementById(`target${key}Select`)
	document.getElementById(`clipboard-Object`).addEventListener("click", function(e) {
		const windowTargetId = this.getAttribute('data-value');
		navigator.clipboard.writeText(JSON.stringify(window[windowTargetId]))
		alert(` <b>"${window[windowTargetId].id}"</b> object  copied to clipboard\n Paste in 'models'`)
	})
	
	const getAxisSlider = (axis) => document.getElementById(`${key}-${axis}`)

	selectModel.addEventListener('change', (e) => {
		window[`target${key}`] = window.models[selectModel.value]
	})
	
	const add_xyzListeners = () => [{ name: 'X', pos: 0 },
	{ name: 'Y', pos: 1 },
	{ name: 'Z', pos: 2 }].forEach(axis => {
		var slide = getLightAxisSlider(axis.name)
		slide.addEventListener('input', (e) => setLightAxisOutput(e, axis.name, axis.pos))
	})
	const add_rgbListeners = () => ["R", "G", "B"].forEach((color, idx) => {
		const slide = getLightColorSlider(color)
		slide.addEventListener('input', (e) => setLightColorOutput(e, color, idx))
	})


	const addRotationListeners = () => ['RX', 'RY', 'RZ']
		.forEach((axis, idx) => getAxisSlider(axis).addEventListener('input', (e) => setOutput(e, axis, idx)))
	return { rgbListeners }
}