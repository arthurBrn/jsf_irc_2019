import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service'

@Component({
  selector: 'app-input-msg',
  templateUrl: './input-msg.component.html',
  styleUrls: ['./input-msg.component.css']
})
export class InputMsgComponent implements OnInit {

  messageContent: String;

  @Input() isAuth;
  @Input() user;

  constructor(private _chatService: ChatService) { }

  ngOnInit() {
  }

  sendMessage() {
    console.log(this.messageContent);
    console.log(this.user);
    this.messageContent = '';
    //   if (this.is_connected) {
    //     if (this.messageContent) {
    //       this._chatService.sendMessage(this.message, this.selectedRoom);
    //       console.log(this.user);
    //       const persistDatas = {
    //         'content': this.message,
    //         'channelId': this.selectedRoom,
    //         'userId': this.userId,
    //         'pseudo': this.user,
    //         'date': new Date().toISOString()
    //       }
    //       console.log(persistDatas);
    //       this._apiService.sendMessage(persistDatas).subscribe((data) => console.log(data));
    //       this.message = '';
    //     }
    //   } else {
    //       this.toastrService.warning('You need a username and select a room to send messages');
    //   }
  }

}
