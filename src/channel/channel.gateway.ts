import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({ cors: { origin: '*' },namespace:'channel'})
export class ChannelGateway {
    @SubscribeMessage('list')
    listHandler(client: any, data: any) {
        console.log('Data: ' + data);
        client.emit('list',
            [
                { name: 'Ch 1' },
                { name: 'Ch 2' },
                { name: 'Ch 3' },
            ]
        )
    }
}
