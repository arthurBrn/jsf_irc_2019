import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { ChatService } from '../../services/chat.service'
import { UserChanelsComponent } from './../../sidebar/user-chanels/user-chanels.component'
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-top-info',
  templateUrl: './top-info.component.html',
  styleUrls: ['./top-info.component.css']
})
export class TopInfoComponent implements OnInit {

  constructor(
      private _apiService: ApiService, 
      private _chatService: ChatService,
      private modalService: BsModalService
      ) { }

  @Input() channelId;
  @Input() user;
  userInfo;
  channelName;
  showTopBar = false;
  nbChannelUsers;
  @Output() leaveChannelId = new EventEmitter();

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChange) {
    for (let propName in changes) {  
        let change = changes[propName];
        if (propName == 'channelId' && change.currentValue !== undefined) {
          this.showTopBar = true;
          let curVal  = JSON.stringify(change.currentValue);
          this._apiService.getChannelName(curVal).subscribe((datas) => {
            this.channelName = datas[0].name;
          });
          this._apiService.countUsers(curVal).subscribe((datas) => {
            this.nbChannelUsers = datas[0].nb;
          });
        }
      if (propName == 'user') {
        this.userInfo = JSON.stringify(change.currentValue);
      }
    }
  }

  leaveChannel() {
    this._chatService.leaveRoom(this.channelId);
    let promise = new Promise((resolve, reject) => {
      this._apiService.leaveChannel({ 'userId': this.user.id, 'channelId': this.channelId }).subscribe(() => resolve());
    });
    promise.then((result) => {
      this.leaveChannelId.emit({ 'id': this.channelId, 'name': this.channelName});
    }).catch((err) => {
      console.log(err);
    });
    this._apiService.sendMessage({
      'content': 'has left the room',
      'channelId': this.channelId,
      'userId': this.user.id,
      'pseudo': this.user.pseudo,
      'date': new Date().toISOString()
    }).subscribe();
    this.showTopBar = false;
  }
}
