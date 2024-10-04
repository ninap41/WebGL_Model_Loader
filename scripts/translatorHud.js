/* TRANSLATOR */ 
const format = (num) => devTools().colorKey(Math.floor(num))

document.getElementById("translator-container").innerHTML = `
	<div class="translator">
	<h2>Object Translator (desk)</h2>
	<div id="xOuput">${format(window.desk[0])}</div>
		<input type="range" id="objX" name="objX" min="-100" max="100" />
		<label for="objZ">Input X</label>
	<div id="yOuput">${format(window.desk[1])}</div>
		<input type="range" id="objY" name="objY" min="-100" max="100" />
		<label for="objY">Input Y</label>

		<div id="zOuput">${format(window.desk[2])}</div>
		<input type="range" id="objZ" name="objZ" min="-100" max="100" />
		<label for="objZ">Input Z</label>
</div>
`

const getAxisSlider = (axis) => document.getElementById(`obj${axis}`)
const setOutput = (e, axis, vectorPos) =>  {
	window.desk[vectorPos] = e.target.value
	const output = document.getElementById(`${axis.toLowerCase()}Ouput`)
	if(output) output.innerHTML = format(window.desk[vectorPos])
}
	
[ {name:'X', pos:0}, 
	{name:'Y', pos:1},
	{name:'Z', pos:2}]
	.forEach(axis => getAxisSlider(axis.name).addEventListener( 'input', (e) => setOutput(e, axis.name, axis.pos)))
