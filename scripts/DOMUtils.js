(function(global) {

	const format = (num) => devTools().colorKey(num)
	
	const capitalize = (word) => {
		if (word.length === 0) return word; // Handle empty strings
		return word.charAt(0).toUpperCase() + word.slice(1);
	}
	
	const getInput = (id) => document.getElementById(id)
	
	const hasClass = (el, className) => el.classList.contains(className)
	
	const addListener = (id, event, callback) => {
		const input = document.getElementById(id)
		if (input) return input.addEventListener(event, (e) => callback(e))
	}

	const toggleShow = (id, e) => {
		const wrapper = document.getElementById(id)
		wrapper.classList.contains("hide")
			? wrapper.classList.remove("hide") : wrapper.classList.add("hide")
	}

	const renderInput = ( propertyId, targetSourceId, context ) => {
			const { label, inputId, outputId, inputType, minMax } = context
			return `
			${label}: &nbsp;
			<input 
				type="${inputType}" 
				class="input"
				id="${inputId}" 
				${inputType === 'range' ? `step=".1"` : ''} 
				value="${window[`${targetSourceId}`].scale}" 
				name="${inputId}"  
				${minMax ? ` min="${minMax[0]}" max="${minMax[1]}"` : ''}  />
				<label for="${inputId}">  
						<span id="${outputId}">
							${format(window[`${targetSourceId}`][propertyId])}
						</span> 	
					</label>`
 
		
	}

	const renderSelect_ = (options, context) => {
		let { sourceObj, key, targetSourceId, label } = context
		return `Target: &nbsp;
			<select id="target-${key}-select">
					${options.map((option) => `
						<option value="${option}"  ${window[`${targetSourceId}`].id === option ? `selected="${option}"` : ``}>	
							${option}
						</option>`)}
			</select><br>`
	}


	global.DOMUtils = {
		format,
		capitalize,
		getInput,
		hasClass,
		addListener,
		toggleShow,
		renderInput,
		renderSelect_,
	}
})(window);

