import * as THREE from 'three';
import { Plane } from 'three';

let camera, scene, renderer;
let geometry, material, mesh;

let plane: MatrixChar;
class MatrixChar{
	updateSpeed: number = 100; // update speed in ms
	timeElapsedSinceLastUpdate: number = 0;
	char: string;
	plane: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;

	constructor(char, position: THREE.Vector3){
		this.char = char;
		const geometry = new THREE.PlaneGeometry( 1, 1 );
		const material = new THREE.MeshBasicMaterial( 
			{color: "white", side: THREE.DoubleSide, transparent: true} 
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
	constructor(startingPos: THREE.Vector3){
		this.startingPos = startingPos;
	}

	update(time:number){
		
	}
}

init();



function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 10;

	scene = new THREE.Scene();

	// geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	// material = new THREE.MeshNormalMaterial();

	// mesh = new THREE.Mesh( geometry, material );
	// 	scene.add( mesh );

	plane = new MatrixChar("0", new THREE.Vector3(0,0,0));
	
	scene.add(plane.getMesh());

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setAnimationLoop( animation );
	document.body.appendChild( renderer.domElement );

}

function animation( time ) {

	
	console.log(plane);
	plane.update(time);
	
	renderer.render( scene, camera );

	
}

