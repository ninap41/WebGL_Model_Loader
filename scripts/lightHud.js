/* LIGHT TRANSLATOR */

const format = (num) => devTools().colorKey(num)
// https://p5.readthedocs.io/en/latest/reference/lights.html#p5.ambient_light
/* HUD HTML */

const lightTypes = ["point", "directional", "ambient"]

const renderLightTranslator = () => {
	let templateStr = `	<div class="light-translator">`
	templateStr += `
			<h2>Light	<i data-value="targetLight" id="clipboard" class="fa-regular fa-clipboard fa-xs" style="color: #b3ffc9;"></i></h2>
			Target Light: &nbsp;
			<select id="targetLightSelect">
				${window.lights.keys(window.lights).map((light) => `<option value="${light}">${light}</option>`).join("")}<br>
			</select><br>
			Target Light Type: &nbsp;
			<select id="targetLightType">
				${lightTypes.map((lightType) => `<option value="${lightType}">${lightType}</option>`).join("")}<br>
			</select><br><br>`

	let lightRGB = `RGB: 
		<input type="range"id="lightColorR" name="lightColorR" min="0" max="255" value="${window.targetLight.color[0]}" />
		<label for="lightColorR"> R &nbsp;<span id="rOuput">${format(window.targetLight.color[0])}</span> </label>
		<input type="range"id="lightColorG" name="lightColorG" min="0" max="255" value="${window.targetLight.color[1]}" />
		<label for="lightColorG"> G &nbsp;<span id="gOuput">${format(window.targetLight.color[1])}</span> </label>
		<input type="range"id="lightColorB" name="lightColorB" min="0" max="255" value="${window.targetLight.color[2]}" />
		<label for="lightColorB"> B &nbsp;<span id="bOuput">${format(window.targetLight.color[2])}</span> </label><br>
`
	let lightCoordinates = `
		 Coordinates: <br>
			<input type="range" id="lightX" name="lightX" min="${minTrans}" max="${maxTrans}" value="${window.targetLight[0]}" />
			<label for="lightZ">X <span id="xOuput">${format(window.targetLight.coordinates[0])}</span> </label>
			<input type="range" id="lightY" value="${window.targetLight.coordinates[1]}" name="lightY" min="${minTrans}" max="${maxTrans}" />
			<label for="lightY">Y <span id="yOuput">${format(window.targetLight.coordinates[1])}</span> </label>
			<input type="range" id="lightZ" name="lightZ" min="-1500" max="15000" value="${window.targetLight.coordinates[2]}" />
			<label for="lightZ">Z &nbsp;<span id="zOuput">${format(window.targetLight.coordinates[2])}</span> </label>`

	if (window.targetLight.type === "point" || window.targetLight === "directional") templateStr += lightRGB + lightCoordinates
	else templateStr += lightRGB

	return templateStr += `</div>`
}
document.getElementById("light-translator").innerHTML = renderLightTranslator()
/* COPY model light TO CLIPBOARD */
document.getElementById("clipboard").addEventListener("click", function(e) {
	const windowTargetId = this.getAttribute('data-value');
	navigator.clipboard.writeText(JSON.stringify(window[windowTargetId]))
	alert(` <b>"${window[windowTargetId].id}"</b> lightect  copied to clipboard\n Paste in 'lights'`)
})

/* CHANGE TARGET Model */
const selectLight = document.getElementById("targetLightSelect")
selectLight.addEventListener('change', (e) => {
	window.targetLight = window.lights[selectLight.value]
	document.getElementById("light-translator").innerHTML = renderLightTranslator()
})
const selectType = document.getElementById("targetLightType")
selectType.addEventListener('change', (e) => {
	window.targetLight.type = e.target.value
	document.getElementById("light-translator").innerHTML = renderLightTranslator()
})

/* TARGET lightECT MUTATION */
const getAxisSlider = (axis) => document.getElementById(`lightColor${axis}`)

// const setOutput = (e, color, colorPos) => {
// 	let output = document.getElementById(`${axis.toLowerCase()}Ouput`)
// 	if (color === "FallOff") {
// 		window.targetLight["scale"] = Number(e.target.value)
// 		if (output) output.innerHTML = format(window.targetLight["scale"])
// 	} else {
// 		const mutationType = axis.indexOf('R') > -1 ? 'color' : 'coordinates'
// 		window.targetLight[mutationType][colorPos] = Number(e.target.value)
// 		if (output) output.innerHTML = format(window.targetLight[mutationType][colorPos])
// 	}
// }

[{ name: 'R', pos: 0 },
{ name: 'G', pos: 1 },
{ name: 'B', pos: 2 },
{ name: 'X', pos: 0 },
{ name: 'Y', pos: 1 },
{ name: 'Z', pos: 2 },
{ name: " Falloff", pos: null },
{ name: "Specular", pos: null },
	{ name: "On", pos: null }
]
	.forEach(axis => getAxisSlider(axis.name).addEventListener('input', (e) => setOutput(e, axis.name, axis.pos)))


