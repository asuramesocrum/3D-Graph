import React, {useEffect, useRef} from 'react';
import {observer} from "mobx-react-lite";

const Graphic = observer(({rendererDOM}) => {

  const refGraphic = useRef(null)

  useEffect(() => {
    refGraphic.current.innerHTML = ""
    if (rendererDOM) refGraphic.current.appendChild(rendererDOM)
  }, [rendererDOM])

  return (
    <div id={"Graphic"} ref={refGraphic}>

    </div>
  );
})

export default Graphic;