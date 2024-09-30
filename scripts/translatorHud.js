/* TRANSLATOR */ 
const format = (num) => devTools().colorKey(Math.floor(num))
document.getElementById("translator-container").innerHTML = `
	<div class="translator">
		<div class="translator-items">
			input x: 
			<button id="xDecrease">-</button> 
			<span id="objX">${format(window.desk[0])}</span> 
			<button id="xIncrease">+</button>
		</div><br>
		<div class="translator-items">
			input y: 
			<button id="yDecrease">-</button>  
			<span id="objY">${format(window.desk[1])}</span>
			<button id="xIncrease">+</button>
		</div><br>
		<div class="translator-items">
		   input z: <button id="zDecrease">-</button> 
			 <span id="objZ">${format(window.desk[2])}</span> 
			 <button  id="xIncrease">+</button>
		</div><br>
</div>
`
// for finding postions of a model object
 document.getElementById("objX").innerHTML = format(window.desk[0])
 document.getElementById("objY").innerHTML=  format(window.desk[1])
document.getElementById("objZ").innerHTML= format(window.desk[2])

document.getElementById("xIncrease").addEventListener("click", () => {
	window.desk[0] = window.desk[0] += 1
	 document.getElementById("objX").innerHTML=  format(window.desk[0])

})
document.getElementById("xDecrease").addEventListener("click", () => {
	window.desk[0] = window.desk[0] -= 1
	 document.getElementById("objX").innerHTML =  format(window.desk[0])
})

