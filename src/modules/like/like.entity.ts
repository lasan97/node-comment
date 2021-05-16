import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export enum Type {
  LIKE = "LIKE",
  HATE = "HATE"
}

@Entity({
  name: 'like',
})
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable:false })
  userId: number;

  @Column({
    type: 'enum',
    enum: Type,
    name: 'TYPE',
    comment: '좋아요/싫어요',
  })
  type: Type;

  @Column({nullable: false })
  commentIdx: number;

}

export class LikeFillableFields {
  id: number;
  userId: number;
  type:Type;
  commentIdx: number;
}
