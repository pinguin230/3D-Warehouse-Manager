const updateOptions = (currentTypeOfCoffee, setOptions, setCoffeeData) => {
    let newOptions = [];
    switch (currentTypeOfCoffee) {
        case "ground coffee":
            newOptions = [
                { name: "Espresso Grind", value: "espresso" },
                { name: "Filter Grind", value: "filter" }
            ];
            break;
        case "been coffee":
            newOptions = [
                { name: "Whole Bean", value: "whole" },
                { name: "Crushed Bean", value: "crushed" }
            ];
            break;
        case "capsule coffee":
            newOptions = [
                { name: "Single Use", value: "single_use" },
                { name: "Reusable", value: "reusable" }
            ];
            break;
        case "instant coffee":
            newOptions = [
                { name: "Freeze-Dried", value: "freeze_dried" },
                { name: "Spray-Dried", value: "spray_dried" }
            ];
            break;
        default:
            newOptions = [
                { name: "Fine", value: "fine" },
                { name: "Medium", value: "medium" },
                { name: "Coarse", value: "coarse" }
            ];
    }
    setOptions(newOptions);
    setCoffeeData(prev => ({ ...prev, custom: newOptions[0].value }));
};

export default updateOptions