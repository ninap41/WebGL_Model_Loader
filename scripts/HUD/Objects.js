/* TRANSLATOR */
// radians, step = 0.1

const format = (num) => devTools().colorKey(num)

/* HUD HTML */

document.getElementById("Object-translator").innerHTML = `
	<h2>Object	<i data-value="targetObject" id="clipboard-Object" class="fa-regular fa-clipboard fa-xs" style="color: #b3ffc9;"></i></h2>
  TargetObject: &nbsp;
	<select id="targetObjectSelect">
		${Object.keys(window.objects).map((obj) => `<option value="${obj}">${obj}</option>`).join("")}<br>
	</select><br>
	TargetTexture: &nbsp;
	<select id="targetTextureSelect">
		<option value="">To Do--</option><br>
	</select><br><br>
	Scale <br>
	<input type="range" id="Object-Scale" name="objScale" min="-1" step=".01" max="100" value="${window.targetObject.scale}" />
	<label for="Object-Scale">X <span id="scaleOuput">${format(window.targetObject.scale)}</span> </label>
	 Coordinates: <br>
		<input type="range" id="Object-X" name="Object-X" min="-1500" max="1500" value="${window.targetObject[0]}" />
		<label for="Object-X">X <span id="x-Object-Ouput">${format(window.targetObject.coordinates[0])}</span> </label>
		
		<input type="range" id="Object-Y" value="${window.targetObject.coordinates[1]}" name="objY" min="-1500" max="1500" />
		<label for="Object-Y">Y <span id="y-Object-Ouput">${format(window.targetObject.coordinates[1])}</span> </label>
		<input type="range" id="Object-Z" name="Object-Z" min="-1500" max="1500" value="${window.targetObject.coordinates[2]}" />
		<label for="Object-Z">Z &nbsp;<span id="z-Object-Ouput">${format(window.targetObject.coordinates[2])}</span> </label>
		Rotation: <br>
		<input type="range"id="Object-RX" name="Object-RX" min="-360" max="360" value="${window.targetObject.rotation[0]}" />
		<label for="Object-RX">X R &nbsp;<span id="rx-Object-Ouput">${format(window.targetObject.rotation[0])}</span> </label>
		<input type="range"id="Object-RY" name="Object-RY" min="-360" max="360" value="${window.targetObject.rotation[1]}" />
		<label for="Object-RY">Y R &nbsp;<span id="ry-Object-Ouput">${format(window.targetObject.rotation[1])}</span> </label>
		<input type="range"id="Object-RZ" name="Object-RZ" min="-360" max="360" value="${window.targetObject.rotation[2]}" />
		<label for="Object-RZ">Z R &nbsp;<span id="rz-Object-Ouput">${format(window.targetObject.rotation[2])}</span> </label>
` 
/* COPY OBJECT TO CLIPBOARD */
document.getElementById("clipboard-Object").addEventListener("click", function(e) {
	const windowTargetId = this.getAttribute('data-value');
	navigator.clipboard.writeText(JSON.stringify(window[windowTargetId]))
	alert(` <b>"${window[windowTargetId].id}"</b> object  copied to clipboard\n Paste in 'objects'`)
})

/* CHANGE TARGET OBJECT */
const selectObject = document.getElementById("targetObjectSelect")
selectObject.addEventListener('change', (e) => {
	window.targetObject = window.objects[selectObject.value]
})

/* TARGET OBJECT MUTATION */
const getAxisSlider = (axis) => document.getElementById(`Object-${axis}`)

const setObjectOutputs = (e, axis, vectorPos) => {
	let output = document.getElementById(`${axis.toLowerCase()}-Object-Ouput`)
	if (axis === "Scale") {
		window.targetObject["scale"] = Number(e.target.value)
		if (output) output.innerHTML = format(window.targetObject["scale"])
	} else {
		const mutationType = axis.indexOf('R') > -1 ? 'rotation' : 'coordinates'
		window.targetObject[mutationType][vectorPos] = Number(e.target.value)
		if (output) output.innerHTML = format(window.targetObject[mutationType][vectorPos])
	}
}

['X',
'Y',
'Z',
'RX',
'RY',
'RZ',
'Scale',
]
	.forEach((axis, idx) => getAxisSlider(axis).addEventListener('input', (e) => setObjectOutputs(e, axis, idx)))


