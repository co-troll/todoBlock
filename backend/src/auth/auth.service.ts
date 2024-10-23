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

  // 문자 인증 보내는 코드
  async SMSAuthentication(phoneNumber: string): Promise<string> {

    await this.userService.findUserID(phoneNumber);

    const messageService = new SolapiMessageService(process.env.API_KEY, process.env.API_SECRET);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    messageService.sendOne({
      to: phoneNumber,
      from: process.env.FROM_NUMBER,
      text: `인증번호 : ${verificationCode}`
    }).then(res => console.log(res))
      .catch(err => console.error('Error sending SMS:', err));


    return verificationCode;
  }

  // 데이터 베이스 상에 아이디 존재하면 인증번호를 보냄
  async findUid(phoneNumber : string) {
    return await this.userService.findUserID(phoneNumber);
  }

   // 핸드폰 번호 기반으로 아이디 찾고 일치하면 인증 코드 보냄
  async passwordCheck(uid : string, phoneNumber : string) {
    const userid = await this.userService.findUserID(phoneNumber);
    if(uid !== userid) {
      throw new UnauthorizedException('phoneNumber and uswerid do not match')
    }

    return this.SMSAuthentication(phoneNumber);
  }

}