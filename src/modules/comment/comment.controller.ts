import { CommentUpdatePayload } from './payload/comment.update.payload';
import { CommentPayload } from './payload/comment.payload';
import { RegisterPayload } from './../auth/register.payload';
import { CommentService } from './comment.service';
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
import { CommentDeletePayload } from './payload/comment.delete.payload';

@Controller('comments')
@ApiTags('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('list')
  @ApiResponse({ status: 200, description: '댓글리스트 조회 성공' })
  @ApiResponse({ status: 401, description: '권한이 없습니다.' })
  async getList(): Promise<any> {
    return await this.commentService.getList();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('')
  @ApiResponse({ status: 200, description: '댓글등록 성공' })
  @ApiResponse({ status: 401, description: '권한이 없습니다.' })
  async register(@Request() request,@Body() payload:CommentPayload): Promise<any> {
    await this.commentService.register(request.user.id,payload);
    return request.user;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('update')
  @ApiResponse({ status: 200, description: '댓글수정 성공' })
  @ApiResponse({ status: 401, description: '권한이 없습니다.' })
  async update(@Request() request,@Body() payload:CommentUpdatePayload): Promise<any> {
    await this.commentService.update(request.user.id,payload);
    return request.user;
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('delete')
  @ApiResponse({ status: 200, description: '댓글삭제 성공' })
  @ApiResponse({ status: 401, description: '권한이 없습니다.' })
  async delete(@Request() request,@Body() payload:CommentDeletePayload): Promise<any> {
    await this.commentService.delete(request.user.id,payload.commentId);
    return "Success"
  }

}
