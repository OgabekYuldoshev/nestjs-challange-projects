import { ApiProperty } from '@nestjs/swagger';

export class ResponseObject<T> {
  @ApiProperty({
    type: Object,
  })
  data: T;

  constructor(object: T) {
    this.data = object;
  }
}
