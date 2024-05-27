export interface ICoffee {
    _id: string;
    name: string;
    weight: number;
    type: string;
    volume: number;
    width: number;
    height: number;
    grindSize?: string;
    beanSize?: string;
    capsuleMaterial?: string;
    solubility?: string;
    quantity: number;
}