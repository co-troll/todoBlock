import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        example : 'testID',
        description : "유저 아이디",
    })
    uid : string;
    @ApiProperty({
        example : 'qwer1234!',
        description : "유저 비밀번호",
    })
    upw : string;
    @ApiProperty({
        example : '01012345678',
        description : "유저 휴대폰 번호",
    })
    phoneNumber : string;
}
