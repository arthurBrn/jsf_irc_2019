import { User } from './User';
import { Channels } from './Channels';

export class Message {
  content: string;
  user: User;
  room: Channels;
}
