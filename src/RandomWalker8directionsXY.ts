import * as THREE from "three";
import { DirectionRandomizer } from "./interfaces/DirectionRandomizer";

export class RandomWalker8DirectionsXY implements DirectionRandomizer{
    direction: THREE.Vector3;
    amountToMoveBy: number;
    maxRange: number;
    prevRandomNumber: number;
    currentRandomNumber: number;

    constructor(amountToMoveBy: number, maxRange: number){
        this.direction = new THREE.Vector3(0, 0, 0);
        this.amountToMoveBy = amountToMoveBy;
        this.maxRange = maxRange;
        this.prevRandomNumber = 0;
        this.currentRandomNumber = 0;
    }

    // @ts-ignore
    private getRandomDirection(): THREE.Vector3{
        const randN = Math.floor(Math.random() * 8);
        this.currentRandomNumber = randN;
        if(randN == 0) // n
            return new THREE.Vector3(0,-this.amountToMoveBy,0);
        if(randN == 1) // ne
            return new THREE.Vector3(+this.amountToMoveBy,-this.amountToMoveBy,0);
        if(randN == 2) // e
            return new THREE.Vector3(+this.amountToMoveBy,0,0);
        if(randN == 3) // se
            return new THREE.Vector3(+this.amountToMoveBy,+this.amountToMoveBy,0);
        if(randN == 4) // s
            return new THREE.Vector3(0,+this.amountToMoveBy,0);
        if(randN == 5) // sw
            return new THREE.Vector3(-this.amountToMoveBy,+this.amountToMoveBy,0);
        if(randN == 6) // w
            return new THREE.Vector3(-this.amountToMoveBy,0,0);
        if(randN == 7) // nw
            return new THREE.Vector3(-this.amountToMoveBy,-this.amountToMoveBy,0);
    }

    nInRange(n: number): boolean{
        if(this.currentRandomNumber == this.prevRandomNumber 
            || this.currentRandomNumber == (this.prevRandomNumber + 1) % 8
            || this.currentRandomNumber == (this.prevRandomNumber + 7) % 8){
                return true;
            }else{
                return false;
            }
    }

    update(time: number): void{
        let directionVector = this.getRandomDirection();
        
        while(!this.nInRange(this.currentRandomNumber)){
            directionVector = this.getRandomDirection();
        }

        this.prevRandomNumber = this.currentRandomNumber;

        const tempVector = new THREE.Vector3(0, 0, 0);
        tempVector.copy(this.getCurrentDirection());
        tempVector.add(directionVector);
        if(tempVector.x > this.maxRange || tempVector.x < -this.maxRange
        || tempVector.y > this.maxRange || tempVector.y < -this.maxRange
        || tempVector.z > this.maxRange || tempVector.z < -this.maxRange){
            this.update(time);
        }else{
            this.direction.copy(tempVector);
        }
    }

    getCurrentDirection(): THREE.Vector3{
        return this.direction;
    }
}