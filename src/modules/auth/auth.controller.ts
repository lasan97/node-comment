import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, LoginPayload, RegisterPayload } from './';
import { UsersService } from './../user';

@Controller('api/auth')
@ApiTags('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  @ApiResponse({ status: 201, description: '로그인 성공' })
  @ApiResponse({ status: 400, description: '로그인 실패' })
  @ApiResponse({ status: 401, description: '권한이 없습니다.' })
  async login(@Body() payload: LoginPayload): Promise<any> {
    const user = await this.authService.validateUser(payload);
    return await this.authService.createToken(user);
  }

  @Post('register')
  @ApiResponse({ status: 201, description: '계정등록 성공' })
  @ApiResponse({ status: 400, description: '데이터가 누락되었습니다.' })
  async register(@Body() payload: RegisterPayload): Promise<any> {
    const user = await this.userService.create(payload);
    return await this.authService.createToken(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('me')
  @ApiResponse({ status: 200, description: '정보조회 성공' })
  @ApiResponse({ status: 401, description: '권한이 없습니다.' })
  async getLoggedInUser(@Request() request): Promise<any> {
    return request.user;
  }
}
