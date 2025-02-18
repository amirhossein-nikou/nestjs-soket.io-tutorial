import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io';
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    @WebSocketServer() server: Server
    afterInit(server: any) {
        console.log('server initialized');
    }
    handleConnection(client: any, ...args: any[]) {
        const {sockets} = this.server.sockets
        console.log('User id => ' + client.id + ' connected');
        console.log('Online users => ' + sockets.size );
    }
    handleDisconnect(client: any) {
        const {sockets} = this.server.sockets
        console.log('User id => ' + client.id + ' disconnected');
        console.log('Online users => ' + sockets.size );
    }
    @SubscribeMessage('ping')
    pingHandler(client: any, data: any){
        console.log('received data from id: ' + client.id);
        console.log('Data: ' + data.message);
        client.emit('pong', {message: 'hello from nestjs'})
    }

}