import { io, Socket } from 'socket.io-client'

class SocketManager {
  private static instance?: SocketManager
  private socket: Socket | null = null

  constructor() {
    if (SocketManager.instance) {
      return SocketManager.instance
    }

    this.socket = null
    SocketManager.instance = this
  }

  async connect(auth): Promise<Socket> {
    const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_URL as string

    if (!this.socket) {
      this.socket = io(SOCKET_SERVER_URL, {
        auth,
      })
    }
    return this.socket
  }

  getSocket(): Socket | null {
    return this.socket
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.off('connect')
      this.socket.off('disconnect')
      this.socket.off('session')
      this.socket.off('connect_error')

      this.socket.close()
      this.socket = null
    }
  }
}

const instance = new SocketManager()
export default instance
