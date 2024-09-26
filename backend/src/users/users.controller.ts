import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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

  // 비밀번호 수정 (미)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // 탈퇴 (미)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
