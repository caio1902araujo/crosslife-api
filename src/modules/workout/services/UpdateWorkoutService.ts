import { inject, injectable } from 'tsyringe';

import Workout from '../infra/typeorm/entities/Workout';

import IWorkoutRepository from '../repositories/IWorkoutRepository';

import AppError from '@shared/errors/AppError';
import { getHours, isBefore, startOfHour } from 'date-fns';

interface IRequest {
  workoutId: string;
  title: string;
  description: string;
  date: Date;
  videoUrl: string;
  trainerId: string;
}

@injectable()
class UpdateWorkoutService {
  constructor(
    @inject('WorkoutRepository')
    private workoutRepository: IWorkoutRepository,
  ) {}

  public async execute({
    workoutId,
    title,
    description,
    date,
    videoUrl,
    trainerId,
  }: IRequest): Promise<Workout> {
    const workout = await this.workoutRepository.findById(workoutId);

    if (!workout) {
      throw new AppError('Treino não foi encontrado.', 404);
    }

    if (workout.trainerId !== trainerId) {
      throw new AppError(
        'Você não tem autorização para editar esse treino',
        403,
      );
    }

    if (workout.date !== date) {
      if (isBefore(date, Date.now())) {
        throw new AppError(
          'Você não pode escolher uma data que já passou para um treino.',
          400,
        );
      }

      if (getHours(date) < 8 || getHours(date) >= 18) {
        throw new AppError(
          'Você so agendar treinos entre as 8hrs até as 18hrs',
        );
      }
    }

    workout.title = title;
    workout.description = description;
    workout.date = date;
    workout.videoUrl = videoUrl;

    return await this.workoutRepository.save(workout);
  }
}

export default UpdateWorkoutService;
