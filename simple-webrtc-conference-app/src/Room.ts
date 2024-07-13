import {
  DtlsParameters,
  MediaKind,
  Router,
  RtpCapabilities,
  RtpParameters,
  Worker,
} from 'mediasoup/node/lib/types'
import { Server, Socket } from 'socket.io'
import { v4 } from 'uuid'
import { Peer } from './Peer'

export class Room {
  uuid: string
  io: Server
  worker: Worker
  router: Router
  peers: Map<string, Peer> = new Map()

  constructor(io: Server, worker: Worker) {
    this.uuid = v4()
    this.io = io
    this.worker = worker
    this.createRouter(this.uuid)
  }

  async createWebrtcTransport(socketId: string) {
    const transport = await this.router.createWebRtcTransport({
      listenIps: [{ ip: '0.0.0.0', announcedIp: '127.0.0.1' }],
      enableUdp: true,
      enableTcp: true,
      preferUdp: true,
    })

    console.log('Created new transport', transport.id)

    this.peers.get(socketId)?.addTransport(transport)

    return {
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters,
    }
  }

  addNewPeer(client: Socket) {
    client.data.roomId = this.uuid
    const peer = new Peer(client.id, client)
    this.peers.set(peer.uuid, peer)
    client.join(this.uuid)
    client.to(this.uuid).emit('room:new_peer', {
      peerId: peer.uuid,
      producers: Array.from(peer.producers.keys()).map((peer) => peer),
    })
  }

  async connectPeerTransport(
    client: Socket,
    transportId: string,
    dtlsParameters: DtlsParameters,
  ) {
    const peer = this.peers.get(client.id)
    if (!peer) {
      return { error: 'Peer not found' }
    }

    return await peer.connectTransport(transportId, dtlsParameters)
  }

  removePeer(client: Socket) {
    const peer = this.peers.get(client.id)
    if (peer) {
      peer.close()
      client.leave(this.uuid)
      client.to(this.uuid).emit('room:leave_peer', { peerId: peer.uuid })
      this.peers.delete(client.id)
    }
  }

  getRtpCapabilities(): RtpCapabilities {
    return this.router.rtpCapabilities
  }

  getPeersList(client: Socket) {
    const peerList: Array<{
      peerId: string
      producers: string[]
    }> = []

    this.peers.forEach((peer) => {
      if (peer.uuid === client.id) {
        return
      }
      peerList.push({
        peerId: peer.uuid,
        producers: Array.from(peer.producers.keys()).map((peer) => peer),
      })
    })

    return peerList
  }

  async eventHandler(payload: { type: string; data: object }, client: Socket) {
    switch (payload.type) {
      case 'CREATE_WEBRTC_TRANSPORT':
        return await this.createWebrtcTransport(client.id)
      case 'GET_PEERS_LIST':
        return await this.getPeersList(client)
      case 'CONNECT_TRANSPORT':
        const { transportId, dtlsParameters } = payload.data as {
          transportId: string
          dtlsParameters: DtlsParameters
        }
        return await this.connectPeerTransport(
          client,
          transportId,
          dtlsParameters,
        )
      case 'PRODUCE':
        const produceValue = payload.data as {
          producerId: string
          kind: MediaKind
          rtpParameters: RtpParameters
        }
        return await this.produce({ client, ...produceValue })
      case 'CONSUME':
        const consumeValue = payload.data as {
          producerId: string
          consumerId: string
          rtpCapabilities: RtpCapabilities
        }
        return await this.consume({ client, ...consumeValue })
    }
  }

  async consume({
    client,
    producerId,
    consumerId,
    rtpCapabilities,
  }: {
    client: Socket
    producerId: string
    consumerId: string
    rtpCapabilities: RtpCapabilities
  }) {
    const isValid = this.router.canConsume({
      producerId,
      rtpCapabilities,
    })
    if (!isValid) {
      return { error: 'Cannot consume producer' }
    }

    const { consumer, params } = await this.peers
      .get(client.id)
      .createConsumer({ producerId, consumerId, rtpCapabilities })

    consumer.on(
      'producerclose',
      function () {
        console.log('Consumer closed due to producerclose event', {
          name: client.id,
          consumer_id: `${consumer.id}`,
        })
        client.to(this.uuid).emit('consumerClosed', {
          consumer_id: consumer.id,
        })
      }.bind(this),
    )

    return params
  }

  async produce({
    client,
    producerId,
    kind,
    rtpParameters,
  }: {
    client: Socket
    producerId: string
    kind: MediaKind
    rtpParameters: RtpParameters
  }) {
    const peer = this.peers.get(client.id)

    if (!peer) {
      return { error: 'Peer not found' }
    }

    const producer = await peer.createProducer({
      producerId,
      kind,
      rtpParameters,
    })

    client.to(this.uuid).emit('room:new_producer', {
      producerId: producer.id,
      peerId: client.id,
    })

    return { producerId: producer.id }
  }

  async createRouter(uuid: string) {
    this.router = await this.worker.createRouter({
      appData: {
        roomId: uuid,
      },
      mediaCodecs: [
        {
          kind: 'audio',
          mimeType: 'audio/opus',
          clockRate: 48000,
          channels: 2,
        },
        {
          kind: 'video',
          mimeType: 'video/VP8',
          clockRate: 90000,
          parameters: {
            'x-google-start-bitrate': 1000,
          },
        },
        {
          kind: 'video',
          mimeType: 'video/VP9',
          clockRate: 90000,
          parameters: {
            'profile-id': 2,
            'x-google-start-bitrate': 1000,
          },
        },
        {
          kind: 'video',
          mimeType: 'video/h264',
          clockRate: 90000,
          parameters: {
            'packetization-mode': 1,
            'profile-level-id': '4d0032',
            'level-asymmetry-allowed': 1,
            'x-google-start-bitrate': 1000,
          },
        },
        {
          kind: 'video',
          mimeType: 'video/h264',
          clockRate: 90000,
          parameters: {
            'packetization-mode': 1,
            'profile-level-id': '42e01f',
            'level-asymmetry-allowed': 1,
            'x-google-start-bitrate': 1000,
          },
        },
      ],
    })

    this.router.on('@close', () => {
      console.log('Router closed')
    })
  }
}
