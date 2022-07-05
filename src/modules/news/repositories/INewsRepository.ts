import News from '../infra/typeorm/entities/News';
import ICreateNewsDTO from '../dtos/ICreateNewsDTO';
import IFindAllNewsDTO from '../dtos/IFindAllNewsDTO';
import IFindAllNewsByUsernameAuhorDTO from '../dtos/IFindAllNewsByUsernameAuhorDTO';
import IFindAllNewsByIdAuhorDTO from '../dtos/IFindAllNewsByIdAuhorDTO';

interface INewsRepository {
  findAllNews(data: IFindAllNewsDTO): Promise<News[]>;
  findAllNewsByIdAuthor(data: IFindAllNewsByIdAuhorDTO): Promise<News[]>;
  findAllNewsByUsernameAuthor(
    data: IFindAllNewsByUsernameAuhorDTO,
  ): Promise<News[]>;
  findById(id: string): Promise<News | undefined>;
  findByTitle(id: string): Promise<News | undefined>;
  delete(id: string): Promise<void>;
  create(data: ICreateNewsDTO): Promise<News>;
  save(budget: News): Promise<News>;
}

export default INewsRepository;
