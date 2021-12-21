export interface DirectionRandomizer{
    getCurrentDirection(): THREE.Vector3;
    update(time: number): void;
}