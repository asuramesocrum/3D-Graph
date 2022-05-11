import {makeAutoObservable} from "mobx";

export default new class CubeVoidStore {


  constructor() {
    makeAutoObservable(this)
  }

  addCubeVoid(cube) {
    this.cubeVoid.push(cube)
  }


}