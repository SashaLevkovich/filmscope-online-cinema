import { RefreshTokenDto } from './dto/refreshToken.dto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

import { hash, genSalt, compare } from 'bcryptjs';

import { UserModel } from '../user/models/user.model';

import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
    private readonly JwtService: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    const tokens = await this.issueTokenPair(String(user._id));

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async getNewTokens({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken) throw new UnauthorizedException('Войдите пожалуйста!');

    const result = await this.JwtService.verifyAsync(refreshToken);

    if (!result) throw new UnauthorizedException('Неверный токен или срок его действия истек!');

    const user = await this.UserModel.findById(result._id);

    const tokens = await this.issueTokenPair(String(user._id));

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.UserModel.findOne({ email: dto.email });

    if (oldUser)
      throw new BadRequestException(
        'Такой пользователь уже существует!',
      );

    const salt = await genSalt(10);
    const hashPassword = await hash(dto.password, salt);

    const newUser = new this.UserModel({
      ...dto,
      password: hashPassword,
    });

    const user = await newUser.save();

    const tokens = await this.issueTokenPair(String(user._id));

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async validateUser(dto: AuthDto): Promise<UserModel> {
    const user = await this.UserModel.findOne({ email: dto.email });

    if (!user) throw new UnauthorizedException('Пользователь не найден!');

    const isValidPassword = await compare(dto.password, user.password);

    if (!isValidPassword) throw new UnauthorizedException('Неверный пароль!');

    return user;
  }

  async issueTokenPair(userId: string) {
    const data = { _id: userId };

    const refreshToken = await this.JwtService.signAsync(data, {
      expiresIn: '15d',
    });

    const accessToken = await this.JwtService.signAsync(data, {
      expiresIn: '1h',
    });

    return {
      refreshToken,
      accessToken,
    };
  }

  returnUserFields(user: UserModel) {
    return {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
  }
}
