import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({ cors: { origin: '*' } , namespace: 'group'})
export class GroupGateway {
    @SubscribeMessage('list')
    listHandler(client: any, data: any) {
        console.log('Data: ' + data);
        client.emit('list',
            [
                { name: 'GL 1' },
                { name: 'GL 2' },
                { name: 'GL 3' },
            ]
        )
    }
}
