import { BaseCoffee } from "../BaseCoffee.ts";

export class BeanCoffee extends BaseCoffee {
    private readonly beanSize: string;

    constructor(name: string, weight: number, height: number, width: number, beanSize: string, type: string, quantity: number) {
        super(name, type, weight, height, width, quantity);
        this.beanSize = beanSize; // For example, 'Whole' or 'Cracked'
    }

    getBeanSize() {
        return this.beanSize;
    }
}