import {BaseCoffee} from "../BaseCoffee.ts";

export class InstantCoffee extends BaseCoffee {
    private readonly solubility: string;

    constructor(name: string, weight: number, height: number, width: number, solubility: string, type: string, quantity: number) {
        super(name, type, weight, height, width, quantity);
        this.solubility = solubility;
    }

    getSolubility() {
        return this.solubility;
    }
}