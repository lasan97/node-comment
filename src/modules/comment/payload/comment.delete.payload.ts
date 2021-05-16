import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CommentDeletePayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  commentId: number;
}
