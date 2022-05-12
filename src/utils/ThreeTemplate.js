import scene from "three/examples/jsm/offscreen/scene";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";

export default new class ThreeTemplate {

  constructor() {

    // Label text position log.
    this.labelList = {
      y: [
        {
          id: 1,
          mesh: null,
          text: "Тупо текст",
        },
        {
          id: 2,
          mesh: null,
          text: "Агеречники",
        },
        {
          id: 3,
          mesh: null,
          text: "Поп",
        },
      ],
      x: [
        {
          id: 1,
          mesh: null,
          text: "Инструменты",
        },
        {
          id: 2,
          mesh: null,
          text: "Вишневые вишни",
        },
        {
          id: 3,
          mesh: null,
          text: "СТО",
        },
      ],
      z: [
        {
          id: 1,
          mesh: null,
          text: "Лебле",
        },
        {
          id: 2,
          mesh: null,
          text: "Характер",
        },
        {
          id: 3,
          mesh: null,
          text: "Людоеды",
        },
      ],
    }

    // Cube position.
    this.cubeList = [
      // {
      //   id: 1,
      //   mesh: "",
      //   y: 0,
      //   x: 0,
      //   z: 0,
      // }
    ]

    // SCENE
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xfffffff)

    // CAMERA
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    this.camera.position.z = 200
    this.camera.position.y = 50
    this.camera.position.x = 0

    // LIGHT
    this.ambient = new THREE.AmbientLight(0xffffff, 1)
    this.scene.add(this.ambient)

    // LIGHT
    this.light = new THREE.PointLight(0xc4c4c4, 1)
    this.light.position.set(0, 1300, 1500)
    this.scene.add(this.light)

    // RENDER
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true

    // CONTROLLER
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.update()
    this.controls.enableDamping = true
    this.controls.minDistance = 40

    // HELPER AXES
    this.axesHelper = new THREE.AxesHelper(100)
    this.scene.add(this.axesHelper)

    // LOADER FONT
    this.loaderFont = new FontLoader

    requestAnimationFrame(() => this.animate())
    this.handlerResizeWindow()
  }

  handlerResizeWindow() {
    window.onresize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
  }

  animate() {
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(() => this.animate())
  }

  addCube(Y, X, Z) {

    if (this.cubeList.some(el => {
      if (el.y === Y && el.x === X && el.z === Z) return el
    })) {
      console.error("Such a club already exists.")
      return
    }

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

    this.cubeList.push({
      id: new Date().getTime(),
      mesh: mesh,
      y: Y,
      x: X,
      z: Z,
    })

    this.scene.add(mesh)
  }

  addLabel(position, text) {
    this.loaderFont.load(`../assets/font/Roboto_Regular.json`, font => {
      const geometry = new TextGeometry(text, {
        font: font,
        size: 6,
        height: 1
      })

      // MESH
      const textMesh = new THREE.Mesh(geometry, [
        new THREE.MeshPhongMaterial({color: 0x2A2A2A}),
        new THREE.MeshPhongMaterial({color: 0xAB0000}),
      ])

      // BOX 3
      let bbox = new THREE.Box3().setFromObject(textMesh)
      textMesh.castShadow = true

      if (position === "y") {
        textMesh.position.y = (((20 * this.labelList.y.length) + 10) - (bbox.max.y / 2))
        textMesh.position.x = -bbox.max.x
        this.labelList.y.push({
          id: new Date().getTime(),
          mesh: textMesh,
          text: text
        })
      } else if (position === "x") {
        textMesh.position.x = (((20 * this.labelList.x.length) + 10) + (bbox.max.y / 2))
        textMesh.rotateZ(45.55)
        textMesh.rotateY(45.55)
        this.labelList.x.push({
          id: new Date().getTime(),
          mesh: textMesh,
          text: text
        })
      } else if (position === "z") {
        textMesh.position.z = (((20 * this.labelList.z.length) + 10) + (bbox.max.y / 2))
        textMesh.position.x = -bbox.max.x
        textMesh.rotateX(45.55)
        textMesh.rotateY(45.55 * 2)
        textMesh.rotateZ(45.55 * 2)
        this.labelList.z.push({
          id: new Date().getTime(),
          mesh: textMesh,
          text: text
        })
      }

      // ADD MESH TO SCENE
      this.scene.add(textMesh)
    })
  }

  labelRender() {
    this.loaderFont.load(`../assets/font/Roboto_Regular.json`, font => {
      for (let item in this.labelList) {
        this.labelList[item].map((el, index) => {
          // GEOMETRY FONT
          const geometry = new TextGeometry(el.text, {
            font: font,
            size: 6,
            height: 1
          })
          // MESH
          const textMesh = new THREE.Mesh(geometry, [
            new THREE.MeshPhongMaterial({color: 0x2A2A2A}),
            new THREE.MeshPhongMaterial({color: 0xAB0000}),
          ])
          el.mesh = textMesh
          // BOX 3
          let bbox = new THREE.Box3().setFromObject(textMesh)
          textMesh.castShadow = true

          // POSITION

          if (item === "y") {
            if (index === 0) {
              textMesh.position.y = 10 - bbox.max.y / 2
            } else {
              textMesh.position.y = (((20 * index) + 10) - (bbox.max.y / 2))
            }
            textMesh.position.x = -bbox.max.x
          } else if (item === "x") {
            if (index === 0) {
              textMesh.position.x = 10 + bbox.max.y / 2
            } else {
              textMesh.position.x = (((20 * index) + 10) + (bbox.max.y / 2))
            }
            textMesh.rotateZ(45.55)
            textMesh.rotateY(45.55)
          } else if (item === "z") {
            if (index === 0) {
              textMesh.position.z = 10 + bbox.max.y / 2
            } else {
              textMesh.position.z = (((20 * index) + 10) + (bbox.max.y / 2))
            }
            textMesh.position.x = -bbox.max.x

            textMesh.rotateX(45.55)
            textMesh.rotateY(45.55 * 2)
            textMesh.rotateZ(45.55 * 2)
          }

          // ADD MESH TO SCENE
          this.scene.add(textMesh)
        })
      }
    })
  }



}