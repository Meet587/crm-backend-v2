import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserRepositoryInterface } from '../interfaces/user.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class UserRepository
  extends BaseAbstractRepository<UserEntity>
  implements UserRepositoryInterface
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {
    super(usersRepository);
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.findByCondition({
      where: { email: email },
    });
  }
}
