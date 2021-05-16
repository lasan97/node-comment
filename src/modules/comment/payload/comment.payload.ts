import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CommentPayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  content: string;
}
