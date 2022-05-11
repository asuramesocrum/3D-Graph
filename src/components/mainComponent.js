import React, {useEffect, useState} from 'react';
import Tools from "./Tools/Tools";
import Graphic from "./Graphic/Graphic";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
import {observer} from "mobx-react-lite";

const MainComponent = () => {

  const cubeVoid = []

  const dataZ = [
    "Теранозавр",
    "Террекс",
    "Трихонозавр",
    "Адамантит",
  ]

  const dataX = [
    "Data X 1",
    "Data X 2",
    "Data X 3",
    "Data X 4",
  ]

  const dataY = [
    "Максумбек",
    "Татарин",
    "Лопаат",
    "Экстренный",
  ]

  const addCubeVoid = (Z, Y, X) => {

    if (cubeVoid.some((el) => {
      if (el.dataZ === Z && el.dataY === Y && el.dataX === X) return el
    })) {
      return console.error("Уже есть такой кубик.")
    }

    cubeVoid.push({
      dataZ: Z,
      dataY: Y,
      dataX: X,
    })
    console.log(cubeVoid)
    const geometry = new THREE.BoxGeometry(20, 20, 20)
    const material = new THREE.MeshBasicMaterial({
      color: 0xAB0000,
      transparent: true,
      opacity: 0.5
    })
    let mesh = new THREE.Mesh(geometry, material)
    mesh.position.z = 10
    mesh.position.x = 10
    mesh.position.y = 10
    mesh.position.z = mesh.position.z + Z * 20
    mesh.position.x = mesh.position.x + X * 20
    mesh.position.y = mesh.position.y + Y * 20
    scene.add(mesh)
  }

  const colorSchema = 0xAB0000



  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xfffffff)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
  camera.position.z = 200
  camera.position.y = 50
  camera.position.x = 0

  const ambient = new THREE.AmbientLight(0xffffff, 1)
  scene.add(ambient)

  let light = new THREE.PointLight(0xc4c4c4, 1)
  light.position.set(0, 1300, 1500)
  scene.add(light)

  let light2 = new THREE.PointLight(0xc4c4c4, 1)
  light.position.set(1500, 1300, 1500)
  scene.add(light2)

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.update()
  controls.enableDamping = true
  controls.minDistance = 40

  let loaderFont = new FontLoader
  loaderFont.load("../../assets/font/Roboto_Regular.json", (font) => {

    dataY.map((el, index) => {
      const geometry = new TextGeometry(el, {
        font: font,
        size: 6,
        height: 1
      })
      const textMesh = new THREE.Mesh(geometry, [
        new THREE.MeshPhongMaterial({color: 0x2A2A2A}),
        new THREE.MeshPhongMaterial({color: 0xAB0000}),
      ])
      let bbox = new THREE.Box3().setFromObject(textMesh)

      textMesh.castShadow = true
      if (index === 0) {
        textMesh.position.y = 10 - bbox.max.y / 2
      } else {
        textMesh.position.y = (((20 * index) + 10) - (bbox.max.y / 2))
      }
      textMesh.position.x = -bbox.max.x
      scene.add(textMesh)
    })

    dataZ.map((el, index) => {
      const geometry = new TextGeometry(el, {
        font: font,
        size: 6,
        height: 1
      })
      const textMesh = new THREE.Mesh(geometry, [
        new THREE.MeshPhongMaterial({color: 0x2A2A2A}),
        new THREE.MeshPhongMaterial({color: 0xAB0000}),
      ])
      let bbox = new THREE.Box3().setFromObject(textMesh)

      textMesh.castShadow = true
      if (index === 0) {
        textMesh.position.z = 10 + bbox.max.y / 2
      } else {
        textMesh.position.z = (((20 * index) + 10) + (bbox.max.y / 2))
      }
      textMesh.position.x = -bbox.max.x

      textMesh.rotateX(45.55)
      textMesh.rotateY(45.55 * 2)
      textMesh.rotateZ(45.55 * 2)
      scene.add(textMesh)

    })


    dataX.map((el, index) => {
      const geometry = new TextGeometry(el, {
        font: font,
        size: 6,
        height: 1
      })
      const textMesh = new THREE.Mesh(geometry, [
        new THREE.MeshPhongMaterial({color: 0x2A2A2A}),
        new THREE.MeshPhongMaterial({color: 0xAB0000}),
      ])
      let bbox = new THREE.Box3().setFromObject(textMesh)
      textMesh.castShadow = true
      if (index === 0) {
        textMesh.position.x = 10 + bbox.max.y / 2
      } else {
        textMesh.position.x = (((20 * index) + 10) + (bbox.max.y / 2))
      }
      textMesh.rotateZ(45.55)
      textMesh.rotateY(45.55)
      scene.add(textMesh)
    })
  })

  let axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);

  const animate = () => {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }

  window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  const rerender = () => {
    cubeVoid.forEach(el => addCubeVoid(el.dataZ, el.dataY, el.dataX))
  }
  rerender()

  useEffect(() => {
    animate()
  }, [])

  return (
    <div className="main">
      <Tools addCube={addCubeVoid} data={{dataY, dataZ, dataX}}/>
      <Graphic rendererDOM={renderer.domElement}/>
    </div>
  );
}

export default MainComponent;