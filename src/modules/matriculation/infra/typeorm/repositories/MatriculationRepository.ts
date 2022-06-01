import { getRepository, Repository } from 'typeorm';

import Matriculation from '../entities/Matriculation';

import IMatriculationRepository from '@modules/matriculation/repositories/IMatriculationRepository';
import ICreateMatriculationDTO from '@modules/matriculation/dtos/ICreateMatriculationDTO';
import IFindAllMatriculationsDTO from '@modules/matriculation/dtos/IFindAllMatriculationsDTO';

class MatriculationRepository implements IMatriculationRepository{
	private ormRepository: Repository<Matriculation>;

	constructor(){
		this.ormRepository = getRepository(Matriculation);
	}

  public async findAllMatriculations({ active,  type, orderCreatedAt, username, offset, limit}: IFindAllMatriculationsDTO): Promise<Matriculation[]> {

    let queryMatriculation = this.ormRepository.createQueryBuilder('matriculation')
    .leftJoinAndSelect("matriculation.student", "student")
    .where("student.username ILIKE :username", {username: `%${username}%`})
    .select(['matriculation.id, active', 'type', 'created_at', 'finished_at', 'username'])
    .orderBy('created_at', orderCreatedAt)
    .offset(offset)
    .limit(limit)

    if (type !== undefined){
      queryMatriculation = queryMatriculation.andWhere("type = :type", {type:`${type}`})
    }
    if (active !== undefined){
      queryMatriculation = queryMatriculation.andWhere("active = :active", {active: active})
    }

    const matriculations = await queryMatriculation.execute();

    return matriculations;
  }

  public async findById(id: string): Promise<Matriculation | undefined> {
		const findMatriculation = await this.ormRepository.findOne({
			where: { id },
		});

		return findMatriculation;
	}

  public async create(matriculationData: ICreateMatriculationDTO): Promise<Matriculation>{
    const matriculation = this.ormRepository.create(matriculationData);

    await this.ormRepository.save(matriculation);

    return matriculation
  }

  public async save(matriculation: Matriculation): Promise<Matriculation>{
    return await this.ormRepository.save(matriculation);
  }
}

export default MatriculationRepository;
