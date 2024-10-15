import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { KakaoStratagy } from './kakao.strategy';

@Module({
  imports : [
    ConfigModule.forRoot({isGlobal : false}),
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret : process.env.JWT_SECRET_KEY,
      signOptions : { expiresIn : '24h'},
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, KakaoStratagy],
})
export class AuthModule {}
