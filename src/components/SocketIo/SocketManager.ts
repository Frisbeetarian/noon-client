import { io, Socket } from 'socket.io-client'

class SocketManager {
  private static instance: SocketManager
  private static socket: Socket | null = null

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance(auth): SocketManager | null {
    if (!auth) {
      console.error('Auth object is null or undefined.')
      return null
    }

    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager()
      SocketManager.connect(auth)
    }

    return SocketManager.instance
  }

  private static async connect(auth): Promise<void> {
    const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_URL as string

    if (!this.socket) {
      this.socket = io(SOCKET_SERVER_URL, { auth })

      this.socket.onAny((event, ...args) => {
        console.log(event, args)
      })
    }
  }

  public getSocket(): Socket | null {
    if (SocketManager.socket) {
      return SocketManager.socket
    } else {
      return null
    }
  }

  public disconnect(): void {
    if (SocketManager.socket) {
      SocketManager.socket.disconnect()
      SocketManager.socket = null
    }
  }
}

export default SocketManager
