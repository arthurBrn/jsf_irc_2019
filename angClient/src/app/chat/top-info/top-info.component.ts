import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-top-info',
  templateUrl: './top-info.component.html',
  styleUrls: ['./top-info.component.css']
})
export class TopInfoComponent implements OnInit {

  constructor(private _apiService: ApiService) { }

  @Input() channelId;
  channelName;
  showTopBar = false;
  nbChannelUsers;

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
      if (changes.channelId.currentValue) {
        this._apiService.getChannelName(changes.channelId.currentValue).subscribe((datas) => {
          this.channelName = datas[0].name;
        });
        this._apiService.countUsers(changes.channelId.currentValue).subscribe((datas) => {
          this.nbChannelUsers = datas[0].nb;
        });
        this.showTopBar = true;
      }
  }

  leaveChannel() {
//     this.is_connected = (this.connected_rooms.length == 0) ?  false : true;
//     const index = this.connected_rooms.indexOf(this.selectedRoom);
//     this.connected_rooms.splice(index);
//     this.joinState = true;
//     this._chatService.leaveRoom(this.selectedRoom);
//     this._apiService.sendMessage({
//       'content': 'has left the room',
//       'channelId': this.selectedRoom,
//       'userId': this.userId,
//       'pseudo': this.user,
//       'date': new Date().toISOString()
//     }).subscribe();
  }
}
