import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { CreateFirebaseDto } from './dto/create-firebase.dto';
import { UpdateFirebaseDto } from './dto/update-firebase.dto';

@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('send')
  async sendVerificationCode(@Body('phone') phone: string): Promise<{ verificationId: string }> {
    const verificationId = await this.firebaseService.sendVerificationCode(phone);
    return { verificationId }; // 클라이언트에 반환
  }

  @Post('verify')
  async verifyCode(@Body('verificationId') verificationId: string): Promise<{ verified: boolean }> {
    const isVerified = await this.firebaseService.verifyCode(verificationId);
    return { verified: isVerified };
  }
}
