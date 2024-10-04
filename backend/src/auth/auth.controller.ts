import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

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
    res.status(200).json({message : "소셜 로그인 성공"})
  }

}
