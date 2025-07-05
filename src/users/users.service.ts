import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import * as bcrypt from 'bcryptjs';
import { Request } from 'express';
import { UserEntity } from '../db/entities/user.entity';
import { UserRepositoryInterface } from '../db/interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @Inject('userRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<UserEntity, 'password_hash'>> {
    try {
      const isExist = await this.userRepository.findByEmail(
        createUserDto.email,
      );
      if (isExist) {
        throw new ConflictException('user already exist with this email.');
      }
      const hashPassword = await bcrypt.hash(createUserDto.password, 12);
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

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new NotFoundException('user not found with this email.');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneById(id);
      if (!user) {
        throw new NotFoundException('user not found with this id.');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.findAll({
        select: [
          'created_at',
          'email',
          'id',
          'first_name',
          'last_name',
          'phone',
          'role',
          'updated_at',
        ],
      });
    } catch (error) {
      throw error;
    }
  }
}
