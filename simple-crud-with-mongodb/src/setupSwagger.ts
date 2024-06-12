import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('SCAD')
    .setDescription('Simple Crud API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);
};
