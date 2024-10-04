import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-kakao";

@Injectable()
export class KakaoStratagy extends PassportStrategy(Strategy, 'kakao') {
    constructor(private configSevice : ConfigService) {
        super({
            clientID : configSevice.get<string>('KAKAO_CLIENT_ID'),
            clientSecret: '',
            callbackURL: configSevice.get<string>('KAKAO_REDIRECT_URI'),
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any) {
        // console.log('엑세스 토큰: ', accessToken);
        // console.log(profile);

        return {
            email: profile._json.kakao_account.email,
            nickname: profile.displayName,
        }

    }
}