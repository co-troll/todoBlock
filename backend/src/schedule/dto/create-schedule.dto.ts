import { ApiProperty } from "@nestjs/swagger";

export class CreateScheduleDto {
    @ApiProperty({
        example : "내용이 들어가는 부분입니다."
    })
    content : string;
}
