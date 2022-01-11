import { Vector3 } from "three";
import { noise1d } from "./noise1d";
import { DirectionRandomizer } from "./interfaces/DirectionRandomizer";

export class SmoothRandomWalker implements DirectionRandomizer{
    t: number;
    randOffSetA: number;
    randOffSetB: number;
    constructor(){
        this.t = 0;
        this.randOffSetA = Math.random() * 100;
        this.randOffSetB = Math.random() * 100;

    }

    getCurrentDirection(): Vector3 {
        return new Vector3(noise1d(this.randOffSetA + this.t) -0.5, noise1d(this.randOffSetB + this.t) -0.5, 0);
    }
    update(time: number): void {
        this.t += 0.35;
    }

}