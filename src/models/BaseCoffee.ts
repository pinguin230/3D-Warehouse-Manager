import {Rectangle} from "./Rectangle.ts";

export class BaseCoffee extends Rectangle {
    private readonly weight: number;
    private readonly type: string;
    private readonly name: string;
    private readonly volume: number;
    public readonly quantity: number;

    constructor(name: string, type: string, weight: number, height: number, width: number, quantity:number, x = 0, y = 0) {
        super(width, height, x, y); // Виклик конструктора батьківського класу
        this.name = name;
        this.weight = weight;
        this.type = type;
        this.quantity = quantity;
        this.volume = this.calculateVolume(height, width);
    }

    calculateVolume(height:number, width:number): number {
        return height * width;
    }

    // Гетери
    getWeight() {
        return this.weight;
    }

    getVolume() {
        return this.volume;
    }

    getType() {
        return this.type;
    }

    getName() {
        return this.name;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    setX(x: number) {
        this.x = x;
    }

    setY(y: number) {
        this.y = y;
    }

    setWidth(width: number) {
        this.width = width;
    }

    setHeight(height: number) {
        this.height = height;
    }

    getQuantity(): number {
        return this.quantity;
    }
}