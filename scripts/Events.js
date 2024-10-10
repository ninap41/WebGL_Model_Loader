window.addEventListener(
	"keydown",
	function(e) {
		// Prevent default behavior for arrow keys
		if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
			e.preventDefault()
		}
	},
	{ passive: false }
)

function mousePressed() {
	if (mouseIsPressed) return "I am pressed"
	else return "not"
}

function keyPressed() {
		if (key === 'c') {
			if (!window.pointerLock) {
				window.pointerLock = true
			} else {
				window.pointerLock = false
			}
	}
}
