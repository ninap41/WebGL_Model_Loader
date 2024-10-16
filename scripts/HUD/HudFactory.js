/* class where chaining happens, return this for chaining */

const { toggleShow, format, capitalize, getInput, hasClass, setOutput, addListener, renderInput, renderTargetSelectDropdown, renderInputGroup, renderSelect } = window.DOMUtils

/*
going to use this to simplify renders
*/
const HUDS = {
	"lighting": {
		wrapperId: "lighting-container",
		shown: true,
		types: ['ambient', 'point', 'directional'],
		inputs: ['type', ' color', 'coordinates'],
		render: (self) => {
			
		},
		addHUDEventListeners: () => { }
	},
	"objects": {
		wrapperId: "objects-container",
		shown: true,
		types: null,
		inputs: ['scale', 'coordinates', 'rotation', 'passible'],
		render: (f) => { },
		addHUDEventListeners: () => { }
	},
	"lighting-master": {
		shown: true,

		wrapperId: "lighting-container",
		types: ['ambient', 'point', 'directional'],
		inputs: ['type', ' color', 'coordinates'],
		render: (f) => {

		},
		addHUDEventListeners: () => { }
	},
	"objects-master": {
		shown: true,
		wrapperId: "lighting-container",
		types: ['ambient', 'point', 'directional'],
		inputs: ['target', 'visible', 'passible'],
		render: (f) => {

		},
		addHUDEventListeners: () => { }
	},

};



class HudFactory {
	key = "name"	// lighting, objects, camera, lighting, camera
	template = ''
	wrapperId = 'name-container'
	maxProperties = null // properties that get displayed in HUD
	dataSource = null // probably window.lighting
	targetSourceId = null
	inputGroupIds = null
	lightingTypes = ["point", "directional", "ambient"]
	HUDProps = {
		coordinates: {
			inputType: "range",
			label: "Coordinates",
			group: true,
			inputs: ["X", "Y", "Z"],
			minMax: [-1500, 1500],
		},
		color: {
			inputType: "range",
			label: "Color",
			group: true,
			inputs: ["R", "G", "B"],
			minMax: [0, 255],

		},
		rotation: {
			inputType: "range",
			label: "Rotation",
			group: true,
			inputs: ["RX", "RY", "RZ"],
			minMax: [-360, 360],
		},
		scale: {
			inputType: "range",
			label: "Scale",
			group: false,
			value: "scale",
			minMax: [0.01, 5],
		},
		passible: {
			inputType: "checkbox",
			label: "Can Walk Through?",
			group: false,
		},
		textures: {
			inputType: "select",
			label: "Texture",
			group: false,
		},
		type: {
			inputType: "select",
			label: "Light Type",
			group: false,
		},
	};
	constructor(HUDS_) {
		this.HUDS = HUDS_
		return this
	}

	build(key, targetSource, maxProperties) {
		
		this.targetSource = targetSource
		this.key = key
		this.wrapperId = `${key}-translator`
		this.maxProperties = maxProperties; //for ambient lighting  
		this.targetSourceId = `target${key}` // onwindow
		this.inputGroupIds = this.generateInputIds(maxProperties)
		this.template = ''
		return this
	}

	generateInputIds(properties) {
		var obj = {}
		properties	/* propertyId ->  coordinates, color, rotation, scale, texture, type propertyAxis -> X, Y, Z, R, G, B, RX, RY, RZ, Scale */
			.forEach((propertyId) => {
				const {group: group_, inputs } =  this.HUDProps[propertyId]
				obj[propertyId] = this.HUDProps[propertyId]
				if (group_) {
					const generateGroupIds = (type) => inputs.map((propertyAxis) => `${this.key}-${propertyAxis}-${type}`)
					obj[propertyId].inputIds = generateGroupIds('input')
					obj[propertyId].outputIds = generateGroupIds('output')
				} else {
					const generateId = (type) => `${this.key}-${propertyId}-${type}`
					obj[propertyId].inputId = generateId('input')
					obj[propertyId].outputId = generateId('output')
				}
			})
		return obj
	}


	// choose --> [----*-----] 
	createPropertyInput= (propertyId) => renderInput(propertyId, this.targetSourceId, this.inputGroupIds[propertyId])

	// choose --> [ 'light1', light2'] 
	createTargetSelectDropdown = () => {
		const keyArrayOfAllOptions = Object.keys(window[`${this.key}`])
		return renderTargetSelectDropdown (Object.keys(window[`${this.key}`]), { sourceObj: window, key: this.key, targetSourceId: this.targetSourceId})
	}

	// [ X Y Z]  [R G B] [RX RY RZ]
	createPropertyInputGroup = (groupName) => renderInputGroup( groupName, window, {targetSourceId:this.targetSourceId, ...this.inputGroupIds[groupName]})

	createPropertySelect = (propertyId, options) => renderSelect(propertyId, options, window, this.targetSourceId,  this.inputGroupIds[propertyId])
	
	renderTitle = () => {
		return `
			<h2>Target ${capitalize(this.key)} &nbsp;
				<i 
					data-value="target-${this.key}" 
					id="clipboard-${this.key}" 
					class="fa-regular fa-clipboard fa-xs" 
					style="color: #b3ffc9;">
				</i>
			</h2>`
	}

	clearTemplate = () => this.template = ``

	render = async () => { // generates the dom
		this.template = this.clearTemplate();
		this.template = this.renderTitle() + this.createTargetSelectDropdown()

		//GUTS
		if (this.key === "lighting") {
			const type = window[`${this.targetSourceId}`].type
			if (type === "ambient") {
				this.template +=
					this.createPropertySelect('type', ['ambient', 'point', 'directional']) +
					this.createPropertyInputGroup("color")
			} else {
				this.template +=
					this.createPropertySelect('type', ['ambient', 'point', 'directional']) +
					this.createPropertyInputGroup("coordinates") +
				this.createPropertyInputGroup("color")

				
			}
			this.template += `<p> To do, color change on axises, add texture, add falloff, update Sketchjs for target Object.  And Toggling on other objects that are not target objects.</p>`
		}
		if (this.key === "objects") {
			this.template +=
				this.createPropertySelect("textures", window.textures) +
				this.createPropertyInput("scale") +
				this.createPropertyInputGroup("coordinates") +
				this.createPropertyInputGroup("rotation");
		}
		document.getElementById(this.wrapperId).innerHTML = this.template
		
		 
	}

	addInputGroupListeners = (propertyKey) => {
		const { inputIds, outputIds } = this.inputGroupIds[propertyKey]
		console.log(inputIds, "hello")
		inputIds.forEach((inputId, idx) => addListener(inputId, "input", (e) => {
			const value = e.target.value
			console.log(value, "VAL!")
			window[`target${this.key}`][propertyKey][idx] = e.target.value
			getInput(outputIds[idx]).innerHTML = format(e.target.value)
		}))

	}

	addInputListener = (propertyKey, callback) => {
		const { outputId, inputType } = this.inputGroupIds[propertyKey]
		addListener(`${this.key}-${propertyKey}-input`, "input", (e) => {
			window[`target${this.key}`][propertyKey] = e.target.value
			if (outputId && getInput(outputId)) getInput(outputId).innerHTML = format(e.target.value)
			if (callback) callback()
		})
	}

	addEventListeners = () => { // Property Types are keys of propertyDictionary
		addListener(`target-${this.key}-select`, "change", (e) => {
			window[`target${this.key}`] = window[this.key.toLowerCase()][e.target.value]
			this.updateDOM()
		})

		addListener(`clipboard-${this.key}`, "click", (e) => { // clipboard
			navigator.clipboard.writeText(JSON.stringify(window[this.targetSourceId]))
			alert(` <b>"${window[this.targetSourceId].id}"</b> Lighting instance  copied to clipboard\n Paste in 'lights'`)
		})


		if (this.key === "lighting") {
			this.addInputListener("type", () => this.updateDOM())
			if (window[`target${this.key}`].type !== "ambient") {
				console.log("ambient listener added")
				this.addInputGroupListeners("color")
				this.addInputGroupListeners("coordinates")
			} else {
				this.addInputGroupListeners("color")
			}
		}
		else if (this.key === "objects") {
			this.addInputListener("scale")
			this.addInputListener("textures")
			this.addInputGroupListeners("coordinates")
			this.addInputGroupListeners("rotation")
		}
	}
	updateDOM() {
		this.render()
		this.addEventListeners()
	}
}

window.lightingHUD = new HudFactory(HUDS).build("lighting", window.targetLighting, ['coordinates', 'color', "type"])
window.objectsHUD = new HudFactory(HUDS).build("objects", window.targetObjects, ['coordinates', 'scale', 'rotation', 'textures', 'type'])
window.lightingHUD.render()
window.lightingHUD.addEventListeners()
window.objectsHUD.render()
window.objectsHUD.addEventListeners()


addListener(`toolbar-camera`, "click", (e) => toggleShow(`camera-translator`, e))
addListener(`toolbar-lighting`, "click", (e) => toggleShow(`lighting-translator`, e))
addListener(`toolbar-objects`, "click", (e) => toggleShow(`objects-translator`, e))

