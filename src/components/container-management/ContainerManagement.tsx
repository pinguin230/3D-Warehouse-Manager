import React, {useState} from 'react';
import CreateCustomContainer from "../UI/create-custom-container/CreateCustomContainer.tsx";
import {IContainer} from "../../store/redusers/container/container.state.ts";

const ContainerManagement = () => {

  const [containerData, setContainerData] = useState<IContainer>({
    name: undefined,
    width: undefined,
    height: undefined,
    depth: undefined,
  });


  const handleChangeContainerData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    const parsedValue = name === 'name' ? value : parseFloat(value);
    setContainerData({...containerData, [name]: parsedValue});
  };


  return (
      <CreateCustomContainer
          containerData={containerData}
          handleChangeContainerData={handleChangeContainerData}
      />
  );
};

export default ContainerManagement;