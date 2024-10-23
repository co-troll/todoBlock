import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationAuthDto } from './dto/authentication-auth.dto';
import { FindUserDto } from './dto/find-user.dto';
import { FindPasswordDto } from './dto/find-password.dto';

@ApiTags('로그인 API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary : "로그인 로직"})
  @Post('login')
  async create(
    @Body() createAuthDto: CreateAuthDto,
    @Res() res : Response,
  ) {
    const {userToken} = await this.authService.Login(createAuthDto);
    
    res.cookie('userToken', userToken, {
      httpOnly : true,
    })

    return res.status(200).json({message : "로그인 성공"})
  }

  // 로그아웃
  @ApiOperation({summary : "로그아웃"})
  @Get('logout')
  logout(@Res() res : Response) {
    res.clearCookie('userToken', {
      httpOnly : true
    })

    return res.status(200).json({message : '로그아웃 성공'})
  }


  // 카카오 소셜로그인 요청
  @ApiOperation({summary : "카카오 로그인 요청 URL"})
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin() {
    
  }

  @ApiOperation({summary : "카카오 로그인 콜백 URL"})
  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginCallback(@Req() req, @Res() res : Response) {
    const user = req.user

    //todo : 회원가입 해야함
    
    const userToken = await this.authService.socialLogin(user);

    res.cookie('userToken', userToken, {
      httpOnly : true
    })
    res.redirect('http://localhost:3000/todolist');
  }

    // 아이디 찾기
    @ApiOperation({summary : "아이디찾기"})
    @ApiResponse({status : 201, description : "핸드폰 번호를 보내면 아이디 전송"})
    @Post('finduid')
    async checkUid(
      @Body() findUserDto : FindUserDto
    ) {
      return await this.authService.findUid(findUserDto.phoneNumber);
    }

    // 아이디랑 핸드폰 번호 보내면 둘이 일치하는지 보고 인증번호 보냄
    @ApiOperation({summary : "비밀번호 찾기 "})
    @ApiResponse({status : 201, description : "아이디랑 핸드폰 번호가 같으면 인증번호를 사용자에게 보냄"})
    @Post('checkpassword')
    async findUid (
      @Body() findPasswordDto : FindPasswordDto
    ) {
      return this.authService.passwordCheck(findPasswordDto.uid, findPasswordDto.phoneNumber);
    }


  // 문자 인증 요청
  @ApiOperation({summary : "문자인증 요청"})
  @Post('SMSAuthentication')
  SMSAuthentication(
    @Body() authenticationAuthDto : AuthenticationAuthDto,
  ) {
    return this.authService.SMSAuthentication(authenticationAuthDto.number);
  }

}
