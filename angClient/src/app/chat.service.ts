import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  private socket = io('http://localhost:8080');

  joinRoom(user) {
      this.socket.emit('join', user);
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
  leaveRoom() {
      this.socket.emit('leave');
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
  sendMessage(message) {
      this.socket.emit('message', message);
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