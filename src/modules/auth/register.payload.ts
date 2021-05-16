import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterPayload {
  @ApiProperty({
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  nickName: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
