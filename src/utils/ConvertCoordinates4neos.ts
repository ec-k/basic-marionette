import * as THREE from 'three'

export function ConvertRotation4neos(rot: THREE.Quaternion): THREE.Quaternion {
    return new THREE.Quaternion(rot.x, -rot.y, -rot.z, rot.w)
}