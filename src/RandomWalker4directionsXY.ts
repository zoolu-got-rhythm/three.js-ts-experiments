import * as THREE from "three";
import { DirectionRandomizer } from "./interfaces/DirectionRandomizer";

export class RandomWalker4DirectionsXY implements DirectionRandomizer{
    direction: THREE.Vector3;
    amountToMoveBy: number;
    maxRange: number;
    prevRandomNumber: number;
    currentRandomNumber: number;

    constructor(amountToMoveBy: number, maxRange: number){
        this.direction = new THREE.Vector3(0, 0, 0);
        this.amountToMoveBy = amountToMoveBy;
        this.maxRange = maxRange;
        this.prevRandomNumber = -1;
        this.currentRandomNumber = -1;
    }

    // @ts-ignore
    private getRandomDirection(): THREE.Vector3{
        const randN = Math.floor(Math.random() * 4);
        this.currentRandomNumber = randN;
        if(randN == 0) // n
            return new THREE.Vector3(0,-this.amountToMoveBy,0);
        if(randN == 1) // e
            return new THREE.Vector3(+this.amountToMoveBy,0,0);
        if(randN == 2) // s
            return new THREE.Vector3(0,+this.amountToMoveBy,0);
        if(randN == 3) // w
            return new THREE.Vector3(-this.amountToMoveBy,0,0);
    }

    update(time: number): void{
        // console.log("tick");
        let directionVector = this.getRandomDirection();
        while(this.currentRandomNumber == (this.prevRandomNumber + 2) % 4){
            // console.log(this.prevRandomNumber, this.currentRandomNumber);
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