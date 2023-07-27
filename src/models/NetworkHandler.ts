import { Vector3, Quaternion } from 'three'

class NetworkHandler {
    private ws_: WebSocket | undefined = undefined

    constructor(host: string, port: number) {
        this.connectWS(`ws://${host}:${port}`)
    }

    connectWS(origin: string): void {
        if (this.ws_) this.ws_.close()
        this.ws_ = new WebSocket(origin)
    }

    sendPosRot(pos: Vector3, rot: Quaternion) {
        this.ws_?.send(`${pos.x}, ${pos.y}, ${pos.z}, ${rot.x}, ${rot.y}, ${rot.z}, ${rot.w}`)
    }
}
const networkHandler = new NetworkHandler("localhost", 23000)
export default networkHandler