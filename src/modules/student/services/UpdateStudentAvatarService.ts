import { injectable, inject } from 'tsyringe';

import Student from '../infra/typeorm/entities/Student';

import IStudentRepository from '../repositories/IStudentRepository';
import IStorageProvider from '@shared/container/providers/storageProvider/models/IStorageProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  categoryImage: string;
  avatarFilename: string;
}

@injectable()
class UpdateStudentAvatarService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    id,
    categoryImage,
    avatarFilename,
  }: IRequest): Promise<Student> {
    const student = await this.studentRepository.findById(id);

    if (!student) {
      throw new AppError('Aluno(a) não existe.', 404);
    }

    if (student.avatar) {
      this.storageProvider.deleteFile({ categoryImage, file: student.avatar });
    }

    const fileName = await this.storageProvider.saveFile({
      categoryImage,
      file: avatarFilename,
    });

    student.avatar = fileName;
    this.studentRepository.save(student);

    return student;
  }
}

export default UpdateStudentAvatarService;
