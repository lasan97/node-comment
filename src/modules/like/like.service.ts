import { LikePayload } from './payload/like.payload';
import * as crypto from 'crypto';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Like, LikeFillableFields, Type } from './like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async commentLikeOrHate(userId:number,payload:LikePayload,type:Type){
    const check = await this.likeRepository.findOne({where:{userId:userId,commentIdx:payload.commentId,type:type}});
    if(check){
      await this.likeRepository.delete({userId:userId,commentIdx:payload.commentId});
      return "Cancel";
    }else{
      let entity ={
        userId:userId,
        type:type,
        commentIdx:payload.commentId
      }
      await this.likeRepository.save(this.likeRepository.create(entity));
      return type.toString();
    }
  }

}
