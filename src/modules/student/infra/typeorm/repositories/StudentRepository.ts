import { getRepository, Repository, Like, ILike } from 'typeorm';

import Student from '../entities/Student';

import IStudentRepository from '@modules/student/repositories/IStudentRepository';
import ICreateStudentDTO from '@modules/student/dtos/ICreateStudentDTO';
import IFindAllStudentDTO from '@modules/student/dtos/IFindAllStudentDTO';

class StudentRepository implements IStudentRepository{
	private ormRepository: Repository<Student>;

	constructor(){
		this.ormRepository = getRepository(Student);
	}

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findAllStudents({name='', username='', cpf='', order='DESC', limit=10, offset=0}: IFindAllStudentDTO): Promise<Student[]> {
    const authors = this.ormRepository.find({
      where: {
        name: ILike('%' + name + '%'),
        username: ILike('%' + username + '%'),
        cpf: ILike('%' + cpf + '%'),
      },
      order: { name: order },
      take: limit,
      skip: offset,
    });

    return authors;
  }

	public async findById(id: string): Promise<Student | undefined> {
		const findStudent = await this.ormRepository.findOne({
			where: { id },
		});

		return findStudent;
	}

  public async findByUsername(username: string): Promise<Student | undefined> {
		const findStudent = await this.ormRepository.findOne({
			where: { username },
		});

		return findStudent;
	}

  public async findAllSimilarUsernames(username: string): Promise<Student[]> {
    //regex para limpar string de caracteres especiais
    const usernameClean = username.replace(/[^a-z0-9]/gi,'');

    const findStudents = await this.ormRepository.find({
			username: Like(`${usernameClean}%`),
		});

    return findStudents;
  }

  public async findByEmail(email: string): Promise<Student | undefined> {
		const findStudent = await this.ormRepository.findOne({
			where: { email },
		});


		return findStudent;
	}

  public async findByCPF(cpf: string): Promise<Student | undefined> {
		const findStudent = await this.ormRepository.findOne({
			where: { cpf },
		});

		return findStudent;
	}

  public async create(studentData: ICreateStudentDTO): Promise<Student>{
    const student = this.ormRepository.create(studentData);

    await this.ormRepository.save(student);

    return student
  }

  public async save(student: Student): Promise<Student>{
    return await this.ormRepository.save(student);
  }
}

export default StudentRepository;