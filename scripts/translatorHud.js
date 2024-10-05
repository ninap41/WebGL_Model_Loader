/* TRANSLATOR */
var min = -1000
var max = 1000

const format = (num) => devTools().colorKey(Math.floor(num))

/* HUD HTML */
document.getElementById("translator-container").innerHTML = `
	<div class="translator">
	<h2>Object Translator &nbsp; <i data-value="targetObject" id="clipboard" class="fa-regular fa-clipboard fa-2xs" style="color: #b3ffc9;"></i>
</h2>
	<select id="targetObjectSelect">
		${Object.keys(window.models).map((model) => `<option value="${model}">${model}</option>`).join("")}<br>
	</select>
	
		<input type="range" id="objX" name="objX" min="${min}" max="${max}" value="${window.targetObject[0]}" />
		<label for="objZ">X <span id="xOuput">${format(window.targetObject.coordinates[0])}</span> </label>
		<input type="range" id="objY" value="${window.targetObject.coordinates[1]}" name="objY" min="${min}" max="${max}" />
		<label for="objY">Y <span id="yOuput">${format(window.targetObject.coordinates[1])}</span> </label>
		<input type="range" id="objZ" name="objZ" min="${min}" max="${max}" value="${window.targetObject.coordinates[2]}" />
		<label for="objZ">Z &nbsp;<span id="zOuput">${format(window.targetObject.coordinates[2])}</span> </label>
</div>
`
/* COPY VERTICES && ROTATION  TO CLIPBOARD */
document.getElementById("clipboard").addEventListener("click", function(e) {
	const windowTargetId = this.getAttribute('data-value');
	navigator.clipboard.writeText(JSON.stringify(window[windowTargetId].coordinates))
	alert(` <b>"${window[windowTargetId].id}"</b> coordinates copied to clipboard\n paste in 'models'`)
})

/* CHANGE TARGET Model */
const selectModel = document.getElementById("targetObjectSelect")
selectModel.addEventListener('change', (e) => {
	window.targetObject = window.models[selectModel.value]
})

/* TARGET OBJECT MUTATION */
const getAxisSlider = (axis) => document.getElementById(`obj${axis}`)
const setOutput = (e, axis, vectorPos) => {
	window.targetObject.coordinates[vectorPos] = e.target.value
	const output = document.getElementById(`${axis.toLowerCase()}Ouput`)
	if (output) output.innerHTML = format(window.targetObject.coordinates[vectorPos])
}

[{ name: 'X', pos: 0 },
{ name: 'Y', pos: 1 },
{ name: 'Z', pos: 2 },
	// { name: 'rX', pos: 3 },
	// { name: 'rY', pos: 4 }
]
	.forEach(axis => getAxisSlider(axis.name).addEventListener('input', (e) => setOutput(e, axis.name, axis.pos)))


