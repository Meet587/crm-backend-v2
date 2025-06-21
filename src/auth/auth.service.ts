import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AuthConfig } from '../config/interfaces/auth.config';
import { UserEntity } from '../db/entities/user.entity';
import {
  LoginDto,
  LoginResponseDto,
  RegisterUserDto,
  UserResponseDto,
} from './dto';
import { JwtPayload } from './strategies/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: RegisterUserDto): Promise<UserResponseDto> {
    const existingUser = await this.usersRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });
    if (existingUser) {
      throw new BadRequestException('Username or email already exists');
    }
    const password_hash = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password_hash,
    });
    const user = await this.usersRepository.save(newUser);
    return this.mapUserToResponseDto(user);
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { username: loginDto.username },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password_hash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    } as JwtPayload;

    const { token, refreshToken } = await this.generateToken(payload);
    return {
      accessToken: token,
      refreshToken: refreshToken,
      user: this.mapUserToResponseDto(user),
    };
  }

  async getProfile(user: any): Promise<UserResponseDto> {
    const foundUser = await this.usersRepository.findOne({
      where: { id: user.sub },
    });
    if (!foundUser) {
      throw new UnauthorizedException('User not found');
    }
    return this.mapUserToResponseDto(foundUser);
  }

  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.usersRepository.findOne({
        where: { id: payload.sub },
      });
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const newAccessToken = this.jwtService.sign({
        username: user.username,
        sub: user.id,
        role: user.role,
      });
      return { access_token: newAccessToken };
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  private mapUserToResponseDto(user: UserEntity): UserResponseDto {
    const userResponseDto = new UserResponseDto();
    userResponseDto.id = user.id;
    userResponseDto.username = user.username;
    userResponseDto.email = user.email;
    userResponseDto.role = user.role;
    userResponseDto.first_name = user.first_name;
    userResponseDto.last_name = user.last_name;
    userResponseDto.phone = user.phone;
    userResponseDto.created_at = user.created_at;
    userResponseDto.updated_at = user.updated_at;
    return userResponseDto;
  }

  async generateToken(payload: JwtPayload): Promise<Record<string, string>> {
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<AuthConfig>(
          'environment.authConfig',
        ).jwtSecret,
        expiresIn: this.configService.getOrThrow<AuthConfig>(
          'environment.authConfig',
        ).expiresIn,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<AuthConfig>(
          'environment.authConfig',
        ).jwtSecret,
        expiresIn: this.configService.getOrThrow<AuthConfig>(
          'environment.authConfig',
        ).RefreshExpiresIn,
      }),
    ]);

    return {
      token,
      refreshToken,
    };
  }
}
