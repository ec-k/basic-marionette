import { objectHandler } from '../stores/ObjectHandler';
import { GetGlobalRotation } from '../utils/GetGlobalRotation';
import { ConvertRotation4neos } from '../utils/ConvertCoordinates4neos';

class NetworkHandler {
    private ws_: WebSocket | undefined = undefined
    sendEnabled_: boolean = false;

    constructor(host: string, port: number) {
        this.connectWS(`ws://${host}:${port}`)
    }

    connectWS(origin: string): void {
        if (this.ws_) this.ws_.close()
        this.ws_ = new WebSocket(origin)
    }

    sendPosRot() {
        if (!this.sendEnabled_) return
        if (!objectHandler.fbxObject) return
        const n_digits = 7
        let msg = ``

        let object = objectHandler.fbxObject.children[0]
        let pos = object.position
        let rot = ConvertRotation4neos(GetGlobalRotation(object))
        msg += `#2,${pos.x.toFixed(n_digits)},${pos.y.toFixed(n_digits)},${pos.z.toFixed(n_digits)},${rot.x.toFixed(n_digits)},${rot.y.toFixed(n_digits)},${rot.z.toFixed(n_digits)},${rot.w.toFixed(n_digits)}`

        object = object.children[0]
        pos = object.position
        rot = ConvertRotation4neos(GetGlobalRotation(object))
        msg += `#1,${pos.x.toFixed(n_digits)},${pos.y.toFixed(n_digits)},${pos.z.toFixed(n_digits)},${rot.x.toFixed(n_digits)},${rot.y.toFixed(n_digits)},${rot.z.toFixed(n_digits)},${rot.w.toFixed(n_digits)}`

        this.ws_?.send(msg)
    }
}
const networkHandler = new NetworkHandler("localhost", 23000)
export default networkHandler