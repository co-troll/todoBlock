import { ApiProperty } from "@nestjs/swagger";

export class RequestUserDto {
    @ApiProperty({
        example : 'testID',
        description : "유저 아이디",
    })
    uid : string;

    @ApiProperty({
        example : '01012345678',
        description : "유저 휴대폰 번호",
    })
    phoneNumber : string;
}