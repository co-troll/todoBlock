import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req, Query, HttpCode } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwtGuard';

@ApiTags("스케줄 API")
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  // 스케줄 생성
  @ApiOperation({summary : "스케쥴 생성"})
  @ApiResponse({status : 201, description : "스케줄 생성 성공"})
  @ApiResponse({status : 401, description : "유효하지 않은 토큰 사용"})
  @Post('')
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createScheduleDto: CreateScheduleDto,
    @Req() req : Request,
    @Res() res : Response,
  ) {
    console.log(createScheduleDto.dateArr)
    const {uid} = req['uid'];
    await this.scheduleService.create(createScheduleDto, uid);
    return res.status(201).json({message : "스케줄 생성 성공"})
  }

  // 스케줄 조회
  @ApiOperation({summary : "전체 스케줄 조회"})
  @ApiQuery({name : "status", required: true, description : "완료/미완료 스케줄 구분하는 쿼리", enum : ['not-finished', 'finished'] })
  @ApiResponse({status : 200, description : "스케줄 조회 성공"})
  @ApiResponse({status : 401, description : "유효하지 않은 토큰 사용"})
  @Get('view')
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Req() req : Request,
    @Query('status') status : string,
  ) {
    if(!status) status = 'not-finished';

    const {uid} = req['uid'];
    return await this.scheduleService.findAll(uid, status);
  }

  // 상세 페이지
  @ApiOperation({summary : "인덱스 번호 입력하면 해당 스케줄 불러오기"})
  @ApiResponse({status : 200, description : "개별 스케줄 불러오기 성공"})
  @ApiResponse({status : 401, description : "유효하지 않은 토큰 사용"})
  @Get('view/:index')
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('index') index: string,
    @Req() req : Request,
  ) {
    const {uid} = req['uid'];
    return await this.scheduleService.findOne(+index, uid);
  }

  // 게시물 수정
  @ApiOperation({summary : "스케줄 수정"})
  @ApiResponse({status : 200, description : "스케줄 변경 성공"})
  @ApiResponse({status : 401, description : "유효하지 않은 토큰 사용"})
  @Patch('update/:index')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('index') index: string,
    @Body() createScheduleDto: CreateScheduleDto,
    // @Req() req: Request,
  ) {
    // const {uid} = req['uid'];
    // await this.scheduleService.findOne(+index, uid) // 게시물 작성자와 수정하려는 사람이 같은지 확인용
    await this.scheduleService.update(+index, createScheduleDto);
    return `변경후 내용: ${createScheduleDto.content}`;
  }

  // 스케줄 완료여부 수정
  @ApiOperation({summary : "스케줄 완료 여부 수정"})
  @ApiResponse({status : 200, description : "스케줄 변경 성공"})
  @ApiResponse({status : 401, description : "유효하지 않은 토큰 사용"})
  @Patch('isfinished/:index')
  @UseGuards(JwtAuthGuard)
  async changeCompleted(
    @Param('index') index: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    await this.scheduleService.changeCompleted(+index, updateScheduleDto.isFinished);
    return `스케줄완료여부 수정 게시물 인덱스: ${index}`
  }

  // 스케줄 삭제
  @ApiOperation({summary : "스케줄 삭제 (소프트)"})
  @ApiResponse({status : 204, description : "스케줄 삭제 성공"})
  @ApiResponse({status : 401, description : "유효하지 않은 토큰 사용"})
  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.scheduleService.softRemove(+id);
    return res.status(204).json({message: `${id} 스케쥴 삭제 성공`})
  }


  // 소프트 삭제된 게시물 조회 (휴지통 구현)
  @ApiOperation({summary : "소프트 삭제된 스케쥴 조회"})
  @ApiResponse({status : 200, description : "삭제된 스케줄 불러오기 성공"})
  @ApiResponse({status : 401, description : "유효하지 않은 토큰 사용"})
  @Get('deleted-schedule')
  @UseGuards(JwtAuthGuard)
  async findeDeletedSchedule(
    @Req() req : Request,
  ) {
    const {uid} = req['uid'];
    return await this.scheduleService.findeDeletedSchedule(uid);
  }

  // 소프트 삭제된 특정 게시물 조회
  @ApiOperation({summary : "소프트 삭제된 게시물 중 하나 조회"})
  @ApiResponse({status : 200, description : "개별 스케줄 불러오기 성공"})
  @ApiResponse({status : 401, description : "유효하지 않은 토큰 사용"})
  @Get('deleted-schedule/:index')
  @UseGuards(JwtAuthGuard)
  async findOneOfDeletedSchedule(
    @Param('index') index: string,
  ) {
    return await this.scheduleService.findOneOfDeletedSchedule(+index);
  }

  // 소프트 삭제된 게시물 복구
  @ApiOperation({summary : "소프트 삭제된 스케줄 복구"})
  @ApiResponse({status : 200, description : "스케줄 복구 성공"})
  @ApiResponse({status : 401, description : "유효하지 않은 토큰 사용"})
  @Patch('restore/:index')
  @UseGuards(JwtAuthGuard)
  async restore(
    @Param('index') index: string,
  ) {
    await this.scheduleService.retoreSchedule(+index);
    return `복원한 게시물 인덱스: ${index}`
  }

  // 소프트 삭제된 게시물 완전 삭제
  @ApiOperation({summary : "스케줄 삭제 (하드)"})
  @ApiResponse({status : 204, description : "스케줄 복구 성공"})
  @ApiResponse({status : 401, description : "유효하지 않은 토큰 사용"})
  @Delete('hardDelete/:index')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async hardDelete(
    @Param('index') index: string,
  ) {
    await this.scheduleService.hardDelete(+index);
  }


}
