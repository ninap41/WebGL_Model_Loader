/* LIGHT TRANSLATOR */
// https://p5.readthedocs.io/en/latest/reference/lights.html#p5.ambient_light
/* HUD HTML */
// import HudGenerator from "./HudGenerator.js"	
// var { addClipboard } = HudGenerator("Lighting")
const lightTypes = ["point", "directional", "ambient"]

document.getElementById(`Lighting-translator`).innerHTML = `
<h2>Light	<i data-value="targetLighting" id="clipboard-Lighting" class="fa-regular fa-clipboard fa-xs" style="color: #b3ffc9;"></i></h2>

Target Light: &nbsp;
<select id="targetLightingSelect">
	${Object.keys(window.lighting).map((light) => `<option value="${light}" ${window.targetLighting.id === light ? `selected="${light}"` : ``}>${light}</option>`).join("")}<br>
</select><br>

Target Light Type: &nbsp;
<select id="targetLightingType">
	${lightTypes.map((lightType) => `<option value="${lightType}" 
	${window.targetLighting.type === lightType ? `selected="${lightType}"` : ``}>${lightType}</option>`).join("")}<br>
</select>
<div id="Lighting-color"></div>
<div id="Lighting-coordinates"></div>

` + "<p> To do, color change on axises, add texture, add falloff, update Sketchjs for target Object.  And Toggling on other objects that are not target objects.</p>"


/* ______________________________ */
const renderLightingCoordinates = () => {
	const lightCoordinates = document.getElementById("Lighting-coordinates")
	lightCoordinates.innerHTML = `
		<div id="Lighting-coordinates">
		 Coordinates: <br>
			<input type="range" id="Lighting-X" name="Lighting-X"  min="-1500" max="1500" value="${window.targetLighting.coordinates[0]}" /><label for="Lighting-X">X <span id="x-Lighting-Ouput">${format(window.targetLighting.coordinates[0])}</span> </label><br>
			<input type="range" id="Lighting-Y" value="${window.targetLighting.coordinates[1]}" name="Lighting-Y" min="-1500" max="1500" /><label for="Lighting-Y">Y <span id="y-Lighting-Ouput">${format(window.targetLighting.coordinates[1])}</span> </label><br>
			<input type="range" id="Lighting-Z" name="lightZ" min="-1500" max="15000" value="${window.targetLighting.coordinates[2]}" /><label for="Lighting-Z">Z &nbsp;<span id="z-Lighting-Output">${format(window.targetLighting.coordinates[2])}</span> </label>
		</div>`

	const getLightingAxisSlider = (axis) => document.getElementById(`Lighting-${axis}`)
	const setLightingAxisOutput = (e, axis, vectorPos) => {
		let output = document.getElementById(`${axis.toLowerCase()}-Lighting-Ouput`)
		window.targetLighting['coordinates'][vectorPos] = Number(e.target.value)
		if (output) output.innerHTML = window.targetLighting['coordinates'][vectorPos]
	}

	['X',
		'Y',
		'Z'].forEach((axis, idx) => {
			var slide = getLightingAxisSlider(axis)
			slide.addEventListener('input', (e) => setLightingAxisOutput(e, axis, idx))
		})
}

const renderLightingColor = () => {
	const lightColor = document.getElementById('Lighting-color')
	lightColor.innerHTML = `
	RGB: <br>
			<input type="range"id="Lighting-Color-R" value="${window.targetLighting[0]}" name="Lighting-Color-R" min="0" max="255" value="${window.targetLighting.color[0]}" />
			<label for="Lighting-Color-R"> R &nbsp;<span id="r-Color-Ouput">${window.targetLighting.color[0]}</span> </label><br>
			<input type="range"id="Lighting-Color-G" value="${window.targetLighting[1]}" name="Lighting-Color-G" min="0" max="255" value="${window.targetLighting.color[1]}" />
			<label for="Lighting-Color-G"> G &nbsp;<span id="g-Color-Ouput">${window.targetLighting.color[1]}</span> </label><br>
			<input type="range"id="Lighting-Color-B" value="${window.targetLighting[2]}" name="Lighting-Color-B" min="0" max="255" value="${window.targetLighting.color[2]}" />
			<label for="Lighting-Color-B"> B &nbsp;<span id="b-Color-Ouput">${window.targetLighting.color[2]}</span> </label><br>`

	/* TARGET lightECT MUTATION */
	const getLightingColorSlider = (color) => document.getElementById(`Lighting-Color-${color}`)

	const setLightingColorOutput = (e, key, idx) => {
		let output = document.getElementById(`${key.toLowerCase()}-Color-Ouput`)
		window.targetLighting[key][idx] = Number(e.target.value)
		if (output) output.innerHTML = window.targetLighting[key][idx]
	}

	["R", "G", "B"].forEach((color, idx) => {
		getLightingColorSlider(color).addEventListener('input', (e) => setLightingColorOutput(e, color, idx))
	})
}


/* COPY model light TO CLIPBOARD */
document.getElementById("clipboard-Lighting").addEventListener("click", function(e) {
	const windowTargetId = this.getAttribute('data-value');
	navigator.clipboard.writeText(JSON.stringify(window[windowTargetId]))
	alert(` <b>"${window[windowTargetId].id}"</b> Lighting instance  copied to clipboard\n Paste in 'lights'`)
})
// window.addClipboard("Lighting")

const selectType = document.getElementById("targetLightingType")
selectType.addEventListener('change', (e) => {
	window.targetLighting.type = selectType.value
	render()
})

const selectLighting = document.getElementById("targetLightingSelect")
selectLighting.addEventListener('change', (e) => {
	window.targetLighting = window.lighting[selectLighting.value];
	selectType.value = window.targetLighting.type
	render()
})



const clear = () => {
	document.getElementById("Lighting-color").innerHTML = ``
	document.getElementById("Lighting-coordinates").innerHTML = ``
}

function render() {
	clear()
	if (window.targetLighting.type === "ambient") {
		renderLightingColor()
	} else {
		renderLightingColor()
		if (window.targetLighting.hasOwnProperty("coordinates")) {
			renderLightingCoordinates()
		}
	}
}

render();

