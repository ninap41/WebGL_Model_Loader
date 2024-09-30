/* TRANSLATOR */ 
document.getElementById("translator-container").innerHTML = `
	<div class="translator">
		input x: <button id="xDecrease">-</button> <span id="objX">${window.desk[0]}</span> <button id="xIncrease">+</button><br>
		input y: <button id="yDecrease">-</button>  <span id="objY">${window.desk[0]}</span><button  id="xIncrease">+</button><br>
		input z: <button id="zDecrease">-</button>  <span id="objZ">${window.desk[0]}</span> <button  id="xIncrease">+</button><br>
</div>
`
// for finding postions of a model object
 document.getElementById("objX").innerHTML = window.desk[0]
 document.getElementById("objY").innerHTML= window.desk[1]
document.getElementById("objZ").innerHTML= window.desk[2]

document.getElementById("xIncrease").addEventListener("click", () => {
	window.desk[0] = window.desk[0] += 1
	 document.getElementById("objX").innerHTML= window.desk[0]

})
document.getElementById("xDecrease").addEventListener("click", () => {
	window.desk[0] = window.desk[0] -= 1
	 document.getElementById("objX").innerHTML = window.desk[0]
})

