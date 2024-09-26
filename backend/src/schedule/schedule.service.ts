import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Schedule } from './entities/schedule.entity';
import { Op } from 'sequelize';

@Injectable()
export class ScheduleService {

  constructor(
    @InjectModel(Schedule)
    private readonly ScheduleEntity : typeof Schedule,
  ){}
  
  // 스케줄 생성 로직
  async create(createScheduleDto: CreateScheduleDto, uid : string) {
    try {
      await this.ScheduleEntity.create({uid, content : createScheduleDto.content, isFinished : false});
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  // 해당 유저 전체 스케줄 불러옴
  async findAll(uid : string, status : string) {
    const whereCondition: any = { uid };
    try {
      if(status === 'not-finished') {
        whereCondition.isFinished = false;
      } else {
        whereCondition.isFinished = true;
      }

      return await this.ScheduleEntity.findAll({where : whereCondition})
    } catch (err) {
      console.log(err);
      throw err
    }
    
  }

  // 개별 게시물 찾아옴
  async findOne(index : number, uid: string) {
    try {
      const content : Schedule = await this.ScheduleEntity.findByPk(index);
      if(content.uid !== uid) {
        throw new NotAcceptableException("게시물작성자와 요청자가 일치하지 않습니다")
      }
      return content;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  // 스케쥴 내용 수정
  async update(index: number, createScheduleDto: CreateScheduleDto) {
    try {
      await this.ScheduleEntity.update(createScheduleDto, {where : {id : index}})
      return;
    } catch (err) {
      console.log("스케쥴 업데이트 오류: ", err);
      throw new Error('Failed to update schedule.');
    }
  }

  // 완료여부 변경
  async changeCompleted(index: number, isFinished : boolean) {
    try {
      await this.ScheduleEntity.update({isFinished}, {where : {id : index}})
      return;
    } catch (err) {
      console.log("스케쥴 완료여부 변경 오류: ", err);
      throw new Error('Failed to update schedule.');
    }
  }

  // 소프트 삭제
  async softRemove(id: number) {
    try {
      await this.ScheduleEntity.destroy({where : {id}})
      return;
    } catch (error) {
      console.log("스케쥴 삭제 오류: ", error);
      throw new Error('Failed to remove schedule.')
    }
  }

  // 소프트 삭제된 게시물 조회
  async findeDeletedSchedule(uid : string) {
    try {
      return await this.ScheduleEntity.findAll({
      where : {
        uid,
        deletedAt : {[Op.not] : null,},
        },
      paranoid : false,
    })
    } catch (err) {
      console.log("삭제된 파일 조회 오류: ", err);
      throw err;
    }
  }

  // 소프트 삭제된 게시물 상세 정보
  async findOneOfDeletedSchedule(index: number) {
    try {
      return await this.ScheduleEntity.findByPk(index, {
        paranoid: false,  // 소프트 삭제된 항목 조회
      });

    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  // 소프트 삭제된 게시물 복원
  async retoreSchedule(index: number) {
    try {
      const deletedSchedule = await this.findOneOfDeletedSchedule(index);
      await deletedSchedule.restore();
      return;

    } catch (err) {
      console.log("리스토어 로직 오류: ", err);
      throw err;
    }
  }

  // 완전삭제
  async hardDelete(index : number) {
    try {
      await this.ScheduleEntity.destroy({where : {id : index}, force : true,});
      return;
    } catch (err) {
      console.log("완전 삭제 오류: ", err);
      throw err;
    }
  }

}
