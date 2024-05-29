import { BaseCoffee } from "../models/BaseCoffee";
import { Container } from "../models/Container";

export const sortCoffeeByVolume = (coffeeList: BaseCoffee[]) => {
    return coffeeList.sort((a, b) => b.getVolume() - a.getVolume());
};

export const placeCoffeeInContainer = (container: Container, coffeeList: BaseCoffee[]) => {
    const sortedCoffeeList = sortCoffeeByVolume(coffeeList);
    const unplacedCoffees: BaseCoffee[] = [];

    for (const coffee of sortedCoffeeList) {
        for (let i = 0; i < coffee.getQuantity(); i++) {
            let placed = false;

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

            if (!placed) {
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
                            1,
                            x,
                            y
                        ))) {
                            placed = true;
                            break;
                        }
                    }
                    if (placed) break;
                }

                if (!placed) {
                    coffee.setWidth(tempWidth);
                    coffee.setHeight(coffee.getWidth());
                    unplacedCoffees.push(new BaseCoffee(
                        coffee.getName(),
                        coffee.getType(),
                        coffee.getWeight(),
                        coffee.getHeight(),
                        coffee.getWidth(),
                        1,
                    ));
                }
            }
        }
    }

    return {
        container,
        unplacedCoffees,
    };
};
