import { Input } from "./Input";

export class Device {
    name: string = "";
    number: string = "";
    inputs : Input[] = [];
    

    constructor(name?: string, number?: string, inputs?: Input[]) {
        if (name) this.name = name;
        if (number) this.number = number;
        if (inputs) this.inputs = inputs;
    }
    
}