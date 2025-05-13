import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';//برای خروجی

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   const config = new DocumentBuilder()
    .setTitle('OAuth + JWT Auth API')
    .setDescription('مستندات Swagger برای احراز هویت')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2)); // با فرمت زیبا (indentation)
  SwaggerModule.setup('api', app, document);
 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
