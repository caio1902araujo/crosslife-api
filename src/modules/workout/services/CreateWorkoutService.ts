import { injectable, inject } from 'tsyringe';

import Workout from '../infra/typeorm/entities/Workout';

import IWorkoutRepository from '../repositories/IWorkoutRepository';
import ICreateWorkoutDTO from '../dtos/ICreateWorkoutDTO';
import { getHours, isBefore } from 'date-fns';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateWorkoutService {
  constructor(
    @inject('WorkoutRepository')
    private workoutRepository: IWorkoutRepository,
  ) {}

  public async execute({
    title,
    description,
    date,
    videoUrl,
    trainerId,
  }: ICreateWorkoutDTO): Promise<Workout> {
    if (isBefore(date, Date.now())) {
      throw new AppError(
        'Você não pode escolher uma data que já passou para um treino.',
        400,
      );
    }
    console.log(date.getHours());
    if (getHours(date) < 8 || getHours(date) >= 18) {
      throw new AppError(
        'Você só pode agendar treinos entre as 8hrs até as 18hrs',
      );
    }

    const workout = this.workoutRepository.create({
      title,
      description,
      date,
      videoUrl,
      trainerId,
    });

    return workout;
  }
}

export default CreateWorkoutService;
