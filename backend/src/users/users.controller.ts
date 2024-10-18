import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindUserDto } from './dto/find-user.dto';
import { RequestUserDto } from './dto/request-user-dto';
import { JwtAuthGuard } from 'src/guards/jwtGuard';

@ApiTags('회원가입 API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 회원가입
  @ApiOperation({summary : '회원가입'})
  @ApiResponse({status : 201, description : "회원가입 성공"})
  @ApiResponse({status : 409, description : "유저 아이디 or 전화번호 중복 발생"})
  @Post('signup')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res : Response,
  ) {
      await this.usersService.create(createUserDto);
      return res.status(201).json({message : "회원가입 성공"})
  }

  // 유저 아이디 중복 확인
  @ApiOperation({summary : '아이디 중복 여부 확인'})
  @ApiResponse({status : 200, description : "문제 없음(중복x)"})
  @ApiResponse({status : 409, description : "유저 아이디 중복"})
  @Get('check/:uid')
  async checkIdDuplicaion(
    @Param('uid') uid: string,
    @Res() res : Response,
  ) {
    await this.usersService.checkIdDuplicaion(uid);
    return res.status(200).json({message : "No problem"})
  }

  // 아이디 찾기
  @ApiOperation({summary : "아이디 찾기"})
  @ApiResponse({status : 201, description : "핸드폰 번호 틀릴 시 404에러 반환", type : FindUserDto})
  @Post('findingpassword')
  async findUserID(
    @Body() findUserDto : FindUserDto
  ) {
    return await this.usersService.findUserID(findUserDto.phoneNumber);
  }

  // 유저 아이디 전송
  @ApiOperation({summary : "유저 아이디 습득"})
  @Get('getuid')
  @UseGuards(JwtAuthGuard)
  async getUid(
    @Req() req : Request,
  ) {
    const {uid} = req['uid'];
    if(!uid) {
      return null;
    }

    return uid;
  }

  // 비밀번호 수정 요청
  @ApiOperation({summary : "비밀번호 변경 페이지 이동 요청"})
  @ApiResponse({status : 201, description : "아이디랑 비밀번호를 넘기면 일치여부 확인", type : RequestUserDto})
  @Post('requestpasswordchange')
  async requestChange(
    @Body() requestUserDto : RequestUserDto
  ) {
    return await this.usersService.requestToChangePage(requestUserDto);
  }

  // 비밀번호 수정
  @Patch(':uid')
  @ApiOperation({summary : "비밀번호 변경"})
  @ApiResponse({status : 201, type : UpdateUserDto})
  update(@Param('uid') uid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(uid, updateUserDto);
  }

  // 탈퇴 (미)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
