import { Injectable } from '@nestjs/common';
import { firebaseAdmin } from './firebase-admin'; 

@Injectable()
export class FirebaseService {
  async sendVerificationCode(phoneNumber: string): Promise<string> {
    const verificationId = await firebaseAdmin.auth().createSessionCookie(phoneNumber, {
      expiresIn: 60 * 60 * 24 * 5 * 1000, // 만료 기간 설정 (예: 5일)
    });
    return verificationId; // 인증 코드 반환 (예시로 사용)
  }

  async verifyCode(verificationId: string): Promise<boolean> {
    // 인증 코드 검증 로직 (여기서는 단순히 확인)
    const isVerified = true; // 실제 인증 로직 구현 필요
    return isVerified;
  }
}
