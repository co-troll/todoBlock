import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto  {
    @ApiProperty({
        example : 'qwer1234!',
        description : "유저 비밀번호",
    })
    upw : string;
}
