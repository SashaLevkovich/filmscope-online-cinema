import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

import { UserModel } from './../../user/models/user.model';
import { MovieModel } from './../../movie/model/movie.model';

export interface RatingModel extends Base {}

export class RatingModel extends TimeStamps {
  @prop({ ref: () => UserModel })
  userId: Ref<UserModel>;

  @prop({ ref: () => MovieModel })
  movieId: Ref<MovieModel>;

  @prop()
  value: number;
}
