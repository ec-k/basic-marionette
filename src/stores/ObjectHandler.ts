import { action, makeObservable, observable } from 'mobx'
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

    loadFbxObject(scene: THREE.Scene) {
        if (!this.fbxObjectSrc) return
        const fbxLoader = new FBXLoader()
        fbxLoader.load(this.fbxObjectSrc, (object) => {
            object.scale.set(0.01, 0.01, 0.01)
            scene.add(object)
        })
    }
}

export const objectHandler = new ObjectHandler()