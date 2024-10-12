window.HudGenerator = (key) => {
	const format = (num) => devTools().colorKey(num)
	const property_dictionary = {
		coordinates: ["X", "Y", "Z"],
		color: ["R", "G", "B"],
		rotation: ['RX', 'RY', 'RZ'],
		

	}
	const lowerKey = key.toLowerCase()
	const lightingTypes = ["point", "directional", "ambient"]
	const renderScale = () => {
		return 	`Scale <br>
		<input type="range" id="${key}-Scale" name="${key}-Scale" min="-1" step=".01" max="100" value="${window.target[`target${key}`].scale}" />`
	}
	const renderRotation = () => {
		
		return `Rotation: <br>
		<input type="range"id="${key}-RX" name="${key}-RX" min="-360" max="360" value="${window[`target${key}`].rotation[0]}" />
		<label for="${key}-RX">X R &nbsp;<span id="rx-${key}-Ouput">${format(window[`target${key}`].rotation[0])}</span> </label>
		<input type="range"id="${key}-RY" name="${key}-RY" min="-360" max="360" value="${window[`target${key}`].rotation[1]}" />
		<label for="${key}-RY">Y R &nbsp;<span id="ry-${key}-Ouput">${format(window[`target${key}`].rotation[1])}</span> </label>
		<input type="range"id="${key}-RZ" name="Object-RZ" min="-360" max="360" value="${window[`target${key}`].rotation[2]}" />
		<label for="${key}-RZ">Z R &nbsp;<span id="rz-${key}-Ouput">${format(window[`target${key}`].rotation[2])}</span> </label>`
	}
	const renderCoordinates = () => {
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
				<input type="range"id="${key}-R" value="${window[`target${key}`].color[0]}" name="${key}-R" min="0" max="255" value="${window[`target${key}`].color[0]}" />
				<label for="${key}-R"> R &nbsp;<span id="r-Ouput">${window[`target${key}`].color[0]}</span> </label><br>
				<input type="range"id="Lighting-G" value="${window[`target${key}`][1]}" name="${key}-G" min="0" max="255" value="${window[`target${key}`].color[1]}" />
				<label for="${key}-G"> G &nbsp;<span id="g-Ouput">${window[`target${key}`].color[1]}</span> </label><br>
				<input type="range"id="${key}-B" value="${window[`target${key}`][2]}" name="${key}-B" min="0" max="255" value="${window[`target${key}`].color[2]}" />
				<label for="${key}-B"> B &nbsp;<span id="b-Ouput">${window[`target${key}`][2]}</span> </label><br>`

	}
	const renderType = () => {
		console.log(key)
		return `Target ${key} Type: &nbsp;
		<select id="${key}-type">
			${lightingTypes.map((type) => `<option value="${type}" 
			${window.targetLighting.type === type ? `selected="${type}"` : ``}>${type}</option>`).join("")}<br>
		</select>`
	}
	
	const renderHTML = (key) => {
		let template = `
	<h2>${key}<i data-value="target${key}" id="clipboard-${key}" class="fa-regular fa-clipboard fa-xs" style="color: #b3ffc9;"></i></h2>
	Target ${key}: &nbsp;
	<select id="target${key}Select">
			${Object.keys(window[`${lowerKey}`]).map((targetValue) => `<option value="${targetValue}" ${window[`target${key}`].id === targetValue ? `selected="${targetValue}"` : ``}>${targetValue}</option>`).join("")}<br>
	</select><br>`

		//GUTS
			if (key === "Lighting") {
				if (window.targetLighting.type === "ambient") {
					template += renderType() + renderColor() + 
					`<div id="` + key + `-color"></div>` +
				  `<div id=` + key + `-coordinates"></div>`
				} else {
				 template += renderType() + renderColor() + renderCoordinates() + 
					`<div id="` + key + `-color"></div>` +
				 ` <div id=` + key + `-coordinates"></div>`

				}
			}
			if (key === "Object") {
				template += renderScale() + renderCoordinates() + renderRotation() 
			}

		
	template += `<p> To do, color change on axises, add texture, add falloff, update Sketchjs for target Object.  And Toggling on other objects that are not target objects.</p>`  
		document.getElementById(`Lighting-translator`).innerHTML = template
		// console.log(template, "TEMP")
		return template
	}

	/* @key - 'Object' | 'Lighting' */
	const getAxisSlider = (axis) => {
		return document.getElementById(`${key}-${axis}`)
	}

	const setOutput = (e, outputKey, idx) => {
			let output = document.getElementById(`${key.toLowerCase()}-${outputKey}-Ouput`)
			window[`target${key}`][key][idx] = Number(e.target.value)
			if (output) output.innerHTML = window[`target${key}`][outputKey][idx]
		}

	const addListener = (property_key) => {
		const slider = getAxisSlider(property_key)
			if(slider) {
				slider.addEventListener('input', (e) => setOutput(e, property_key, 0)) 
			} else {
				console.log(`${axis} - ${key} not present on dom. prop key:${property_key}`)
			}
	}
	const addGroupListener = (property_key) => property_dictionary[property_key].forEach((axis, idx) => { 
		const slider = getAxisSlider(axis)
			if(slider) {
				slider.addEventListener('input', (e) => {
					setOutput(e, axis, idx)
				})
			} else {
			 console.log(`${axis} - ${key} not present on dom. prop key:${property_key}`)
			}
})


	const generateHudComponent = {
		Objects:  
			(hidden) => {
				const render = async () => renderHTML("Objects", property_dictionary, hidden)
			const addEventListeners = () => {
					addSelectInstanceListener(key)
					addGroupListener('coordinates')
					addGroupListener('rotation')
					addListener("scale")
					addClipboardListener("Object", "click")
				}
				return { render, addEventListeners }
			},
		Lighting: (hidden) =>  {
				const render = async () => renderHTML("Lighting", property_dictionary, hidden)
				const addEventListeners = async () => {
						addSelectInstanceListener(key)
					  addListener('type')
						addGroupListener('color')
						addGroupListener('coordinates')
						addClipboardListener("Lighting","click")
					}
				return { render, addEventListeners }
		}
	}

		const addClipboardListener = (key) => {
			document.getElementById(`clipboard-${key}`).addEventListener("click", function(e) {
				const windowTargetId = this.getAttribute('data-value');
				navigator.clipboard.writeText(JSON.stringify(window[windowTargetId]))
				alert(` <b>"${window[windowTargetId].id}"</b> ${key}  copied to clipboard\n Paste in '${key}(s)'`)
			})
		}
	
	const addSelectInstanceListener = (key_) => {
		const selectInstance = document.getElementById(`target${key_}Select`)
		if(selectInstance) {
			selectInstance.addEventListener('change', (e) => {
				console.log(`select`, selectInstance.value)
				console.log("change")
				window[`target${key_}`] = window[key.toLowerCase()][selectInstance.value]
					const newInstance = generateHudComponent[key_]()
						newInstance.render()
				    newInstance.addEventListeners()
			})
		}

	}

	// do the same as  addSelectInstanceListener for scale and type



	return {  generateHudComponent   }
}
