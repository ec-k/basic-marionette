import { objectHandler } from '../stores/ObjectHandler';

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
        const pos = objectHandler.fbxObject.position
        const rot = objectHandler.fbxObject.quaternion
        this.ws_?.send(`${pos.x}, ${pos.y}, ${pos.z}, ${rot.x}, ${rot.y}, ${rot.z}, ${rot.w}`)
    }
}
const networkHandler = new NetworkHandler("localhost", 23000)
export default networkHandler