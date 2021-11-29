export class Coords3d{
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getInterpolatedCoords3d(coords2d: Coords3d, fraction: number){
        const xOffset = coords2d.x - this.x; 
        const yOffset = coords2d.y - this.y;
        const zOffset = coords2d.z - this.z;
        return new Coords3d(
            this.x + (xOffset * fraction),
            this.y + (yOffset * fraction),
            this.z + (zOffset * fraction)
        );
    }
}