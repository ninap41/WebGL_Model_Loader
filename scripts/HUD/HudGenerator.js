export default HudGenerator = (key) => {
	const lowerKey = key.toLowerCase()
	const renderScale = (key) => {
		return 	`Scale <br>
		<input type="range" id="${key}-Scale" name="${key}-Scale" min="-1" step=".01" max="100" value="${window.target[`target${key}`].scale}" />`
	}
	
	const renderRotation = (key) => {
		return `Rotation: <br>
		<input type="range"id="${key}-RX" name="${key}-RX" min="-360" max="360" value="${window[`target${key}`].rotation[0]}" />
		<label for="${key}-RX">X R &nbsp;<span id="rx-${key}-Ouput">${format(window[`target${key}`].rotation[0])}</span> </label>
		<input type="range"id="${key}-RY" name="${key}-RY" min="-360" max="360" value="${window[`target${key}`].rotation[1]}" />
		<label for="${key}-RY">Y R &nbsp;<span id="ry-${key}-Ouput">${format(window[`target${key}`].rotation[1])}</span> </label>
		<input type="range"id="${key}-RZ" name="Object-RZ" min="-360" max="360" value="${window.[`target${key}`].rotation[2]}" />
		<label for="${key}-RZ">Z R &nbsp;<span id="rz-${key}-Ouput">${format(window[`target${key}`].rotation[2])}</span> </label>`
	}
	

	const renderCoordinates = (key) => {
		 return `Coordinates: <br>
			<input type="range" id="${key}-X" name="${key}-X" min="-1500" max="1500" value="${window[`target${key}`][0]}" />
			<label for="${key}-X">X <span id="x-${key}-Ouput">${format(window[`target${key}`].coordinates[0])}</span> </label>

			<input type="range" id="${key}-Y" value="${window[`target${key}`].coordinates[1]}" name="${key}-Y" min="-1500" max="1500" />
			<label for="${key}-Y">Y <span id="y-${key}-Ouput">${format(window[`target${key}`].coordinates[1])}</span> </label>
			<input type="range" id="${key}-Z" name="${key}-Z" min="-1500" max="1500" value="${window[`target${key}`].coordinates[2]}" />`
	}
	
	const renderColor = () => {
		return `
		RGB: <br>
				<input type="range"id="${key}-Color-R" value="${window[`target${key}`].color[0]}" name="${key}-Color-R" min="0" max="255" value="${window[`target${key}`].color[0]}" />
				<label for="${key}-Color-R"> R &nbsp;<span id="r-Color-Ouput">${window[`target${key}`].color[0]}</span> </label><br>
				<input type="range"id="Lighting-Color-G" value="${window[`target${key}`][1]}" name="${key}-Color-G" min="0" max="255" value="${window[`target${key}`].color[1]}" />
				<label for="${key}-Color-G"> G &nbsp;<span id="g-Color-Ouput">${window[`target${key}`].color[1]}</span> </label><br>
				<input type="range"id="${key}-Color-B" value="${window[`target${key}`][2]}" name="${key}-Color-B" min="0" max="255" value="${window[`target${key}`].color[2]}" />
				<label for="${key}-Color-B"> B &nbsp;<span id="b-Color-Ouput">${window[`target${key}`][2]}</span> </label><br>`

	}
	const renderType = () => {
		`Target ${key} Type: &nbsp;
		<select id="target${key}Type">
			${lightingTypes.map((type) => `<option value="${type}" 
			${window.targetLighting.type === lightType ? `selected="${type}"` : ``}>${type}</option>`).join("")}<br>
		</select>`
	}
	const renderTranslator = (key) => document.getElementById(`${key}-translator`).innerHTML = `
	<h2>${key}	<i data-value="target${key}" id="clipboard-${key}" class="fa-regular fa-clipboard fa-xs" style="color: #b3ffc9;"></i></h2>

	Target ${key}: &nbsp;
	<select id="target${key}Select">
			${Object.keys(window[`${lowerKey}`]).map((targetValue) => `<option value="${targetValue}" ${window[`target${key}`].id === targetValue ? `selected="${targetValue}"` : ``}>${targetValue}</option>`).join("")}<br>
	</select><br>

${() => {
			if (key === "Lighting") {
				if (window.targetLighting.type === "ambient") {
					return renderType() + renderColor() + `<div id="${key}-color"></div>
				<div id="${key}-coordinates"></div>`

				} else {
					return renderType() + renderColor() + renderCoordinates() + `<div id="${key}-color"></div>
				<div id="${key}-coordinates"></div>`
				}
			}
			if (key === "Object") {
				return renderScale() + renderCoordinates() +renderRotation() 
			}

		}} ` + "<p> To do, color change on axises, add texture, add falloff, update Sketchjs for target Object.  And Toggling on other objects that are not target objects.</p>"




	const addClipboard = (key) => {
		document.getElementById(`clipboard-${key}`).addEventListener("click", function(e) {
			const windowTargetId = this.getAttribute('data-value');
			navigator.clipboard.writeText(JSON.stringify(window[windowTargetId]))
			alert(` <b>"${window[windowTargetId].id}"</b> ${key}  copied to clipboard\n Paste in '${key}(s)'`)
		})
	}

	const selectInstance = document.getElementById(`target${key}Select`)
	selectInstance.addEventListener('change', (e) => {
		window[`target${key}`] = window[key.toLowerCase()][selectObject.value]
	})


	/* @key - 'Object' | 'Lighting' */
	const getAxisSlider = (axis) => document.getElementById(`${key}-${axis}`)

	const property_dictionary = {
		coordinates: ["X", "Y", "Z"],
		color: ["R", "G", "B"],
		rotation: ['RX', 'RY', 'RZ'],
		scale: "Scale"
	}

	const setOutput = (e, outputKey, idx) => {
			let output = document.getElementById(`${key.toLowerCase()}-${outputKey}-Ouput`)
			window[`target${key}`][key][idx] = Number(e.target.value)
			if (output) output.innerHTML = window[`target${key}`][outputKey][idx]
		}

	const set = (key) => getAxisSlider(key).addEventListener('input', (e) => setOutput(e, axis))
	const add = (key) => property_dictionary[key].forEach((axis, idx) => getAxisSlider(axis).addEventListener('input', (e) => setOutput(e, axis, idx)))

	const HUDMAP = {
		"Object": {
			shown: true,
			
			render: () => {
				renderTranslator("Object", property_dictionary)
			
				add('coordinates')
				add('rotation')
				set("scale")
				addClipboard("Object")
			}
		},
		"Lighting": {
			shown: true,
			render: () => {
				renderTranslator("Lighting", property_dictionary)
				if (window.targetLighting.type === "ambient") {
					add('rgb')//listeners
				} else {
					add('rgb')
					add('coordinates')
				}
				addClipboard("Lighting")
			},
		}
	}

	const generateHud = (key_) => HUDMAP[key_].render(key_, selectInstance.value)

	return { generateHud }
}
