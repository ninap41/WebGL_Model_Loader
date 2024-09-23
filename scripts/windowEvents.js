window.addEventListener(
	"keydown",
	function (e) {
		// Prevent default behavior for arrow keys
		if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
			e.preventDefault()
		}
	},
	{ passive: false }
)

window.pointerLock = false
