import React, {useState} from 'react';
import CubeVoidStore from "../../store/CubeVoidStore";
import ThreeTemplate from "../../utils/ThreeTemplate";

const Tools = () => {

  const [menuActive, setMenuActive] = useState(false)

  const [dataZ, setDataZ] = useState("")
  const [dataY, setDataY] = useState("")
  const [dataX, setDataX] = useState("")

  const handlerAddCubeVoid = (e) => {
    e.preventDefault()
    ThreeTemplate.addCube(dataY,dataX,dataZ)
  }

  return (
    <div className={menuActive ? "Tools closed" : "Tools"}>
      <div className="title" onClick={() => setMenuActive(!menuActive)}>
        { menuActive ? "Click to open" : "Click to close" }
      </div>
      <div className="Tools__block">

      </div>
      <div className="Tools__block">
        <div className="title">
          Add block
        </div>
        <div className="form">
          <label htmlFor="dataz">
            Data Z
          </label>
          <input type="text" className={"inp"} placeholder={"Data Z"} defaultValue={dataZ} onChange={(e) => setDataZ(e.target.value)}/>
          <label htmlFor="dataz">
            Data Y
          </label>
          <input type="text" className={"inp"} placeholder={"Data Y"} defaultValue={dataY} onChange={(e) => setDataY(e.target.value)}/>
          <label htmlFor="dataz">
            Data X
          </label>
          <input type="text" className={"inp"} placeholder={"Data X"} defaultValue={dataX} onChange={(e) => setDataX(e.target.value)}/>
          <a href="#" className="link" onClick={handlerAddCubeVoid}>Add</a>
        </div>
      </div>
    </div>
  );
};

export default Tools;