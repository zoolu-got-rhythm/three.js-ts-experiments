export class BufferGeneric<Type>{
    bufferSize: number;
    buffer: Type[] = [];

    constructor(bufferSize: number){
        this.bufferSize = bufferSize;
    }

    add(item: Type): Type | undefined{
        if(this.buffer.length < this.bufferSize){
            this.buffer.push(item);
        }else{
            this.buffer.push(item);
            return this.buffer.shift();
        }
        return undefined;
    }
}