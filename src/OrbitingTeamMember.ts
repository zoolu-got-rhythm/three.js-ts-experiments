import * as THREE from "three";
import { DirectionRandomizer } from "./interfaces/DirectionRandomizer";
import { Object3d } from "./interfaces/Object3d";

export class OrbitingTeamMember implements Object3d{
    mesh: THREE.Mesh;
    startingPosOnCircleRadians: number;
    directionRandomizer: null | DirectionRandomizer = null;

    constructor(scene: THREE.Scene, startingPosOnCircleRadians){
        this.startingPosOnCircleRadians = startingPosOnCircleRadians;
        const geometry = new THREE.SphereGeometry(0.5,10,10);
		const material = new THREE.MeshNormalMaterial();
		material.transparent = true;
		this.mesh = new THREE.Mesh(geometry, material);
        scene.add(this.mesh);
    }

    update(time: number): void{
        const randomDirectionVector = this.directionRandomizer ? this.directionRandomizer.getCurrentDirection() : null;
        this.mesh.position.x = Math.sin(this.startingPosOnCircleRadians + time * 0.5) * 1.5 + (randomDirectionVector ? randomDirectionVector.x : 0);	
		this.mesh.position.z = Math.cos(this.startingPosOnCircleRadians + time * 0.5) * 2 + (randomDirectionVector ? randomDirectionVector.z : 0);
        this.mesh.position.y = randomDirectionVector ? randomDirectionVector.y : 0;

        if(this.directionRandomizer)
            this.directionRandomizer.update(time);
    }

    setRandomizer(directionRandomizer: DirectionRandomizer){
        this.directionRandomizer = directionRandomizer;
    }
}