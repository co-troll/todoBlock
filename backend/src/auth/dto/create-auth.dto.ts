import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDto {
    @ApiProperty({
        example : "testID"
    })
    uid : string;
    @ApiProperty({
        example : "qwer1234!"
    })
    upw : string;
}
