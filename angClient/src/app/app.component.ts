import { Component, ViewChild, ElementRef} from '@angular/core';
import { ChatService } from './chat.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChatService]
})
export class AppComponent {
  
  @ViewChild("messageInput") messageInput: ElementRef;
  user: String;
  message: String;
  messages: Array<{user: String, message: String}> = [];
  is_connected: boolean = false;

  constructor(private _chatService: ChatService, private toastrService: ToastrService) {
      this._chatService.newUserJoined()
      .subscribe((data) => this.messages.push(data));

      this._chatService.userLeftRoom()
      .subscribe((data) => {
        if (data.user) {
          this.messages.push(data);
        }
      });

      this._chatService.receivedMessage()
      .subscribe((data) => this.messages.push(data));
  }
  join() {
    if (this.user) {
        if (this.user.match(/^[a-zA-Z0-9_.-]*$/)) {
            this.messages.push({ user: 'You', message:'joined the room' });
            this.is_connected = true;
            this._chatService.joinRoom(this.user);
            this.messageInput.nativeElement.focus()
        } else {
            this.toastrService.warning('Please provide valide user name with letter, numbers, comma, point or dash');
        }
        
    } else {
        this.toastrService.warning('You need a username to join');
    }
  }
  leave() {
      this._chatService.leaveRoom();
  }
  sendMessage() {
      
      if (this.is_connected) {
        if (this.message) {
          this._chatService.sendMessage(this.message);
          this.message = '';
        }
      } else {
          this.toastrService.warning('You need a username and select a room to send messages');
      }
  }
}

