import * as THREE from 'three';
import { BufferGeneric } from './BufferGeneric';
import { Coords2d } from './Coord2d';
import { Coords3d } from './Coords3d';

let camera, scene, renderer;
let geometry, material, movingMesh;
const width = 500;
const height = 500;


const xySize = 1.5;
const zDepthSize = 8;

const bufferSize = 2;
const coords3dBuffer: BufferGeneric<Coords3d> = new BufferGeneric<Coords3d>(bufferSize);


const interpolateSpeed = 1/30;
let currentInterpolateTravelAsFraction = 0;
const backgroundMeshes = [];


export function init() {

	camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
	camera.position.z = 5;

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();

	movingMesh = new THREE.Mesh( geometry, material);
	scene.add( movingMesh );

	renderer = new THREE.WebGLRenderer( { antialias: true,  } );
	renderer.setSize( width, height, false);
	// renderer.domElement.style.width = "100%";
	renderer.domElement.className = "canvas3d";


	for (let i = 0; i < bufferSize; i++) {
		const coOrds3d = new Coords3d(-xySize/2 + Math.random() * xySize, -xySize/2 + Math.random() * xySize, -zDepthSize/2 + Math.random() * zDepthSize);
        coords3dBuffer.add(coOrds3d);
		const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
		const material = new THREE.MeshNormalMaterial({wireframe: true});	
		const mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = coOrds3d.x;
		mesh.position.y = coOrds3d.y;
		mesh.position.z = coOrds3d.z;
		// @ts-ignore
		backgroundMeshes.push(mesh);

		scene.add( mesh );
    }

	renderer.setAnimationLoop( animation );
	document.body.appendChild( renderer.domElement );
}


let spinMainCube = false;
let mainCubeXRotation = 0;

function animation( time ) {

	// mesh.rotation.x = Math.random() * 0.2;
	// mesh.rotation.y = Math.random() * 0.2;
	// mesh.position.x = 2;
	// mesh.position.y = 2;

	// for (let i = 0; i < coOrds3dBuffer.buffer.length; i++) {
    //     const coOrds3d: coOrds3d = coOrds3dBuffer.buffer[i];
    //     // ctx?.beginPath();
    //     // ctx?.arc(coOrds3d.x, coOrds3d.y, 5, 0, Math.PI * 2); 
    //     // // @ts-ignore
    //     // ctx.fillStyle = "green";
    //     // ctx?.fill();
    //     // ctx?.stroke();
    // }

	if(currentInterpolateTravelAsFraction <= 1){
        currentInterpolateTravelAsFraction += interpolateSpeed;
        const coOrds3dA = coords3dBuffer.buffer[0];
        const coOrds3dB = coords3dBuffer.buffer[1];
        const coordsInterpolated = coOrds3dA.getInterpolatedCoords3d(coOrds3dB, currentInterpolateTravelAsFraction);
        movingMesh.position.x = coordsInterpolated.x;
		movingMesh.position.y = coordsInterpolated.y;
		movingMesh.position.z = coordsInterpolated.z;
		movingMesh.rotation.x = mainCubeXRotation;

		if(spinMainCube){
			if(mainCubeXRotation < 1){
				mainCubeXRotation += 0.1;
			}else{
				spinMainCube = false;
				mainCubeXRotation = 0;
			}
		}


    }else{
        currentInterpolateTravelAsFraction = 0;
		const backgroundMeshToRemove = backgroundMeshes.shift();
		scene.remove(backgroundMeshToRemove);
		
        const coOrds3d = new Coords3d(-xySize/2 + Math.random() * xySize, -xySize/2 + Math.random() * xySize, -zDepthSize/2 + Math.random() * zDepthSize);

		const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
		const material = new THREE.MeshNormalMaterial({wireframe: true});	
		const mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = coOrds3d.x;
		mesh.position.y = coOrds3d.y;
		mesh.position.z = coOrds3d.z;


		// @ts-ignore
		backgroundMeshes.push(mesh);

		scene.add( mesh );

        coords3dBuffer.add(coOrds3d);

		spinMainCube = true;

    }

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