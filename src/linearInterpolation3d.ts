import * as THREE from 'three';
import { BufferGeneric } from './BufferGeneric';
import { Coords2d } from './Coord2d';
import { Coords3d } from './Coords3d';

let camera, scene, renderer;
let geometry, material, movingMesh;
const width = 400;
const height = 400;


const bufferSize = 2;
const directionsBuffer: BufferGeneric<string> = new BufferGeneric<string>(30);

let lines: any = [];

for(let i = 0; i < 20; i++){
	const points = [];
	// @ts-ignore
	points.push( new THREE.Vector3( - 2, -1.9 + i * 0.2, -0.1) );
	// @ts-ignore
	points.push( new THREE.Vector3( 2, - 1.9 + i * 0.2, -0.1 ) );
	const materialLine = new THREE.LineBasicMaterial( { color: "green"} );
	const geometryLine = new THREE.BufferGeometry().setFromPoints( points );
	const line = new THREE.Line( geometryLine, materialLine );
	lines.push(line);
}

for(let i = 0; i < 20; i++){
	const points = [];
	// @ts-ignore
	points.push( new THREE.Vector3( -1.9 + i * 0.2, -2, -0.1) );
	// @ts-ignore
	points.push( new THREE.Vector3( - 1.9 + i * 0.2, 2, -0.1) );
	const materialLine = new THREE.LineBasicMaterial( { color: "green"} );
	const geometryLine = new THREE.BufferGeometry().setFromPoints( points );
	const line = new THREE.Line( geometryLine, materialLine );
	lines.push(line);
}






export function init() {

	camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
	camera.position.z = 3;

	scene = new THREE.Scene();
	

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();

	movingMesh = new THREE.Mesh( geometry, material);
	movingMesh.castShadow = true; //default is false

	scene.add( movingMesh );
	lines.forEach(line => {
		scene.add(line);
	});

	renderer = new THREE.WebGLRenderer( { antialias: true,  } );

	renderer.setSize( width, height, false);
	// renderer.domElement.style.width = "100%";
	renderer.domElement.className = "canvas3d";

	renderer.setAnimationLoop( animation );
	document.body.appendChild( renderer.domElement );
}

const left = {x: -0.2, y: 0};
const right = {x: 0.2, y: 0};
const up = {x: 0, y: 0.2};
const down = {x: 0, y: -0.2};
const evenKeyCodeDirectionsMap = {
	keyw: up,
	keys: down,
	keya: left,
	keyd: right,
	arrowleft: left,
	arrowright: right,
	arrowdown: down,
	arrowup: up
}; 


let flip = false; 
let cubeFlipRotationVal: number = 0;
let degreesOfCube = 0;

let jumpVal = 0;
let jump = false;

let timeElapsed: any = 300;

function animation( time ) {

	renderer.render( scene, camera );

	triggerJump();

	// if(keysPressed != null)
	// 	directionsBuffer.add(keysPressed);
	console.log(time);
	if(keysPressed && time - timeElapsed > 100){
		timeElapsed = time;
		// @ts-ignore
		const directionCode: string = keysPressed;
		// @ts-ignore
		const directionalXAndYCoords = evenKeyCodeDirectionsMap[directionCode];
		movingMesh.position.x += directionalXAndYCoords.x;
		movingMesh.position.y += directionalXAndYCoords.y;
	}

	if(flip == true){
		if(degreesOfCube >= (Math.PI * 2) / 4){
			console.log("end flip");
			flip = false;
			degreesOfCube = 0;
		}else{
			degreesOfCube += ((Math.PI * 2) / 4) / 30;
			movingMesh.rotation.x = degreesOfCube;
			console.log(degreesOfCube);
			console.log(movingMesh.quarternion);
		}
	}

	if(jump == true){
		if(jumpVal >= Math.PI){
			console.log("end flip");
			jump = false;
			jumpVal = 0;
		}else{
			jumpVal += Math.PI / 30;
			movingMesh.position.z = Math.sin(jumpVal) * 1;
		}
	}
	// movingMesh.rotation.x = 1.5;
	console.log(keysPressed);
}

let lastKnownScrollPosition = 0;
function zoom(scrollPos) {
	if(scrollPos + lastKnownScrollPosition > lastKnownScrollPosition){
		camera.position.z += 0.1;
	}else{
		camera.position.z -= 0.1;
	}
	lastKnownScrollPosition =+ scrollPos;
}

document.addEventListener("wheel", (e) => {
	zoom(e.deltaY);
});



// window.addEventListener("keypress", (e) => {
// 	console.log("keyup");
// 	console.log(e.code);
// 	// const directionStrToLowerCase: string = e.code.toLowerCase();
// 	// if(directionStrToLowerCase in evenKeyCodeDirectionsMap)
// 	// 	directionsBuffer.add(directionStrToLowerCase);
// 	// if(directionStrToLowerCase === "space")
// 	// 	triggerJump();
	
// });

let keysPressed: string | null = null;
window.addEventListener("keydown", (e) => {
	console.log("keydown");
	console.log(e.code);
	const directionStrToLowerCase: string = e.code.toLowerCase();
	if(directionStrToLowerCase in evenKeyCodeDirectionsMap)
		keysPressed = directionStrToLowerCase;
		// directionsBuffer.add(directionStrToLowerCase);
	if(directionStrToLowerCase === "space")
		triggerJump();
});

window.addEventListener("keyup", (e) => {
	// const directionStrToLowerCase: string = e.code.toLowerCase();
	keysPressed = null;
})

function triggerJump(){
	flip = true;
	jump = true;
}

window.addEventListener("click", () => {
	triggerJump();
})

// window.onresize = init;