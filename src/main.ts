import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/")
  //Swagger
  const config = new DocumentBuilder()
    .setTitle('DesignWay Notes API')
    .setDescription('DesignWay coding interview task: Notes API')
    .setVersion('1.0')
    .addTag('DesignWay Notes App')
    .addBearerAuth() //Bearer Token Autentication
    .build();

  //disable Swaggeron production
  if (env.NODE_ENV === "production") {
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }


  app.enableCors()
  app.use(helmet())

  await app.listen(3000);
}
bootstrap();
