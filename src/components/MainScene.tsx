import React from "react";
import styled from "@emotion/styled"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type MainScene = {
    clock: THREE.Clock
    renderer: THREE.WebGL1Renderer
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
}


const createScene = (
    sceneRef: React.MutableRefObject<MainScene | null>,
    canvas: HTMLCanvasElement,
    div: HTMLDivElement
) => {
    const mainScene = {
        clock: new THREE.Clock(),
        renderer: new THREE.WebGL1Renderer({
            antialias: true,
            alpha: true,
            canvas: canvas,
        }),
        scene: new THREE.Scene(),
        camera: new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            0.1,
            1000,
        ),
    }
    sceneRef.current = mainScene
    canvas.addEventListener('webglcontextlost', (ev) => {
        ev.preventDefault()
        createScene(sceneRef, canvas, div)
    })
    mainScene.renderer.setSize(div.clientWidth, div.clientHeight)
    mainScene.renderer.setPixelRatio(window.devicePixelRatio)
    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(1, 1, 1).normalize()
    mainScene.scene.add(light)
    mainScene.camera.position.set(0.0, 1.15, 1.5)

    // Smooth camera control with Orbit Control
    const controls = new OrbitControls(
        mainScene.camera,
        mainScene.renderer.domElement,
    )
    controls.screenSpacePanning = true
    controls.target.set(0.0, 1.15, 0.0)
    controls.update()

    // Grid Helper
    const gridHelper = new THREE.GridHelper(100, 100);
    mainScene.scene.add(gridHelper)

    // Axis Helper
    const axisHelper = new THREE.AxesHelper(50)
    mainScene.scene.add(axisHelper)

    mainScene.scene.background = new THREE.Color(0x2b2a2f)

    placeCube(mainScene.scene)

    return mainScene
}

function placeCube(scene: THREE.Scene) {
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaa })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    scene.add(cube)
}

const Div = styled.div`
    width: calc(100vw - 350px);
`


const MainSceneWindow: React.FC = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const sceneRef = React.useRef<MainScene | null>(null)
    const divRef = React.useRef<HTMLDivElement | null>(null)
    const reqIdRef = React.useRef<number>(0);


    function render3d() {
        const scene = sceneRef.current
        const glCtx = scene?.renderer?.getContext()
        if (glCtx && !glCtx.isContextLost() && scene) {
            scene.renderer.render(scene.scene, scene.camera)
        }
        requestAnimationFrame(render3d)
    }

    React.useEffect(() => {
        if (!canvasRef.current) return
        if (!divRef.current) return
        if (!sceneRef.current) createScene(sceneRef, canvasRef.current, divRef.current)
        render3d()
        return () => cancelAnimationFrame(reqIdRef.current)
    }, [])

    return <Div ref={divRef}>
        <canvas ref={canvasRef} />
    </Div>
}

export default MainSceneWindow