export class Rectangle {
    constructor(public width: number, public height: number, public x: number = 0, public y: number = 0) {}

    fitsIn(container: Rectangle): boolean {
        return this.x + this.width <= container.width && this.y + this.height <= container.height;
    }

    intersects(other: Rectangle): boolean {
        return !(other.x >= this.x + this.width ||
            other.x + other.width <= this.x ||
            other.y >= this.y + this.height ||
            other.y + other.height <= this.y);
    }

    getVolume(): number {
        return this.width * this.height;
    }

    // Додавання гетерів для доступу до приватних властивостей
    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
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

}