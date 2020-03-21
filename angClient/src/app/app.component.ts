import { Component } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChatService]
})
export class AppComponent {
  
  user: String;
  message: String;
  messages: Array<{user: String, message: String}> = [];

  constructor(private _chatService: ChatService) {
      this._chatService.newUserJoined()
      .subscribe((data) => this.messages.push(data));

      this._chatService.userLeftRoom()
      .subscribe((data) => this.messages.push(data));

      this._chatService.receivedMessage()
      .subscribe((data) => this.messages.push(data));
  }
  join() {
      this._chatService.joinRoom(this.user);
  }
  leave() {
      this._chatService.leaveRoom();
  }
  sendMessage() {
      if (this.message) {
        this._chatService.sendMessage(this.message);
        this.message = '';
      }
  }
}

