import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SolapiMessageService } from 'solapi'


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

  async SMSAuthentication(phoneNumber: string): Promise<string> {

    await this.userService.findUserID(phoneNumber);

    const messageService = new SolapiMessageService(process.env.API_KEY, process.env.API_SECRET);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    messageService.sendOne({
      to: phoneNumber,
      from: process.env.from_Number,
      text: `인증번호 : ${verificationCode}`
    }).then(res => console.log(res))
      .catch(err => console.error('Error sending SMS:', err));


    return verificationCode;
  }

}




}
