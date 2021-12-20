import * as THREE from 'three';
import { Color, Plane } from 'three';
import { BufferGeneric } from './BufferGeneric';
import { gsap } from 'gsap';



let camera, scene, renderer, codeRain;
let geometry, material, mesh;
const clock = new THREE.Clock(true);
let time;

const meshes: any[] = [];
const n = 5; 

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 50 );
	camera.position.z = 3;

	scene = new THREE.Scene();

	for(let i = 0; i < 5; i++){
		const geometry = new THREE.SphereGeometry(0.5,10,10);
		const material = new THREE.MeshNormalMaterial();
		material.transparent = true;
		const mesh = new THREE.Mesh(geometry, material);
		meshes.push(mesh);
	}
	
	meshes.forEach((mesh) => scene.add(mesh));

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	time = clock.getElapsedTime();
	// gsap.to(mesh.position, {duration: 0.2, x: 1, delay: 2});
	// gsap.time
	// gsap.is

	tick();
}



function tick( ) {	
	const currentTime = clock.getElapsedTime();
	const delta = currentTime - time;
	time = currentTime;

	// camera.position.x = Math.sin(time);
	// camera.position.y = Math.cos(time);
	meshes.forEach((mesh, i) => {
		const pos = ((Math.PI * 2) / n) * i;
		mesh.position.x = Math.sin(pos + time * 0.5) * 1.5;	
		mesh.position.z = Math.cos(pos + time * 0.5) * 2;
		// mesh.material.opacity = Math.cos(pos + time * 0.5) + 0.75;
		// console.log(mesh);
	});
	

	// camera.lookAt(mesh.position);

	// camera.fo

	// console.log(delta);

	renderer.render( scene, camera );
	window.requestAnimationFrame(tick);
}

init();


