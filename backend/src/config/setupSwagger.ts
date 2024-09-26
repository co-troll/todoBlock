import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const setupSwagger = (app : INestApplication) : void => {
    const option = new DocumentBuilder()
    .setTitle('Backend API Docs')
    .setDescription('corporation project backend API')
    .setVersion('1.0.0')
    .build();

    const document = SwaggerModule.createDocument(app, option);
    SwaggerModule.setup('test', app, document);
}