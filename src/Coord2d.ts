export class Coords2d{
    x: number;
    y: number;
    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    getInterpolatedCoords2d(coords2d: Coords2d, fraction: number){
        const xOffset = coords2d.x - this.x; 
        const yOffset = coords2d.y - this.y;
        return new Coords2d(
            this.x + (xOffset * fraction),
            this.y + (yOffset * fraction)
        );
    }
}

