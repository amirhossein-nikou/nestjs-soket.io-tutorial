import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
interface User {
    id: number,
    username: string,
    socketId: string
}
interface joinPayload {
    roomName: string,
    user: User
}
interface message {
    roomName: string,
    user: User,
    message: string,
    time: string
}
@WebSocketGateway({ cors: { origin: '*' } })
export class OnlineChat {
    @WebSocketServer() server: Server
    @SubscribeMessage('join-room')
    joinRoom(@ConnectedSocket() client: Socket, @MessageBody() data: joinPayload) {
        if (client.id && data?.roomName) {
            if (client.rooms.has(data.roomName)) {
                console.log('already joined in : ' + data.roomName);
            } else {
                client.join(data.roomName)
                console.log('connected to room : ' + data.roomName);
            }
        } else {
            client.emit('exception', 'you are disconnected')
        }
    }
    @SubscribeMessage('server-chat')
    serverChat(@ConnectedSocket() client: Socket, @MessageBody() data: message) {
        if (data.roomName) {
            return this.server.to(data.roomName).emit('client-chat', data)
        }
        return client.emit('exception', ' room not found')
    }
}