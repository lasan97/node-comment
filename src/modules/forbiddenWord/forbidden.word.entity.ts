import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export enum Type {
  LIKE = "LIKE",
  HATE = "HATE"
}

@Entity({
  name: 'forbiddenWord',
})
export class ForbiddenWord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable:false })
  contents: string;
}

export class ForbiddenWordFillableFields {
  id: number;
  contents:string;
}
