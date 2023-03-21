import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');

  const config = new DocumentBuilder()
    .setTitle('Users Doc')
    .setDescription('This is CRUD api for users')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    try {
      console.log(`I listener on port ${PORT}`);
    } catch (e) {
      console.log(e);
    }
  });
}
bootstrap();
