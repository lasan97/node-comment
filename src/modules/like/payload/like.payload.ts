import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LikePayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  commentId: number;
}
