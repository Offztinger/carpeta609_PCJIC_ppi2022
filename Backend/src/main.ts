
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import configurations from './core/config/configurations';
import { Environments } from './core/interfaces';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === Environments.PRODUCTION ? true : false,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Portal PPI Endpoints')
    .setDescription('Endpoint construidos para el proyecto')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors();
  const env = configurations();
  const backendPort = env.backendPort;
  await app.listen(backendPort, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
