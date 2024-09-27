import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService : UsersService,
    private readonly jwtService : JwtService,
  ) {}

  // 로그인
  async Login(createAuthDto: CreateAuthDto) {
    const user = await this.userService.vaildateUser(createAuthDto.uid, createAuthDto.upw);
    if(!user) {
      throw new UnauthorizedException('Invalid UserDTO')
    }

    const payload = { uid : user.uid};

    return {
      userToken: this.jwtService.sign(payload), // JWT 토큰 생성
    };
  }

  async socialLogin(user : any) {

    const payload = {uid : user.nickname}

    return this.jwtService.sign(payload)
    
  }



}
