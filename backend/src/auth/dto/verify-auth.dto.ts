import { ApiProperty } from "@nestjs/swagger";

export class VerifyAuthDto {
    @ApiProperty({
        example : "01012345678"
    })
    phoneNumber : string;

    @ApiProperty({
        example : "123456"
    })
    inputCode : string;
}