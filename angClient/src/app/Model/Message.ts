import { User } from './User';
import { Room } from './Room';

export class Message {
  content: string;
  user: User;
  room: Room;
}
