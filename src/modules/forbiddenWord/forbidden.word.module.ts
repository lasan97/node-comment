import { ForbiddenWordController } from './forbidden.word.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForbiddenWord } from './forbidden.word.entity';
import { ForbiddenWordService } from './forbidden.word.service';

@Module({
  imports: [TypeOrmModule.forFeature([ForbiddenWord])],
  exports: [ForbiddenWordService],
  providers: [ForbiddenWordService],
})
export class ForbiddenWordModule {}
