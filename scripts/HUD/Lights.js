/* LIGHT TRANSLATOR */
// https://p5.readthedocs.io/en/latest/reference/lights.html#p5.ambient_light
/* HUD HTML */
const lightTypes = ["point", "directional", "ambient"]
document.getElementById("light-translator").innerHTML = `
<h2>Light	<i data-value2="targetLight" id="clipboard2" class="fa-regular fa-clipboard fa-xs" style="color: #b3ffc9;"></i></h2>

Target Light: &nbsp;
<select id="targetLightSelect">
	${Object.keys(window.lighting).map((light) => `<option value="${light}" ${window.targetLight.id === light ? `selected="${light}"` : ``}>${light}</option>`).join("")}<br>
</select><br>

Target Light Type: &nbsp;
<select id="targetLightType">
	${lightTypes.map((lightType) => `<option value="${lightType}" 
	${window.targetLight.type === lightType ? `selected="${lightType}"` : ``}>${lightType}</option>`).join("")}<br>
</select>
<div id="light-color"></div>
<div id="light-coordinates"></div>

` + "<p> To do, color change on axises, add texture, add falloff, update Sketchjs for target Object.  And Toggling on other objects that are not target objects.</p>"


/* ______________________________ */
const renderLightCoordinates = () => {
	const lightCoordinates = document.getElementById("light-coordinates")
	lightCoordinates.innerHTML = `
		<div id="light-coordinates">
		 Coordinates: <br>
			<input type="range" id="lightX" name="lightX" min="${minTrans}" max="${maxTrans}" value="${window.targetLight.coordinates[0]}" />
			<label for="lightZ">X <span id="xColorOuput">${format(window.targetLight.coordinates[0])}</span> </label><br>
			
			<input type="range" id="lightY" value="${window.targetLight.coordinates[1]}" name="lightY" min="${minTrans}" max="${maxTrans}" />
			<label for="lightY">Y <span id="yColorOuput">${format(window.targetLight.coordinates[1])}</span> </label><br>
			<input type="range" id="lightZ" name="lightZ" min="-1500" max="15000" value="${window.targetLight.coordinates[2]}" />
			<label for="lightZ">Z &nbsp;<span id="zColorOuput">${format(window.targetLight.coordinates[2])}</span> </label>
		</div>`

	const getLightAxisSlider = (axis) => document.getElementById(`light${axis}`)
	const setLightAxisOutput = (e, axis, vectorPos) => {
		let output = document.getElementById(`${axis.toLowerCase()}ColorOuput`)
		window.targetLight['coordinates'][vectorPos] = Number(e.target.value)
		if (output) output.innerHTML = format(window.targetObject['coordinates'][vectorPos])
	}

	[{ name: 'X', pos: 0 },
	{ name: 'Y', pos: 1 },
	{ name: 'Z', pos: 2 }].forEach(axis => {
		var slide = getLightAxisSlider(axis.name)
		slide.addEventListener('input', (e) => setLightAxisOutput(e, axis.name, axis.pos))
	})
}

const renderLightColor = () => {
	const lightColor = document.getElementById('light-color')
	lightColor.innerHTML = `
	RGB: <br>
			<input type="range"id="lightColorR" name="lightColorR" min="0" max="255" value="${window.targetLight.color[0]}" />
			<label for="lightColorR"> R &nbsp;<span id="rColorOuput">${window.targetLight.color[0]}</span> </label><br>
			<input type="range"id="lightColorG" name="lightColorG" min="0" max="255" value="${window.targetLight.color[1]}" />
			<label for="lightColorG"> G &nbsp;<span id="gColorOuput">${window.targetLight.color[1]}</span> </label><br>
			<input type="range"id="lightColorB" name="lightColorB" min="0" max="255" value="${window.targetLight.color[2]}" />
			<label for="lightColorB"> B &nbsp;<span id="bColorOuput">${window.targetLight.color[2]}</span> </label><br>`

	/* TARGET lightECT MUTATION */
	const getLightColorSlider = (color) => document.getElementById(`lightColor${color}`)

	const setLightColorOutput = (e, color, colorPos) => {
		let output = document.getElementById(`${color.toLowerCase()}ColorOuput`)
		window.targetLight['color'][colorPos] = Number(e.target.value)
		if (output) output.innerHTML = format(window.targetLight['color'][colorPos])
	}

	[{ name: 'R', pos: 0 },
	{ name: 'G', pos: 1 },
	{ name: 'B', pos: 2 }
	].forEach(color => {
		const slide = getLightColorSlider(color.name)
		slide.addEventListener('input', (e) => setLightColorOutput(e, color.name, color.pos))
	})

}




/* COPY model light TO CLIPBOARD */
document.getElementById("clipboard2").addEventListener("click", function(e) {
	const windowTargetId = this.getAttribute('data-value2');
	navigator.clipboard.writeText(JSON.stringify(window[windowTargetId]))
	alert(` <b>"${window[windowTargetId].id}"</b> light instance  copied to clipboard\n Paste in 'lights'`)
})

const selectType = document.getElementById("targetLightType")
selectType.addEventListener('change', (e) => {
	window.targetLight.type = selectType.value
	render()
})

const selectLight = document.getElementById("targetLightSelect")
selectLight.addEventListener('change', (e) => {
	console.log("SelectLightChange")
	window.targetLight = window.lighting[selectLight.value];
	selectType.value = window.targetLight.type
	render()
})



const clear = () => {
	document.getElementById("light-color").innerHTML = ``
	document.getElementById("light-coordinates").innerHTML = ``
}

function render() {
	clear()
	if (window.targetLight.type === "ambient") {
		renderLightColor()
	} else {
		renderLightColor()
		if (window.targetLight.hasOwnProperty("coordinates")) {
			renderLightCoordinates()
		}
	}
}

render();

