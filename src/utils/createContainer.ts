import {Container} from "../models/Container.ts";
import {ContainerStructure} from "../models/BaseStructures.ts";
import axios from "axios";

const createContainer = (containerData) => {
    const newContainer = new Container(containerData.name, containerData.width, containerData.height, )

    const {height, width } = containerData;
    if (height < 1 || width < 1) {
        alert('The name must not be empty. Height, and width must be non-negative values.');
        return;
    }
    const postData: ContainerStructure = {
        name: newContainer.getName(),
        height: newContainer.getHeight(),
        width: newContainer.getWidth(),
        volume: newContainer.getVolume(),
    };

    axios.post(`http://localhost:3001/container`, postData)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error while posting data:', error);
        });

}

export default createContainer