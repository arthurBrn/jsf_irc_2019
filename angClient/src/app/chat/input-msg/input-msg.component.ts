import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { ChatService } from '../../services/chat.service'
import { ApiService } from '../../services/api.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-input-msg',
  templateUrl: './input-msg.component.html',
  styleUrls: ['./input-msg.component.css']
})
export class InputMsgComponent implements OnInit {

  messageContent: String;

  @Input() isAuth;
  @Input() user;
  @Input() channelId;
  userInfo;
  isPseudoChanged = false;

  constructor(
    private _chatService: ChatService,
    private _apiService: ApiService,
    private _toastrService: ToastrService,
  ) { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChange) {
      for (let propName in changes) {
        let change = changes[propName];
        if (propName == 'user' && change.currentValue !== undefined) {
          this.user = {
            'id': localStorage.getItem('login'),
            'pseudo': change.currentValue.pseudo
          };
        }
      }
  }

  sendMessage() {
      if (this.isAuth && this.channelId) {
        if (this.messageContent) {
          this._chatService.sendMessage(this.messageContent, this.channelId);
          const message = {
            'content': this.messageContent,
            'channelId': this.channelId,
            'userId': this.user.id,
            'pseudo': this.user.pseudo,
            'date': new Date().toISOString()
          }
          this._apiService.sendMessage(message).subscribe();
          this.messageContent = '';
        }
      } else {
        this._toastrService.warning('You need to select a room to send messages');
      }
  }

}
