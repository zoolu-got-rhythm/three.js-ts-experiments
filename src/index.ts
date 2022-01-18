import * as THREE from 'three';
import { Color, Plane } from 'three';
import { BufferGeneric } from './BufferGeneric';
import { gsap } from 'gsap';
import { OrbitingTeamMember } from './OrbitingTeamMember';
import { RandomWalker4DirectionsXY } from './RandomWalker4directionsXY';
import { RandomWalker8DirectionsXY } from './RandomWalker8directionsXY';
import { noise1d } from './noise1d';
import { SmoothRandomWalker } from './SmoothRandomWalkerXY';



let camera, scene, renderer, codeRain;
let geometry, material, mesh;
const clock = new THREE.Clock(true);
let time;

const meshes: any[] = [];
const n = 5;
let orbitingTeamMembers: OrbitingTeamMember[] = [];

let cameraZPos = 5;

let rotationSpeed = 0.3;
let i = 0;

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 50 );
	camera.position.z = cameraZPos;
	// camera.position.y = 0.5;

	scene = new THREE.Scene();

	for(let i = 0; i < n; i++){
		const startingPosRadians = ((Math.PI * 2) / n) * i;
		const orbitingTeamMember = new OrbitingTeamMember(scene, startingPosRadians, `public/member_${i + 1}.png`);
		orbitingTeamMember.setDirectionRandomizer(new SmoothRandomWalker());
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
		orbitingTeamMember.update(i);
	});

	i += rotationSpeed;
	if(rotationSpeed > 0.025)
		rotationSpeed -= 0.002;

	// camera.lookAt(mesh.position);

	// camera.fo

	// console.log(delta);
	// camera.position.z = cameraZPos;

	// cameraZPos += 0.01 % 6;

	renderer.render( scene, camera );
	window.requestAnimationFrame(tick);
}

init();

// console.log(noise1d(5));
// console.log(noise1d(195));

// var c = document.getElementById("graph-plot");
// // @ts-ignore
// var ctx = c.getContext("2d");

// let t = 0;

//  // @ts-ignore


//  let anim = () => {
// 	// ctx.clearRect(0,0,1000,1000);
// 	ctx.beginPath();
// 	ctx.arc(t, 100 + noise1d(t) * 45, 1, 0, 2 * Math.PI);
// 	ctx.stroke();
// 	t+= 0.5;
// 	window.requestAnimationFrame(anim)
//  }

//  anim();
	




