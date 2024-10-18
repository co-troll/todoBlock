import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UniqueConstraintError } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { FindUserDto } from './dto/find-user.dto';
import { RequestUserDto } from './dto/request-user-dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User)
    private readonly UserEntity : typeof User,
  ) {}

  // 회원가입 로직
  async create(createUserDto: CreateUserDto) : Promise<void> {
    try {
      const hashedPassword = await this.hashPassword(createUserDto.upw);
      await this.UserEntity.create({...createUserDto, upw : hashedPassword});
      return;

    } catch (err) {
      console.log(err)
      if (err instanceof UniqueConstraintError) {
        throw new ConflictException('uid or phoneNumber already exists.');
      }
      throw (err);

    }
  }

  // 비밀번호 암호화
  async hashPassword(password : string) : Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  // 중복체크
  async checkIdDuplicaion(uid: string) {
      const userData = await this.UserEntity.findOne({where : {uid}})
      if(userData) {
        throw new ConflictException(`${uid} already exists`);
      }
      return null;
  }

  // 로그인 하기 위해 아이디랑 비밀번호 일치하는지 확인
  async vaildateUser(uid : string, upw : string) {
    const user = await this.UserEntity.findOne({where : {uid}})
    if(!user) {
      return null;
    }

    const isPasswordVaild = await bcrypt.compare(upw, user.upw);
    if(!isPasswordVaild) {
      return null;
    }

    return user;
  }

  // 핸드폰 번호로 아이디를 찾음
  async findUserID(phoneNumber : string) {
    const userData = await this.UserEntity.findOne({where : { phoneNumber }, attributes : ['uid']})
    if (userData) {
      return userData;  // userData 자체가 { uid: 'value' } 형태
    } else {
      throw new NotFoundException('User not found');
    }
  }

  // 핸드폰 번호랑 아이디랑 일치여부 확인해서 비밀번호 변경창으로 간다
  async requestToChangePage(requestUserDto : RequestUserDto) {
    const userData = await this.UserEntity.findOne({where : {uid : requestUserDto.uid}, attributes : ['phoneNumber']})
    if(!userData) {
      throw new NotFoundException('User not found');
    } else if (userData.phoneNumber !== requestUserDto.phoneNumber) {
      throw new UnauthorizedException('phoneNumber does not match')
    } else {
      return "유저확인이 완료되었습니다.";
    }
  }

  // 비밀번호 업데이트
  async update(uid: string, updateUserDto: UpdateUserDto) {
    const hashPassword = await this.hashPassword(updateUserDto.upw);

    const updateUser = await this.UserEntity.update(
      { upw : hashPassword },
      { where : {uid} }
    )

    if (updateUser[0] === 0) {
      throw new NotFoundException('User not found');
    }
  
    return { message: 'Password updated successfully' };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
