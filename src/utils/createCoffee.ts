import {CoffeeData} from "../models/BaseStructures.ts";
import {GroundCoffee} from "../models/coffee/GroundCoffee.ts";
import {BeanCoffee} from "../models/coffee/BeanCoffee.ts";
import {CapsuleCoffee} from "../models/coffee/CapsuleCoffee.ts";
import {InstantCoffee} from "../models/coffee/InstantCoffee.ts";
import axios from "axios";

function customCoffeeClass(name: string, type: string, weight: number, height: number, width: number, custom: string, quantity: number) {
    switch (type) {
        case "ground coffee":
            return new GroundCoffee(name, weight, height, width, custom, type, quantity);

        case "bean coffee":
            return new BeanCoffee(name, weight, height, width, custom, type, quantity);

        case "capsule coffee":
            return new CapsuleCoffee(name, weight, height, width, custom, type, quantity);

        case "instant coffee":
            return new InstantCoffee(name, weight, height, width, custom, type, quantity);

        default:
            return null;
    }
}

const createCoffee = (coffeeData) => {
    const newCoffee = customCoffeeClass(coffeeData.name, coffeeData.type, coffeeData.weight, coffeeData.height, coffeeData.width, coffeeData.custom, coffeeData.quantity);
    if (!newCoffee) {
        console.error('Unsupported coffee type');
        return;
    }

    const postData: CoffeeData = {
        name: newCoffee.getName(),
        weight: newCoffee.getWeight(),
        height: newCoffee.getHeight(),
        width: newCoffee.getWidth(),
        volume: newCoffee.getVolume(),
        type: newCoffee.getType(),
        quantity: newCoffee.getQuantity()
    };

    if (newCoffee instanceof GroundCoffee) {
        postData.grindSize = newCoffee.getGrindSize();
    } else if (newCoffee instanceof BeanCoffee) {
        postData.beanSize = newCoffee.getBeanSize();
    } else if (newCoffee instanceof CapsuleCoffee) {
        postData.capsuleMaterial = newCoffee.getCapsuleMaterial();
    } else if (newCoffee instanceof InstantCoffee) {
        postData.solubility = newCoffee.getSolubility();
    }

    axios.post(`http://localhost:3001/coffee`, postData)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 400) {
                alert('Coffee with this name already exists');
            } else {
                console.error('Error while adding to selected:', error);
                alert('Failed to add to selected');
            }
        });
};


export default createCoffee