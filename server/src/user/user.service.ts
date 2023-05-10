import { Injectable, NotFoundException, Type } from '@nestjs/common';
import { genSalt, hash } from 'bcryptjs';

import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';

import { UpdateUserDto } from './dto/user-update.dto';
import { UserModel } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {}

  async updateProfile(_id: string, dto: UpdateUserDto) {
    const user = await this.byId(_id);
    const isSameUser = await this.UserModel.findOne({ email: dto.email });

    if (isSameUser && String(_id) !== String(isSameUser._id))
      throw new NotFoundException('Email busy');

    if (dto.password) {
      const salt = await genSalt(10);

      user.password = await hash(dto.password, salt);
    }
    user.email = dto.email;

    if (dto.isAdmin || dto.isAdmin === false) user.isAdmin = dto.isAdmin;

    await user.save();

    return;
  }

  async gatAll(searchTerm?: string) {
    let options = {};

    if (searchTerm) {
      options = {
        $or: [
          {
            email: new RegExp(searchTerm, 'i'),
          },
        ],
      };
    }

    return this.UserModel.find(options)
      .select('-password -updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .exec();
  }

  async toggleFavorite(movieId: Types.ObjectId, user: UserModel) {
    const { _id, favorites } = user;

    await this.UserModel.findByIdAndUpdate(_id, {
      favorites: favorites.includes(movieId)
        ? favorites.filter((id) => String(id) !== String(movieId))
        : [...favorites, movieId],
    });
  }

  async getFavorite(_id: Types.ObjectId) {
    return this.UserModel.findById(_id, 'favorites')
      .populate({
        path: 'favorites',
        populate: {
          path: 'genres',
        },
      })
      .exec()
      .then((data) => data.favorites);
  }

  /* Admin place*/

  async byId(_id: string) {
    const user = await this.UserModel.findById(_id).exec();

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async getCount() {
    return this.UserModel.find().count().exec();
  }

  async delete(id: string) {
    return this.UserModel.findByIdAndDelete(id).exec();
  }
}
