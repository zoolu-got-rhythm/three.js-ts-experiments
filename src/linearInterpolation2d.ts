import { Coords2d } from "./Coord2d";
import { BufferGeneric } from "./BufferGeneric";

const height = 350; 
const width = 350;

const c = document.createElement("canvas");
c.className = "canvas";
const ctx = c.getContext("2d");
c.width = width;
c.height = height;

document.body.appendChild(c);

const bufferSize = 3;
const coords2dBuffer: BufferGeneric<Coords2d> = new BufferGeneric<Coords2d>(bufferSize);

export function init(){
    for (let i = 0; i < bufferSize; i++) {
        coords2dBuffer.add(new Coords2d(Math.random() * width, Math.random() * height));	
    }
    requestAnimationFrame(animate);
}

const interpolateSpeed = 1/60;
let currentInterpolateTravelAsFraction = 0;

function animate(){
    // do stuff
    
    ctx?.clearRect(0, 0, width, height);
    for (let i = 0; i < coords2dBuffer.buffer.length; i++) {
        const coords2d: Coords2d = coords2dBuffer.buffer[i];
        ctx?.beginPath();
        ctx?.arc(coords2d.x, coords2d.y, 5, 0, Math.PI * 2); 
        // @ts-ignore
        ctx.fillStyle = "green";
        ctx?.fill();
        ctx?.stroke();
    }
    
    if(currentInterpolateTravelAsFraction <= 1){
        currentInterpolateTravelAsFraction += interpolateSpeed;
        const coords2dA = coords2dBuffer.buffer[0];
        const coords2dB = coords2dBuffer.buffer[1];
        const coordsInterpolated = coords2dA.getInterpolatedCoords2d(coords2dB, currentInterpolateTravelAsFraction);
        ctx?.beginPath();
        ctx?.arc(coordsInterpolated.x, coordsInterpolated.y, 5, 0, Math.PI * 2); 
        // @ts-ignore
        ctx.fillStyle = "lime";
        ctx?.fill();
        ctx?.stroke();
    }else{
        currentInterpolateTravelAsFraction = 0;
        coords2dBuffer.add(new Coords2d(Math.random() * width, Math.random() * height));
    }

    requestAnimationFrame(animate);
}

