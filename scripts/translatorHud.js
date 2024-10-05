/* TRANSLATOR */

var minTrans = -1000
var maxTrans = 1000
var minRotat = -360
var maxRotat = 360 // radians, step = 0.1
const format = (num) => devTools().colorKey(Math.floor(num))

/* HUD HTML */
document.getElementById("translator-container").innerHTML = `
	<div class="translator">
	<h2>Object Translator &nbsp; <i data-value="targetObject" id="clipboard" class="fa-regular fa-clipboard fa-2xs" style="color: #b3ffc9;"></i>
</h2>
	<select id="targetObjectSelect">
		${Object.keys(window.models).map((model) => `<option value="${model}">${model}</option>`).join("")}<br>
	</select>
	 Coordinates: <br>
		<input type="range" id="objX" name="objX" min="${minTrans}" max="${maxTrans}" value="${window.targetObject[0]}" />
		<label for="objZ">X <span id="xOuput">${format(window.targetObject.coordinates[0])}</span> </label>
		<input type="range" id="objY" value="${window.targetObject.coordinates[1]}" name="objY" min="${minTrans}" max="${maxTrans}" />
		<label for="objY">Y <span id="yOuput">${format(window.targetObject.coordinates[1])}</span> </label>
		<input type="range" id="objZ" name="objZ" min="${minTrans}" max="${maxTrans}" value="${window.targetObject.coordinates[2]}" />
		<label for="objZ">Z &nbsp;<span id="zOuput">${format(window.targetObject.coordinates[2])}</span> </label>
		Rotation: <br>
		<input type="range"id="objRX" name="objRX" min="${minRotat}" max="${maxRotat}" value="${window.targetObject.rotation[0]}" />
		<label for="objRX">X R &nbsp;<span id="rxOuput">${format(window.targetObject.rotation[0])}</span> </label>
		<input type="range"id="objRY" name="objRY" min="${minRotat}" max="${maxRotat}" value="${window.targetObject.rotation[1]}" />
		<label for="objRY">Y R &nbsp;<span id="ryOuput">${format(window.targetObject.rotation[1])}</span> </label>
		<input type="range"id="objRZ" name="objRZ" min="${minRotat}" max="${maxRotat}" value="${window.targetObject.rotation[2]}" />
		<label for="objRZ">Z R &nbsp;<span id="rzOuput">${format(window.targetObject.rotation[2])}</span> </label>
</div>
`
/* COPY model OBJ TO CLIPBOARD */
document.getElementById("clipboard").addEventListener("click", function(e) {
	const windowTargetId = this.getAttribute('data-value');
	navigator.clipboard.writeText(JSON.stringify(window[windowTargetId]))
	alert(` <b>"${window[windowTargetId].id}"</b> object  copied to clipboard\n Paste in 'models'`)
})

/* CHANGE TARGET Model */
const selectModel = document.getElementById("targetObjectSelect")
selectModel.addEventListener('change', (e) => {
	window.targetObject = window.models[selectModel.value]
})

/* TARGET OBJECT MUTATION */
const getAxisSlider = (axis) => document.getElementById(`obj${axis}`)
const setOutput = (e, axis, vectorPos) => {
	const mutationType = axis.indexOf('R') > -1 ? 'rotation' : 'coordinates'
	window.targetObject[mutationType][vectorPos] = e.target.value
	const output = document.getElementById(`${axis.toLowerCase()}Ouput`)
	if (output) output.innerHTML = format(window.targetObject[mutationType][vectorPos])
}

[{ name: 'X', pos: 0 },
{ name: 'Y', pos: 1 },
{ name: 'Z', pos: 2 },
{ name: 'RX', pos: 0 },
{ name: 'RY', pos: 1 },
{ name: 'RZ', pos: 2 },

]
	.forEach(axis => getAxisSlider(axis.name).addEventListener('input', (e) => setOutput(e, axis.name, axis.pos)))


