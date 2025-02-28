import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import User from '@entities/User';

@Entity('shortenedUrls')
class ShortenedUrls {
  @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
  id: number;

  @Column({
    type: 'character varying',
    name: 'originalUrl',
    length: 4096,
    unique: true,
  })
  originalUrl: string;

  @Column({
    type: 'character varying',
    name: 'shortenedUrl',
    length: 1024,
    unique: true,
  })
  shortenedUrl: string;

  @Column({ type: 'timestamp', name: 'dateDeletion', nullable: true })
  dateDeletion: Date;

  @Column({ type: 'smallint', name: 'clickCount', nullable: true })
  clickCount: number;

  @Exclude()
  @Column({ type: 'smallint', name: 'user' })
  user: number;

  @ManyToOne(() => User, (user) => user.shortenedUrls)
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user_: User;

  @Exclude()
  @Column({ type: 'boolean', name: 'enabled', default: true })
  enabled: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp', name: 'updatedAt' })
  updatedAt: Date;
}

export default ShortenedUrls;
