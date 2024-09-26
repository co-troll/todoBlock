import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
      sameSite : 'none',
      secure : true,
    })

    return res.status(200).json({message : "로그인 성공"})
  }

  // 로그아웃
  @ApiOperation({summary : "로그아웃"})
  @Get('logout')
  logout(@Res() res : Response) {
    res.clearCookie('userToken', {
      httpOnly : true,
      secure : true,
      sameSite : 'none',
    })

    return res.status(200).json({message : '로그아웃 성공'})
  }

}
