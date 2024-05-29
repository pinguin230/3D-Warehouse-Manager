import { Rectangle } from "./Rectangle.ts";

export class Container extends Rectangle {
    public readonly name: string;
    private readonly volume: number;
    contents = [];  // Змінено на Rectangle для загальної сумісності

    constructor(name: string, width: number, height: number, x: number = 0, y: number = 0) {
        super(width, height, x, y);
        this.name = name;
        this.volume = this.calculateVolume();
    }

    calculateVolume(): number {
        return this.height * this.width;
    }

    addCoffee(coffee: Rectangle): boolean {
        if (this.canAddCoffee(coffee) && !this.contents.some(c => coffee.intersects(c))) {
            this.contents.push(coffee);
            return true;
        }
        return false;
    }

    canAddCoffee(coffee: Rectangle): boolean {
        return this.getRemainingVolume() >= coffee.getVolume();
    }

    getRemainingVolume(): number {
        const usedVolume = this.contents.reduce((sum, coffee) => sum + coffee.getVolume(), 0);
        return this.volume - usedVolume;
    }

    getName(): string {
        return this.name;
    }

    getVolume(): number {
        return this.volume;
    }

    getHeight(): number {
        return this.height;
    }

    getWidth(): number {
        return this.width;
    }
}
