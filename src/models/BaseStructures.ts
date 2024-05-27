export interface Coffee {
    name: string;
    value: string;
}

export interface CoffeeData {
    name: string;
    weight: number;
    height: number;
    width: number;
    volume?: number;
    type: string;
    grindSize?: string; // Optional property for GroundCoffee
    beanSize?: string; // Optional property for BeanCoffee
    capsuleMaterial?: string; // Optional property for CapsuleCoffee
    solubility?: string; // Optional property for InstantCoffee
    custom?: string
    quantity: number;
}


export interface ContainerStructure {
    name: string;
    height: number;
    width: number;
    volume?: number;
}