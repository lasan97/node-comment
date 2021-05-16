import { ForbiddenWordPayload } from './payload/forbidden.word.payload';
import * as crypto from 'crypto';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ForbiddenWord, ForbiddenWordFillableFields, Type } from './forbidden.word.entity';

@Injectable()
export class ForbiddenWordService {
  constructor(
    @InjectRepository(ForbiddenWord)
    private readonly forbiddenWordRepository: Repository<ForbiddenWord>,
  ) {}

  async getList(){
    return await this.forbiddenWordRepository.find();
  }

  async register(payload:ForbiddenWordPayload){
    const check = await this.forbiddenWordRepository.findOne({where:{contents:payload.forbiddenContents}});
    if(check){
      await this.forbiddenWordRepository.delete({contents:payload.forbiddenContents});
      return "Delete";
    }else{
      let entity ={
        contents:payload.forbiddenContents
      }
      await this.forbiddenWordRepository.save(this.forbiddenWordRepository.create(entity));
      return payload.forbiddenContents;
    }
  }

}
