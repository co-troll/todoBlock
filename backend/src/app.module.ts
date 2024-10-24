import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from './schedule/schedule.module';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ ConfigModule.forRoot({isGlobal : true, envFilePath : '.env'}),
    SequelizeModule.forRoot({
      dialect : "mysql",
      host : process.env.DEVELOP ? "localhost" : process.env.AWS_URL,
      port : 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: "task",
      autoLoadModels: true,
      synchronize: true,
      sync : {force : false}

    }),
    ScheduleModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
