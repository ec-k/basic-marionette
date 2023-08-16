import * as THREE from 'three'

export function GetGlobalRotation(obj: THREE.Object3D): THREE.Quaternion {
    return new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().extractRotation(obj.matrixWorld))
}
export function GetGlobalPosition(obj: THREE.Object3D): THREE.Vector3 {
    return new THREE.Vector3().setFromMatrixPosition(obj.matrixWorld)
}