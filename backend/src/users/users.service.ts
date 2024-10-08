import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UniqueConstraintError } from 'sequelize';
import * as bcrypt from 'bcrypt';

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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
