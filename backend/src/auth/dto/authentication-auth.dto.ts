import { ApiProperty } from "@nestjs/swagger";

export class AuthenticationAuthDto {
    @ApiProperty({
        example : "01012345678"
    })
    number : string;
}