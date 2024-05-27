import {ContainerStructure} from "../../../models/BaseStructures.ts";
import React, {useState} from "react";
import createContainer from "../../../utils/createContainer.ts";


export default function CreateCustomContainer(props: {
    containerData: ContainerStructure,
    handleChangeContainerData: (e: React.ChangeEvent<HTMLInputElement>) => void,
}) {

    const [expanded, setExpanded] = useState(true);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return <div className="main-row">
        <div className="create-header" onClick={toggleExpand}>
            <label id="label">Create Container</label>
            <button className="toggle-button">
                {expanded ? '▲' : '▼'}
            </button>
        </div>
        {expanded && <>
          <input className="myInput" type="text" name="name" value={props.containerData.name}
                 onChange={props.handleChangeContainerData}
                 placeholder="Name of the Container"/>
          <input className="myInput" type="number" name="height" value={props.containerData.height}
                 onChange={props.handleChangeContainerData}
                 placeholder="Height"/>
          <input className="myInput" type="number" name="width" value={props.containerData.width}
                 onChange={props.handleChangeContainerData}
                 placeholder="Width"/>

          <div className="main-row">
            <button className="myBtn" onClick={() => createContainer(props.containerData)}>Create Container</button>
          </div>
        </>}

    </div>;
}
