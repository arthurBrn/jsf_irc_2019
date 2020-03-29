import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  private socket = io('http://localhost:8080');

  joinRoom(user, room) {
      this.socket.emit('join', {user: user, room: room});
  }
  newUserJoined() {
      let observable = new Observable<{ user: String, message: String }>((observer) => {
          this.socket.on('new-user', (data) => {
              observer.next(data);
          });
          return () => { this.socket.disconnect(); }
      });
      return observable;
  }
  leaveRoom(room) {
      this.socket.emit('leave', room);
  }
  userLeftRoom() {
      let observable = new Observable<{ user: String, message: String }>((observer) => {
            this.socket.on('leave-user', (data) => {
                observer.next(data);
            });
          return () => { this.socket.disconnect(); }
      });
      return observable;
  }
  sendMessage(message, room) {
      this.socket.emit('message', { message, room});
  }
  receivedMessage() {
      let observable = new Observable<{ user: String, message: String }>((observer) => {
          this.socket.on('receivedMessage', (data) => {
              observer.next(data);
          });
          return () => { this.socket.disconnect(); }
      });
      return observable;
  }
}
