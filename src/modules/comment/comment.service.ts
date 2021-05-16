import { Like } from './../like/like.entity';
import { CommentUpdatePayload } from './payload/comment.update.payload';
import { CommentPayload } from './payload/comment.payload';
import * as crypto from 'crypto';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment, CommentFillableFields } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async getList(){
    // return await this.commentRepository.find();
    let test = await this.commentRepository
      .createQueryBuilder('comment')
      .select('comment.id','id')
      .addSelect('comment.contents','contents')
      .addSelect('comment.createDate','createDate')
      .addSelect('(select count(`like`.`id`) from `like` as `like` where `like`.`commentIdx` = comment.id and `like`.`type`="LIKE")', 'like')
      .addSelect('(select count(`like`.`id`) from `like` as `like` where `like`.`commentIdx` = comment.id and `like`.`type`="HATE")', 'hate')
      // .addSelect('cast(IFNULL(COUNT(like.id),0) as unsigned)','like')
      // .addSelect('cast(IFNULL(COUNT(hate.id),0) as unsigned)','hate')
      // .leftJoin(Like,"like","comment.id = like.commentIdx")
      // .leftJoin(Like,"hate","comment.id = hate.commentIdx")
      .getRawMany();

    return test;
      // .innerJoin(Submission, "sub", "asses.submission_id = sub.id")
    
  }

  async register(id:number,payload:CommentPayload){
    let entity= new Comment;
    entity.contents=payload.content;
    entity.createUser=id;
    return await this.commentRepository.save(this.commentRepository.create(entity));
  }

  async update(userId:number,payload:CommentUpdatePayload):Promise<void>{
    await this.commentRepository
    .update({id:payload.id,createUser:userId}
      ,{contents:payload.content});
  }

  async delete(userId:number,idx:number):Promise<void>{
    await this.commentRepository.delete({id:idx,createUser:userId});
  }

}
