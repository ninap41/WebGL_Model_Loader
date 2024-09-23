// Function to lock pointer
let movedX = 0
let movedY = 0
let pmouseX = 0
let pmouseY = 0
// this is needed to catch the exit from pointerLock when user presses ESCAPE
function mousePressed() {
	if (mouseIsPressed) return "I am pressed"
	else return "not"
}

function mouseClicked() {
	if (!window.pointerLock) {
		window.pointerLock = true
	} else {
		window.pointerLock = false
	}
}

function firstPerson(cam) {
	const lookSpeed = 0.9
	const moveSpeed = 5

	cam.firstPersonState = cam.firstPersonState || {
		azimuth: -atan2(cam.eyeZ - cam.centerZ, cam.eyeX - cam.centerX),
		zenith: -atan2(cam.eyeY - cam.centerY, dist(cam.eyeX, cam.eyeZ, cam.centerX, cam.centerZ)),
		lookAtDist: dist(cam.eyeX, cam.eyeY, cam.eyeZ, cam.centerX, cam.centerY, cam.centerZ),
		mousePrevX: mouseX,
		mousePrevY: mouseY,
	}
	if (window.pointerLock) {
		// Look around controls
		cam.firstPersonState.azimuth -= (mouseX - cam.firstPersonState.mousePrevX) / 100
		if (abs(cam.firstPersonState.zenith + (mouseY - cam.firstPersonState.mousePrevY) / 100) < PI / 2)
			cam.firstPersonState.zenith += (mouseY - cam.firstPersonState.mousePrevY) / 100

		// Movement controls
		if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
			cam.eyeX -= moveSpeed * cos(cam.firstPersonState.azimuth)
			cam.eyeZ += moveSpeed * sin(cam.firstPersonState.azimuth)
		}
		if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
			cam.eyeX += moveSpeed * cos(cam.firstPersonState.azimuth)
			cam.eyeZ -= moveSpeed * sin(cam.firstPersonState.azimuth)
		}
		if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
			cam.eyeX -= moveSpeed * cos(cam.firstPersonState.azimuth + PI / 2)
			cam.eyeZ += moveSpeed * sin(cam.firstPersonState.azimuth + PI / 2)
		}
		if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
			cam.eyeX += moveSpeed * cos(cam.firstPersonState.azimuth + PI / 2)
			cam.eyeZ -= moveSpeed * sin(cam.firstPersonState.azimuth + PI / 2)
		}

		// Update previous mouse position
		cam.firstPersonState.mousePrevX = mouseX
		cam.firstPersonState.mousePrevY = mouseY

		// Update the look-at point
		cam.centerX =
			cam.eyeX - cam.firstPersonState.lookAtDist * (cos(cam.firstPersonState.zenith) * cos(cam.firstPersonState.azimuth))
		cam.centerY = cam.eyeY + cam.firstPersonState.lookAtDist * sin(cam.firstPersonState.zenith)
		cam.centerZ =
			cam.eyeZ + cam.firstPersonState.lookAtDist * (cos(cam.firstPersonState.zenith) * sin(cam.firstPersonState.azimuth))

		// Call the built in p5 function 'camera' to position and orient the camera
		camera(
			cam.eyeX,
			cam.eyeY,
			cam.eyeZ, // position
			cam.centerX * lookSpeed,
			cam.centerY * lookSpeed,
			cam.centerZ * lookSpeed, // look-at
			0,
			1,
			0
		) // up vector
		noCursor()
	} else {
		cursor() // Restore default cursor
	}

	if (devConfig.devMode) {
		document.getElementById("camera").innerHTML = `
		<div class="hud">
		<h3>MOUSE </h3>
		 pressed  ${mousePressed()}  <br><br>

			pmouseX  ${Math.floor(pmouseX)}  <br>
		 pmouseY  ${Math.floor(pmouseY)}<br>
		movedX  ${Math.floor(movedX)}  <br>
		 movedY  ${Math.floor(movedY)}<br>
	    mouseX  ${Math.floor(mouseX)}  <br>
		mouseY  ${Math.floor(mouseY)}<br><br>
	    <h3>Camera</h3><br>
	    eyeX  ${devTools().colorKey(Math.floor(cam.eyeX))}  <br>
		 eyeY  ${devTools().colorKey(Math.floor(cam.eyeY))}<br>
		  eyeZ ${devTools().colorKey(Math.floor(cam.eyeZ))}
		  <br>
	    <br>
	    centerX  ${devTools().colorKey(Math.floor(cam.centerX))} <br>  
		  centerY ${devTools().colorKey(Math.floor(cam.centerY))} <br>
		   centerZ ${devTools().colorKey(Math.floor(cam.centerZ))}<br></div> `
		/* camera([x], [y], [z], [centerX], [centerY], [centerZ], [upX], [upY], [upZ]) */
	}
}
p5.prototype.registerMethod("firstPerson", firstPerson)
