import * as THREE from 'three';
import { BufferGeneric } from './BufferGeneric';
import { Coords2d } from './Coord2d';
import { Coords3d } from './Coords3d';

let camera, scene, renderer;
let geometry, material, movingMesh1, movingMesh2;



const xySize = 1.5;
const zDepthSize = 8;

const bufferSize = 6;
const coords3dBuffer: BufferGeneric<Coords3d> = new BufferGeneric<Coords3d>(bufferSize);


const interpolateSpeed = 1/30;
let currentInterpolateTravelAsFraction = 0;
const backgroundMeshes = [];


export function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 5;

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial({wireframe: true});

	movingMesh1 = new THREE.Mesh( geometry, material);
	movingMesh2 = new THREE.Mesh( geometry, material);

	movingMesh2.position.x = 0.2;


	scene.add( movingMesh1 );	
	
	scene.add( movingMesh2 );


	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );

	renderer.setAnimationLoop( animation );
	document.body.appendChild( renderer.domElement );
}


function animation( time ) {

	renderer.render( scene, camera );
	
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

// window.onresize = init;