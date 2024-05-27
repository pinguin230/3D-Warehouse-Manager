import {BaseCoffee} from "../BaseCoffee.ts";

export class GroundCoffee extends BaseCoffee {
    private readonly grindSize: string;

    constructor(name: string, weight: number, height: number, width: number, grindSize: string, type: string, quantity: number) {
        super(name, type, weight, height, width, quantity);
        this.grindSize = grindSize;
    }

    getGrindSize() {
        return this.grindSize;
    }
}
