import { action, makeObservable, observable } from 'mobx'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

class ObjectHandler {
    fbxObject: THREE.Object3D | null = null
    fbxObjectSrc: string | null = null

    constructor() {
        makeObservable(this, {
            fbxObject: observable,
            fbxObjectSrc: observable,
            setfbxObjectSrc: action,
        })
    }
    get getFbxObject() {
        return this.fbxObject
    }
    setfbxObjectSrc(url: string) {
        this.fbxObjectSrc = url
    }

    loadFbxObject(scene: THREE.Scene, control: TransformControls) {
        if (!this.fbxObjectSrc) return
        const fbxLoader = new FBXLoader()
        fbxLoader.load(this.fbxObjectSrc, (object) => {
            if (this.fbxObject) scene.remove(this.fbxObject)

            this.fbxObject = object

            // Add object to scene.
            object.scale.set(0.01, 0.01, 0.01)
            scene.add(object)

            // Attach object to Transform Controls.
            control.attach(object)
        })
    }
}

export const objectHandler = new ObjectHandler()