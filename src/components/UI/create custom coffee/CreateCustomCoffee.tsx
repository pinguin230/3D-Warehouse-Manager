import { Coffee, CoffeeData } from "../../../models/BaseStructures";
import React, { useState } from "react";
import MySelect from "../select/MySelect";
import createCoffee from "../../../utils/createCoffee";

export default function CreateCustomCoffee(props: {
    coffeeType: Array<Coffee>,
    currentTypeOfCoffee: string,
    handleSelectCoffeeType: (selectedType: string) => void,
    coffeeData: CoffeeData,
    handleChangeCoffeeData: (e: React.ChangeEvent<HTMLInputElement>) => void,
    options: Coffee[],
    typeOfSelectedCoffee: string,
    handleSelectTypeOption: (newType: string) => void,
}) {
    const [expanded, setExpanded] = useState(true);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="main-row">
            <div className="create-header" onClick={toggleExpand}>
                <label id="label">Create New Coffee</label>
                <button className="toggle-button">
                    {expanded ? '▲' : '▼'}
                </button>
            </div>
            {expanded && (
                <>
                    <MySelect option={props.coffeeType} value={props.currentTypeOfCoffee} onChange={props.handleSelectCoffeeType} />
                    <input className="myInput" type="text" name="name" value={props.coffeeData.name}
                           onChange={props.handleChangeCoffeeData}
                           placeholder="Name of the Coffee" />
                    <input className="myInput" type="number" name="weight" value={props.coffeeData.weight}
                           onChange={props.handleChangeCoffeeData}
                           placeholder="Weight" />
                    <input className="myInput" type="number" name="height" value={props.coffeeData.height}
                           onChange={props.handleChangeCoffeeData}
                           placeholder="Height" />
                    <input className="myInput" type="number" name="width" value={props.coffeeData.width}
                           onChange={props.handleChangeCoffeeData}
                           placeholder="Width" />
                    <input className="myInput" type="number" name="quantity" value={props.coffeeData.quantity}
                           onChange={props.handleChangeCoffeeData}
                           placeholder="Quantity" />
                    <MySelect option={props.options} value={props.typeOfSelectedCoffee} onChange={props.handleSelectTypeOption} />
                    <div className="main-row">
                        <button className="myBtn" onClick={() => createCoffee(props.coffeeData)}>Create Coffee</button>
                    </div>
                </>
            )}
        </div>
    );
}
