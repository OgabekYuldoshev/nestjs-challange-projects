import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Room } from './Room'
import { Worker } from 'mediasoup/node/lib/Worker'
import { OnModuleInit } from '@nestjs/common'
import { createWorker } from 'mediasoup'

@WebSocketGateway(81, { cors: { origin: '*' }, transports: ['websocket'] })
export class AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  @WebSocketServer()
  server: Server
  worker: Worker
  rooms: Map<string, Room> = new Map()

  async onModuleInit() {
    this.worker = await createWorker({
      logLevel: 'debug',
      logTags: ['ice', 'dtls', 'info', 'rtp', 'sctp', 'srtp'],
    })
  }

  handleConnection(client: Socket) {
    console.log('Socket connection', client.id)
  }

  handleDisconnect(client: Socket) {
    const room = this.rooms.get(client.data.roomId)

    if (room) {
      room.removePeer(client)
    }
  }

  @SubscribeMessage('room:create')
  handleCreateRoom(@ConnectedSocket() client: Socket) {
    const room = new Room(this.server, this.worker)
    this.rooms.set(room.uuid, room)

    client.data.roomId = room.uuid

    return { roomId: room.uuid }
  }

  @SubscribeMessage('room:join')
  handleJoinRoom(
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const room = this.rooms.get(roomId)
    if (!room) {
      return { error: 'Room not found' }
    }
    room.addNewPeer(client)

    return {
      rtpCapabilities: room.getRtpCapabilities(),
      peers: room.getPeersList(client),
    }
  }

  @SubscribeMessage('room:event')
  async handleEventHandler(
    @MessageBody() payload: { type: string; data: object },
    @ConnectedSocket() client: Socket,
  ) {
    const room = this.rooms.get(client.data.roomId)

    if (!room) {
      return { error: 'Room not found' }
    }
    return await room.eventHandler(payload, client)
  }
}
