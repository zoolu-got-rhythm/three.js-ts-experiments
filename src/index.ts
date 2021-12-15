import * as THREE from 'three';
import { Plane } from 'three';
import { BufferGeneric } from './BufferGeneric';

class MatrixChar{
	updateSpeed: number = 100; // update speed in ms
	timeElapsedSinceLastUpdate: number = 0;
	char: string;
	plane: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;

	constructor(char, position: THREE.Vector3){
		this.char = char;
		const geometry = new THREE.PlaneGeometry( 1, 1 );
		const material = new THREE.MeshBasicMaterial( 
			{color: "lime", side: THREE.DoubleSide, transparent: true} 
		);
		this.plane = new THREE.Mesh( geometry, material );
		this.plane.position.copy(position);
	}

	getMesh(){
		return this.plane;
	}

	update(time: number){
		if(!(time - this.timeElapsedSinceLastUpdate >= this.updateSpeed))
			return;
		this.plane.material.opacity -= 0.05;
		this.updateTimeElapsedSinceLastUpdate(time);
	}

	updateTimeElapsedSinceLastUpdate(time: number){
		this.timeElapsedSinceLastUpdate = time;
	}
}

class MatrixCharRain{
	startingPos: THREE.Vector3;
	bufferMatrixChar: BufferGeneric<MatrixChar>;
	spawnNewMatrixCharSpeed: number = 200; // update speed in ms
	timeElapsedSinceLastUpdate: number = 0;
	sceneRef: THREE.Scene; 
	constructor(scene: THREE.Scene, startingPos: THREE.Vector3, size: number){
		this.startingPos = startingPos;
		this.sceneRef = scene;
		this.bufferMatrixChar = new BufferGeneric(size);
		const matrixChar = new MatrixChar("", new THREE.Vector3(startingPos.x, startingPos.y, startingPos.z));
		this.sceneRef.add(matrixChar.getMesh());
		this.bufferMatrixChar.add(matrixChar);
	}

	add(){
		let vectorOfPrevMatrixCharInBuffer = this.bufferMatrixChar.buffer[this.bufferMatrixChar.buffer.length - 1].getMesh().position;
		const matrixChar = new MatrixChar("", new THREE.Vector3(
			vectorOfPrevMatrixCharInBuffer.x, vectorOfPrevMatrixCharInBuffer.y-1, vectorOfPrevMatrixCharInBuffer.z
		));
		this.sceneRef.add(matrixChar.getMesh());
		const matrixCharToRemove = this.bufferMatrixChar.add(matrixChar);
		if(matrixCharToRemove)
			this.sceneRef.remove(matrixCharToRemove.getMesh());
	}

	update(time: number){
		if((time - this.timeElapsedSinceLastUpdate >= this.spawnNewMatrixCharSpeed)){
			console.log("add");
			this.add();
			this.updateTimeElapsedSinceLastUpdate(time);
		}
		this.bufferMatrixChar.buffer.forEach((matrixChar: MatrixChar) => matrixChar.update(time));
	}

	updateTimeElapsedSinceLastUpdate(time: number){
		this.timeElapsedSinceLastUpdate = time;
	}
}

init();

let camera, scene, renderer, codeRain;
let geometry, material, mesh;

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 50 );
	camera.position.z = 49;

	scene = new THREE.Scene();

	codeRain = new MatrixCharRain(scene, new THREE.Vector3(0,5,0), 10);
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setAnimationLoop( animation );
	document.body.appendChild( renderer.domElement );
}

function animation( time ) {	
	console.log(codeRain);
	codeRain.update(time);
	renderer.render( scene, camera );
}

