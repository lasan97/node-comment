import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CommentUpdatePayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  id: number;
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  content: string;

}
