import { action, makeObservable, observable } from 'mobx'
import { AxesHelper } from 'three'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

class ObjectHandler {
    fbxObject: THREE.Object3D | null = null
    fbxObjectSrc: string | null = null
    rest1pos: THREE.Vector3 | null = null;
    rest1rot: THREE.Quaternion | null = null;
    rest2pos: THREE.Vector3 | null = null;
    rest2rot: THREE.Quaternion | null = null;

    constructor() {
        makeObservable(this, {
            fbxObject: observable.ref,
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

            // Save rest transform and add local axes
            let obj = object.children[0]
            obj.add(new AxesHelper(10))
            this.rest2pos = obj.position
            this.rest2rot = obj.quaternion.clone()
            obj = obj.children[0]
            obj.add(new AxesHelper(10))
            this.rest1pos = obj.position
            this.rest1rot = obj.quaternion.clone()
        })
    }
}

export const objectHandler = new ObjectHandler()