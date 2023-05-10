import {TypegooseModule} from 'nestjs-typegoose';
import {Module} from '@nestjs/common';

import {ActorsService} from './actors.service';
import {ActorModel} from './models/actor.model';
import {ActorsController} from './actors.controller';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ActorModel,
        schemaOptions: {
          collection: 'Actor',
        },
      },
    ]),
  ],
  controllers: [ActorsController],
  providers: [ActorsService],
})
export class ActorsModule {}
