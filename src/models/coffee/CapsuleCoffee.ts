import { BaseCoffee } from "../BaseCoffee.ts";

export class CapsuleCoffee extends BaseCoffee {
    private readonly capsuleMaterial: string;

    constructor(name: string, weight: number, height: number, width: number, capsuleMaterial: string, type: string, quantity: number) {
        super(name, type, weight, height, width, quantity);
        this.capsuleMaterial = capsuleMaterial;
    }

    getCapsuleMaterial() {
        return this.capsuleMaterial;
    }
}
