// Function to lock pointer
let movedX = 0
let movedY = 0
let pmouseX = 0
let pmouseY = 0
/* to do - move center mouse https://www.geeksforgeeks.org/how-to-move-mouse-pointer-to-a-specific-position-using-javascript/ */
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

function firstPerson(cam) {
	cam.perspective(0.5)
	const moveSpeed = 10
	const lookSpeed = .5; // the implementation of this may be incorrect, but it works for now. remove multiplication at camX, Y, Z and figure out where to multiple properly ( to do)
// const startingState = {
// 	"azimuth":-1.5707963267948966,"zenith":0,"lookAtDist":0,"mousePrevX":546,"mousePrevY":406.5
// }
	cam.firstPersonState = cam.firstPersonState || {
		azimuth: -atan2(cam.eyeZ - cam.centerZ, cam.eyeX - cam.centerX),
		zenith: -atan2(cam.eyeY - cam.centerY, dist(cam.eyeX, cam.eyeZ, cam.centerX, cam.centerZ)),
		lookAtDist: dist(cam.eyeX, cam.eyeY, cam.eyeZ, cam.centerX, cam.centerY, cam.centerZ) ,
		mousePrevX: mouseX / 2 + mouseX,
		mousePrevY:  mouseY / 2 + mouseY,
	}
		// 	console.log(JSON.stringify( cam.firstPersonState ))
		// noLoop()
		// Look around controls
	/*
	
	(mouseX / 2 + mouseX) && (mouseY / 2 + mouseY) 
	!!this LOGIC is so IMPORTANT when activating the cursor. it offsets the position of the cursor that the center of the screen is at 0,0 vector */
		cam.firstPersonState.azimuth -= ((mouseX / 2 + mouseX) - cam.firstPersonState.mousePrevX) / 100
		if (abs(cam.firstPersonState.zenith + ((mouseY / 2 + mouseY) - cam.firstPersonState.mousePrevY) / 100) < PI / 2)
			cam.firstPersonState.zenith += ((mouseY / 2 + mouseY) - cam.firstPersonState.mousePrevY) / 100

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
		cam.firstPersonState.mousePrevX =(mouseX / 2 + mouseX) 
		cam.firstPersonState.mousePrevY = (mouseY / 2 +  mouseY)

		// Update the look-at point
		cam.centerX =
			(cam.eyeX - cam.firstPersonState.lookAtDist * (cos(cam.firstPersonState.zenith) * cos(cam.firstPersonState.azimuth))) * lookSpeed
		cam.centerY = (cam.eyeY + cam.firstPersonState.lookAtDist * sin(cam.firstPersonState.zenith)) * lookSpeed
		cam.centerZ =
			(cam.eyeZ + cam.firstPersonState.lookAtDist * (cos(cam.firstPersonState.zenith) * sin(cam.firstPersonState.azimuth))) *lookSpeed

	if (window.pointerLock) {

		camera(
			cam.eyeX, // position of person
			cam.eyeY,
			cam.eyeZ,
			cam.centerX,// rotation of cameraww
			cam.centerY,
			cam.centerZ, 
			0,
			1,
			0
		) // up vector

		noCursor()
	} else {
	   cursor( 'crosshair', cam.firstPersonState.mousePrevX, cam.firstPersonState.mousePrevY) // Restore default cursor
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
		   centerZ ${devTools().colorKey(Math.floor(cam.centerZ))}<br></div> 
			 `
		/* camera([x], [y], [z], [centerX], [centerY], [centerZ], [upX], [upY], [upZ]) */
	}
}
p5.prototype.registerMethod("firstPerson", firstPerson)
