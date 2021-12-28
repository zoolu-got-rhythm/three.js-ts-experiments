import * as THREE from 'three';
import { Color, Plane } from 'three';
import { BufferGeneric } from './BufferGeneric';
import { gsap } from 'gsap';
import { OrbitingTeamMember } from './OrbitingTeamMember';
import { RandomWalker4DirectionsXY } from './RandomWalker4directionsXY';
import { RandomWalker8DirectionsXY } from './RandomWalker8directionsXY';



let camera, scene, renderer, codeRain;
let geometry, material, mesh;
const clock = new THREE.Clock(true);
let time;

const meshes: any[] = [];
const n = 5;
let orbitingTeamMembers: OrbitingTeamMember[] = [];

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 50 );
	camera.position.z = 0;

	scene = new THREE.Scene();

	for(let i = 0; i < n; i++){
		const startingPosRadians = ((Math.PI * 2) / n) * i;
		const orbitingTeamMember = new OrbitingTeamMember(scene, startingPosRadians);
		orbitingTeamMember.setDirectionRandomizer(new RandomWalker8DirectionsXY(0.02, 0.5));
		orbitingTeamMembers.push(orbitingTeamMember);
	}
	
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
	
	orbitingTeamMembers.forEach((orbitingTeamMember: OrbitingTeamMember) => {
		orbitingTeamMember.update(time);
	});

	// camera.lookAt(mesh.position);

	// camera.fo

	// console.log(delta);

	renderer.render( scene, camera );
	window.requestAnimationFrame(tick);
}

init();


