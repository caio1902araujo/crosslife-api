import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import uploadConfig from '@config/upload';

@Entity('student')
class Student{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  telephone: string

  @Column()
  cpf:string

  @Column()
  username: string

  @Column()
  @Exclude()
  password: string

  @Column()
  avatar: string

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) return null;
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 'firebase':
        return `https://storage.googleapis.com/${process.env.BUCKET}/students/${this.avatar}`
      default:
        return null;
    }
  }
}

export default Student
