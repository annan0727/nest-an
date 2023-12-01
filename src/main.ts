import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateDocument } from './swagger';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置全局路由
  app.setGlobalPrefix("api");

  // 全局应用管道 对输入数据进行转换或者验证
  app.useGlobalPipes(new ValidationPipe());


  // 创建swagger文档
  generateDocument(app);

  // 监听端口号
  await app.listen(+process.env.SERVICE_PORT);
}
bootstrap();
