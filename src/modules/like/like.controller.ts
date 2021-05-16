import { LikePayload } from './payload/like.payload';
import { RegisterPayload } from '../auth/register.payload';
import { LikeService } from './like.service';
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
import { Type } from './like.entity';

@Controller('likes')
@ApiTags('likes')
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post()
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async commentLike(@Request() request,@Body() payLoad:LikePayload): Promise<any> {
    return await this.likeService.commentLikeOrHate(request.user.id,payLoad,Type.LIKE);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('hate')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async commentHate(@Request() request,@Body() payLoad:LikePayload): Promise<any> {
    return await this.likeService.commentLikeOrHate(request.user.id,payLoad,Type.HATE);
  }
}
