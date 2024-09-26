import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduleDto } from './create-schedule.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {
    @ApiProperty({
        description : "완료 여부 표시",
        example: false,
    })
    isFinished?: boolean;
}
