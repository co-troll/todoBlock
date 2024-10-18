import { ApiProperty } from "@nestjs/swagger";

export class FindPasswordDto {
    @ApiProperty({
        example : "testID"
    })
    uid : string;
    @ApiProperty({
        example : "01012345678",
        description : "유저 핸드폰 번호"
    })
    phoneNumber : string
}
