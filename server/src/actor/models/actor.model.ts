import { prop } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface Actor extends Base {}

export class ActorModel {
  @prop()
  name: string;

  @prop({ unique: true })
  slug: string;

  @prop()
  photo: string;
}
