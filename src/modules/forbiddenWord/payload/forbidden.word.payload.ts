import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ForbiddenWordPayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  forbiddenContents: string;
}
