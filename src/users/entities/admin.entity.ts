import { ChildEntity, Entity } from 'typeorm';
import { User } from './user.entity';

@ChildEntity()
export class Admin extends User {
  //  No tenemos propiedades por ahora
}
