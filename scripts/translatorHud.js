/* TRANSLATOR */

window.targetObject = [-42, 120, 0]
var min= -1000
var max = 1000

const format = (num) => devTools().colorKey(Math.floor(num))

document.getElementById("translator-container").innerHTML = `
	<div class="translator">
	<h2>Object Translator </h2>
	<div id="xOuput">${format(window.targetObject[0])}</div>
		<input type="range" id="objX" name="objX" min="${min}" max="${max}" value="${window.targetObject[0]}" />
		<label for="objZ">Input X</label>
	<div id="yOuput">${format(window.targetObject[1])}</div>
		<input type="range" id="objY" value="${window.targetObject[1]}" name="objY" min="${min}" max="${max}" />
		<label for="objY">Input Y</label>

		<div id="zOuput">${format(window.targetObject[2])}</div>
		<input type="range" id="objZ" name="objZ" min="${min}" max="${max}" value="${window.targetObject[2]}" />
		<label for="objZ">Input Z</label>
</div>
`

const getAxisSlider = (axis) => document.getElementById(`obj${axis}`)

const setOutput = (e, axis, vectorPos) => {
	window.targetObject[vectorPos] = e.target.value
	const output = document.getElementById(`${axis.toLowerCase()}Ouput`)
	if (output) output.innerHTML = format(window.targetObject[vectorPos])
}

[{ name: 'X', pos: 0 },
{ name: 'Y', pos: 1 },
{ name: 'Z', pos: 2 }]
	.forEach(axis => getAxisSlider(axis.name).addEventListener('input', (e) => setOutput(e, axis.name, axis.pos)))
