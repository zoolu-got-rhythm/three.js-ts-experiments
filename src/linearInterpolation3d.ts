import * as THREE from 'three';

let camera, scene, renderer;
let geometry, material, mesh;



init();

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 5;

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setAnimationLoop( animation );
	document.body.appendChild( renderer.domElement );

}

function animation( time ) {

	mesh.rotation.x = Math.random() * 0.2;
	mesh.rotation.y = Math.random() * 0.2;
	mesh.position.x = 2;
	mesh.position.y = 2;

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