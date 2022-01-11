import { Coords2d } from "./Coords2d";

export function cosineInterpolate(y1: number, y2: number, mu: number){ 
    const mu2: number = (1-Math.cos(mu*Math.PI))/2;
    return(y1*(1-mu2)+y2*mu2);
}

function linearInterpolate(y1, y2, mu)
 {
    return(y1*(1-mu)+y2*mu);
 }

export function generateRandomPointsAtNIntervals(distanceBetweenPoints: number, nOfPoints: number){
    let points: Coords2d[] = [new Coords2d(0,0)];
    for(let i = 1; i < nOfPoints; i++){
        points.push(new Coords2d(i * distanceBetweenPoints, Math.random()));
    }
    return points;
}

// random smooth noise function 1d - values returned are between 0 - 1
export function noise1d(val: number){
    let xDistanceBetweenPoints = 20;
    let nOfPoints = 20;

    val = val % (xDistanceBetweenPoints * nOfPoints);
    let indexOfPointToInterpolateFrom = Math.floor(val / xDistanceBetweenPoints);
    let indexOfPointToInterpolateTo = (indexOfPointToInterpolateFrom + 1) % nOfPoints;

    console.log("info");
    console.log(val);
    console.log(indexOfPointToInterpolateFrom);
    console.log(indexOfPointToInterpolateTo);


    // @ts-ignore
    if(!noise1d.pseudoRandPoints){
        // @ts-ignore
        noise1d.pseudoRandPoints = generateRandomPointsAtNIntervals(xDistanceBetweenPoints, nOfPoints);
    }
    // @ts-ignore
    let points: Coords2d[] = noise1d.pseudoRandPoints;

    const pointToInterpFrom = points[indexOfPointToInterpolateFrom];
    const pointToInterpTo = points[indexOfPointToInterpolateTo];

    console.log(pointToInterpFrom);

    const fraction = 1 - ((pointToInterpTo.x - val) / xDistanceBetweenPoints);
    console.log(fraction);

    return cosineInterpolate(pointToInterpFrom.y, pointToInterpTo.y, fraction);
}