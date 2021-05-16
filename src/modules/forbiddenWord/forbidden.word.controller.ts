import { ForbiddenWordPayload } from './payload/forbidden.word.payload';
import { RegisterPayload } from '../auth/register.payload';
import { ForbiddenWordService } from './forbidden.word.service';
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
import { Type } from './forbidden.word.entity';

@Controller('forbidden')
@ApiTags('forbidden')
export class ForbiddenWordController {
  constructor(
    private readonly forbiddenWordService: ForbiddenWordService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get()
  @ApiResponse({ status: 200, description: '금지어리스트 조회 성공' })
  @ApiResponse({ status: 401, description: '권한이 없습니다.' })
  async getList(){
    return await this.forbiddenWordService.getList();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post()
  @ApiResponse({ status: 200, description: '금지어 등록/취소 성공' })
  @ApiResponse({ status: 401, description: '권한이 없습니다.' })
  async commentLike(@Body() payLoad:ForbiddenWordPayload): Promise<any> {
    return await this.forbiddenWordService.register(payLoad);
  }


}
