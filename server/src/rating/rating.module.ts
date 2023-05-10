import { MovieModule } from './../movie/movie.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';

import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { MovieModel } from './../movie/model/movie.model';
import { RatingModel } from './models/rating.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: RatingModel,
        schemaOptions: {
          collection: 'Rating',
        },
      },
    ]),
    MovieModule,
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
