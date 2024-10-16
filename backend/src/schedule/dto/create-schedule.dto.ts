import { ApiProperty } from "@nestjs/swagger";

export class CreateScheduleDto {
    @ApiProperty({
        example : "내용이 들어가는 부분입니다."
    })
    content : string;

    @ApiProperty({
        example: ["2024-01-08", "2024-02-30"]
    })
    dateArr:string[];

    @ApiProperty({
        example : "쉬움"
    })
    difficulty:string;
}
