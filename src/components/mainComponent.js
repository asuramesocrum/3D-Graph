import React, {useEffect, useState} from 'react';
import Graphic from "./Graphic/Graphic";
import ThreeTemplate from "../utils/ThreeTemplate";
import { useParams } from "react-router-dom";

const MainComponent = () => {

  const [renderComponent, setRenderComponent] = useState(null)
  const params = useParams()

  useEffect(() => {
    if (Object.keys(params).length === 0) {
      setRenderComponent(new ThreeTemplate())
    } else {
      import (`../../public/db/${params.name}.json`)
        .then(data => {
          console.log(`Load file ${params.name}.json`)
          setRenderComponent(new ThreeTemplate(data.labelList, data.cubeList))
        })
      }
  }, [])

  useEffect(() => {
    renderComponent?.render()
  }, [renderComponent]);

  return (
    <div className="main">
      {renderComponent && <Graphic rendererDOM={renderComponent?.renderer?.domElement}/>}
    </div>
  );
}

export default MainComponent;