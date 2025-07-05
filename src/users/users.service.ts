import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepositoryInterface } from '../db/interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('userRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const isExist = await this.userRepository.findByEmail(
        createUserDto.email,
      );
      if (isExist) {
        throw new ConflictException('user already exist with this email.');
      }
      const hashPassword = await bcrypt.hash(createUserDto.password_hash, 12);
      const newUser = await this.userRepository.save({
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
        email: createUserDto.email,
        password_hash: hashPassword,
        role: createUserDto.role,
        phone: createUserDto.phone,
      });
      const { password_hash, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: string) {
    return this.userRepository.findByCondition({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
