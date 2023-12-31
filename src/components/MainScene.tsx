import React from "react";
import styled from "@emotion/styled"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { IReactionDisposer, Reaction, reaction } from "mobx";
import { objectHandler } from "../stores/ObjectHandler";
import networkHandler from "../models/NetworkHandler";

type MainScene = {
    clock: THREE.Clock
    renderer: THREE.WebGL1Renderer
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
}


const createScene = (
    sceneRef: React.MutableRefObject<MainScene | null>,
    canvas: HTMLCanvasElement,
    div: HTMLDivElement,
    control: React.MutableRefObject<TransformControls | null>,
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
        createScene(sceneRef, canvas, div, control)
    })
    mainScene.renderer.setSize(div.clientWidth, div.clientHeight)
    mainScene.renderer.setPixelRatio(window.devicePixelRatio)
    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(1.5, 3, 1).normalize()
    mainScene.scene.add(light)
    mainScene.camera.position.set(1.5, 2, 5)

    // Smooth camera control with Orbit Control
    const orbit = new OrbitControls(
        mainScene.camera,
        mainScene.renderer.domElement,
    )
    orbit.screenSpacePanning = true
    orbit.mouseButtons = {
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE
    }
    orbit.target.set(0.0, 0.5, 0.0)
    orbit.update()

    // TransformControl
    control.current = new TransformControls(mainScene.camera, mainScene.renderer.domElement)
    control.current.setMode('rotate')
    control.current.setSpace('local')
    mainScene.scene.add(control.current)


    // Grid Helper
    const gridHelper = new THREE.GridHelper(100, 100);
    mainScene.scene.add(gridHelper)

    // Axis Helper
    const axisHelper = new THREE.AxesHelper(50)
    mainScene.scene.add(axisHelper)

    mainScene.scene.background = new THREE.Color(0x2b2a2f)

    return mainScene
}


const Div = styled.div`
    width: calc(100vw - 350px);
`


const MainSceneWindow: React.FC = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const sceneRef = React.useRef<MainScene | null>(null)
    const divRef = React.useRef<HTMLDivElement | null>(null)
    const reqIdRef = React.useRef<number>(0);
    const control = React.useRef<TransformControls | null>(null)

    function mainRoop() {
        render3d()
        networkHandler.sendPosRot()

        requestAnimationFrame(mainRoop)
    }
    function render3d() {
        const scene = sceneRef.current
        const glCtx = scene?.renderer?.getContext()
        if (glCtx && !glCtx.isContextLost() && scene) {
            scene.renderer.render(scene.scene, scene.camera)
        }
    }
    window.addEventListener('keydown', (event) => {
        switch (event.code) {
            case 'KeyW':
                control.current?.setMode('translate')
                break
            case 'KeyE':
                control.current?.setMode('rotate')
                break
            case 'Digit1':
                control.current?.attach(objectHandler.fbxObject?.children[0].children[0]!)
                console.log('button 1 is pressed.')
                break
            case 'Digit2':
                control.current?.attach(objectHandler.fbxObject?.children[0]!)
                console.log('button 2 is pressed.')
                break
        }
    })


    React.useEffect(() => {
        if (!canvasRef.current) return
        if (!divRef.current) return
        if (!sceneRef.current) createScene(sceneRef, canvasRef.current, divRef.current, control)
        const dispo: IReactionDisposer[] = []
        mainRoop()

        dispo.push(
            reaction(
                () => objectHandler.fbxObjectSrc,
                () => {
                    if (sceneRef.current && control.current)
                        objectHandler.loadFbxObject(sceneRef.current.scene, control.current)
                }
            )
        )

        return () => {
            for (const d of dispo) d()
            cancelAnimationFrame(reqIdRef.current)
        }
    }, [])

    return <Div ref={divRef}>
        <canvas ref={canvasRef} />
    </Div>
}

export default MainSceneWindow