import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app))
  app.enableCors(
    {
      origin:true,
      credentials:true,
      methods:"GET, POST, DELETE, PUT, PATCH",
      allowedHeaders: "Content-Type, Authorization",
    }
  )
  const config = new DocumentBuilder()
  .setTitle('be-ctf-cyberacademy')
  .setDescription('welcome CTF')
  .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document)
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
