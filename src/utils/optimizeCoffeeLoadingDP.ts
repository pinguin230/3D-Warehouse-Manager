import { BaseCoffee } from "../models/BaseCoffee";
import { Container } from "../models/Container";

interface DPItem {
    totalVolume: number;
    items: BaseCoffee[];
}

export const optimizeCoffeeLoadingDP = (container: Container, coffeeList: BaseCoffee[]): Container => {
    const n = coffeeList.length;
    const capacity = container.getVolume();

    // Ініціалізація dp масиву
    const dp: DPItem[][] = Array.from({ length: n + 1 }, () => Array.from({ length: capacity + 1 }, () => ({ totalVolume: 0, items: [] })));

    // Заповнення dp масиву
    for (let i = 1; i <= n; i++) {
        const coffee = coffeeList[i - 1];
        const coffeeVolume = coffee.getVolume();

        for (let j = 0; j <= capacity; j++) {
            dp[i][j] = { ...dp[i - 1][j] };  // Спочатку скопіювати попереднє значення

            for (let k = 1; k <= coffee.getQuantity() && k * coffeeVolume <= j; k++) {
                const currentVolume = dp[i - 1][j - k * coffeeVolume].totalVolume + k * coffeeVolume;
                if (currentVolume > dp[i][j].totalVolume) {
                    dp[i][j] = {
                        totalVolume: currentVolume,
                        items: [...dp[i - 1][j - k * coffeeVolume].items, ...Array(k).fill(new BaseCoffee(coffee.getName(), coffee.getType(), coffee.getWeight(), coffee.getHeight(), coffee.getWidth(), 1))]
                    };
                }
            }
        }
    }

    // Відтворення оптимального рішення
    const optimalItems = dp[n][capacity].items;
    const optimalContainer = new Container(container.getName(), container.getWidth(), container.getHeight());

    const placeItem = (item: BaseCoffee) => {
        let placed = false;

        for (let x = 0; x <= container.getWidth() - item.getWidth(); x += 5) {
            for (let y = 0; y <= container.getHeight() - item.getHeight(); y += 5) {
                item.setX(x);
                item.setY(y);

                if (optimalContainer.addCoffee(item)) {
                    placed = true;
                    break;
                }
            }
            if (placed) break;
        }

        if (!placed) {
            // Поворот кави
            const tempWidth = item.getWidth();
            item.setWidth(item.getHeight());
            item.setHeight(tempWidth);

            for (let x = 0; x <= container.getWidth() - item.getWidth(); x += 5) {
                for (let y = 0; y <= container.getHeight() - item.getHeight(); y += 5) {
                    item.setX(x);
                    item.setY(y);

                    if (optimalContainer.addCoffee(item)) {
                        placed = true;
                        break;
                    }
                }
                if (placed) break;
            }

            // Повертаємо каву до початкового положення, якщо її не вдалося розмістити
            if (!placed) {
                item.setWidth(tempWidth);
                item.setHeight(item.getWidth());
                console.log(`Cannot place coffee: ${item.getName()}`);
            }
        }
    };

    optimalItems.forEach(item => {
        for (let i = 0; i < item.getQuantity(); i++) {
            placeItem(new BaseCoffee(
                item.getName(),
                item.getType(),
                item.getWeight(),
                item.getHeight(),
                item.getWidth(),
                1
            ));
        }
    });

    return optimalContainer;
};
