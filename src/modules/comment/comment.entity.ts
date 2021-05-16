import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({
  name: 'comment',
})
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1000 })
  contents: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'CREATE_DATE',
    comment: '생성일자',
  })
  createDate: Date;

  @Column({nullable: true})
  createUser: number;

}

export class CommentFillableFields {
  email: string;
  Contents: string;
  createDate: Date;
  createUser: number;
}
