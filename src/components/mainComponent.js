import React, {useEffect, useState} from 'react';
import Tools from "./Tools/Tools";
import Graphic from "./Graphic/Graphic";
import ThreeTemplate from "../utils/ThreeTemplate";

const MainComponent = () => {

  useEffect(() => {
    ThreeTemplate.labelRender()
  }, [])

  return (
    <div className="main">
      <Tools  />
      <Graphic rendererDOM={ThreeTemplate.renderer.domElement}/>
    </div>
  );
}

export default MainComponent;