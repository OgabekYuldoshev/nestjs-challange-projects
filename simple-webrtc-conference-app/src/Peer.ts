import { types } from 'mediasoup'
import {
  WebRtcTransport,
  RtpParameters,
  MediaKind,
  Producer,
  Consumer,
} from 'mediasoup/node/lib/types'
import { Socket } from 'socket.io'

export class Peer {
  uuid: string
  socket: Socket
  transports: Map<string, WebRtcTransport> = new Map()
  producers: Map<string, Producer> = new Map()
  consumers: Map<string, Consumer> = new Map()

  constructor(uuid: string, socket: Socket) {
    this.uuid = uuid
    this.socket = socket
  }

  addTransport(transport: WebRtcTransport) {
    this.transports.set(transport.id, transport)
  }

  async createConsumer({
    consumerId,
    producerId,
    rtpCapabilities,
  }: {
    consumerId: string
    producerId: string
    rtpCapabilities: types.RtpCapabilities
  }) {
    const consumerTransport = await this.transports.get(consumerId)

    if (!consumerTransport) {
      return { error: 'Consumer transport not found' }
    }

    const consumer = await consumerTransport.consume({
      producerId,
      rtpCapabilities,
      paused: false,
    })

    console.log(consumer)

    if (consumer.type === 'simulcast') {
      await consumer.setPreferredLayers({
        spatialLayer: 2,
        temporalLayer: 2,
      })
    }

    this.consumers.set(consumer.id, consumer)

    consumer.on(
      'transportclose',
      function () {
        console.log('Consumer transport close', {
          name: `${this.name}`,
          consumer_id: `${consumer.id}`,
        })
        this.consumers.delete(consumer.id)
      }.bind(this),
    )

    return {
      consumer,
      params: {
        producerId,
        id: consumer.id,
        kind: consumer.kind,
        rtpParameters: consumer.rtpParameters,
        type: consumer.type,
        producerPaused: consumer.producerPaused,
      },
    }
  }

  async createProducer({
    producerId,
    kind,
    rtpParameters,
  }: {
    producerId: string
    kind: MediaKind
    rtpParameters: RtpParameters
  }) {
    const producer = await this.transports.get(producerId).produce({
      kind,
      rtpParameters,
    })

    this.producers.set(producer.id, producer)

    producer.on(
      'transportclose',
      function () {
        console.log('Producer transport close', {
          name: `${this.name}`,
          consumer_id: `${producer.id}`,
        })
        producer.close()
        this.producers.delete(producer.id)
      }.bind(this),
    )

    return producer
  }

  async connectTransport(
    transportId: string,
    dtlsParameters: types.DtlsParameters,
  ) {
    if (!this.transports.has(transportId))
      return { error: 'Transport not found' }

    await this.transports.get(transportId).connect({
      dtlsParameters: dtlsParameters,
    })

    return { status: 'ok' }
  }

  close() {
    this.transports.forEach((transport) => transport.close())
  }
}
