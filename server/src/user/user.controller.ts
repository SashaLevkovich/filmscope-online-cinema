import {
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { Types } from 'mongoose';

import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { UpdateUserDto } from './dto/user-update.dto';
import { User } from './decorators/user.decorators';
import { Auth } from '../auth/decorators/auth.decorator';
import { UserService } from './user.service';
import { UserModel } from './models/user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@User('_id') _id: string) {
    return this.userService.byId(_id);
  }

  @UsePipes(new ValidationPipe())
  @Put('profile')
  @HttpCode(200)
  @Auth()
  async updateProfile(@User('_id') _id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateProfile(_id, dto);
  }

  @Get('profile/favorites')
  @Auth()
  async getFavorites(@User('_id') _id: Types.ObjectId) {
    return this.userService.getFavorite(_id);
  }

  @Put('profile/favorites')
  @HttpCode(200)
  @Auth()
  async toggleFavorites(
    @Body('movieId', IdValidationPipe) movieId: Types.ObjectId,
    @User() user: UserModel,
  ) {
    return this.userService.toggleFavorite(movieId, user);
  }

  @Get('count')
  @Auth('admin')
  async getCountUsers() {
    return this.userService.getCount();
  }

  @Get()
  @Auth('admin')
  async getUsers(@Query('searchTerm') searchTerm?: string) {
    return this.userService.gatAll(searchTerm);
  }

  @Get(':id')
  @Auth('admin')
  async getUser(@Param('id', IdValidationPipe) id: string) {
    return this.userService.byId(id);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async updateUser(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateProfile(id, dto);
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async deleteUser(@Param('id', IdValidationPipe) id: string) {
    return this.userService.delete(id);
  }
}
