import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthConfig } from '../config/interfaces/auth.config';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserService } from '../users/users.service';
import { LoginDto, UserResponseDto } from './dto';
import { JwtPayload } from './strategies/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const user = await this.userService.createUser(createUserDto);

      const payload = {
        email: user.email,
        id: user.id,
        role: user.role,
      } as JwtPayload;

      const { token, refreshToken } = await this.generateToken(payload);
      return {
        access_token: token,
        refresh_token: refreshToken,
        ...user,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(loginDto: LoginDto): Promise<UserResponseDto> {
    try {
      const user = await this.userService.findByEmailWithPassword(loginDto.email);
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
        email: user.email,
        id: user.id,
        role: user.role,
      } as JwtPayload;

      delete user.password_hash;

      const { token, refreshToken } = await this.generateToken(payload);
      return {
        access_token: token,
        refresh_token: refreshToken,
        ...user,
      };
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userService.findById(payload.id);
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const newAccessToken = this.jwtService.sign({
        email: user.email,
        id: user.id,
        role: user.role,
      });
      return { access_token: newAccessToken };
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
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
