import {BaseCoffee} from "../models/BaseCoffee";
import {Container} from "../models/Container";

// Сортує список кави за об'ємом у спадному порядку
export const sortCoffeeByVolume = (coffeeList: BaseCoffee[]) => {
    return coffeeList.sort((a, b) => b.getVolume() - a.getVolume());
};

export const placeCoffeeInContainer = (container: Container, coffeeList: BaseCoffee[]) => {
    const sortedCoffeeList = sortCoffeeByVolume(coffeeList);

    for (const coffee of sortedCoffeeList) {
        for (let i = 0; i < coffee.getQuantity(); i++) {  // Врахування кількості кави
            let placed = false;

            // Спочатку пробуємо розмістити каву в горизонтальному положенні
            for (let x = 0; x <= container.getWidth() - coffee.getWidth(); x += 5) {
                for (let y = 0; y <= container.getHeight() - coffee.getHeight(); y += 5) {
                    coffee.setX(x);
                    coffee.setY(y);

                    if (container.addCoffee(new BaseCoffee(
                        coffee.getName(),
                        coffee.getType(),
                        coffee.getWeight(),
                        coffee.getHeight(),
                        coffee.getWidth(),
                        1, // Для кількості
                        x,
                        y
                    ))) {
                        placed = true;
                        break;
                    }
                }
                if (placed) break;
            }

            // Якщо не вдалося розмістити каву в горизонтальному положенні, пробуємо вертикальне положення
            if (!placed) {
                // Поворот кави
                const tempWidth = coffee.getWidth();
                coffee.setWidth(coffee.getHeight());
                coffee.setHeight(tempWidth);

                for (let x = 0; x <= container.getWidth() - coffee.getWidth(); x += 5) {
                    for (let y = 0; y <= container.getHeight() - coffee.getHeight(); y += 5) {
                        coffee.setX(x);
                        coffee.setY(y);

                        if (container.addCoffee(new BaseCoffee(
                            coffee.getName(),
                            coffee.getType(),
                            coffee.getWeight(),
                            coffee.getHeight(),
                            coffee.getWidth(),
                            1, // Для кількості
                            x,
                            y
                        ))) {
                            placed = true;
                            break;
                        }
                    }
                    if (placed) break;
                }

                // Повертаємо каву до початкового положення, якщо її не вдалося розмістити
                if (!placed) {
                    coffee.setWidth(tempWidth);
                    coffee.setHeight(coffee.getWidth());
                }
            }

            if (!placed) {
                console.log(`Cannot place coffee: ${coffee.getName()} at index ${i + 1}`);
            }
        }
    }
};
