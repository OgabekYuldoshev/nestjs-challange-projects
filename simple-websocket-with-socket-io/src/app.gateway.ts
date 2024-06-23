import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(3001, { cors: { origin: '*' } })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleConnection(client: Socket) {
    console.log('Connected', client.id);
  }
  handleDisconnect(client: Socket) {
    console.log('Disconnected', client.id);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, message: string) {
    client.broadcast.emit('newMessage', message);
  }
}
