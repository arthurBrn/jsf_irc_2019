import { Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import { ChatService } from './services/chat.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChatService]
})
export class AppComponent implements OnInit{

  selectionnedChannel;
  userPseudo;
  isAuth: boolean = false;
  userId: String;
  leaveChannelId;

  constructor(
    private _chatService: ChatService,
    private _apiService: ApiService,
    ) {
    // this._chatService.userRenamed()
    //   .subscribe((data) => this.messages.push(data));
  }

  ngOnInit() {
    if (localStorage.getItem('login')) {
        this.isAuth = true;
    }

  }

  onChangeChannel(selectionnedChannel) {
    this.selectionnedChannel = selectionnedChannel;
  }

  onChangePseudo(userPseudo) {
    this.userPseudo = userPseudo;
  }

  onLeaveChannel(channel) {
    this.leaveChannelId = channel;
  }

//   onChange(value) {
//     this.selectedRoom = value;
//     this.joinState = (this.connected_rooms.indexOf(value) >= 0) ? false : true;
//     this._apiService.getMessages(value).subscribe((datas) => {
//       //   $('.displayMsg').empty();
//       this.messages = [];
//       for (const line of datas as any) {
//         this.messages.push({ user: line.pseudo, message: line.content })
//       }
//     })
//   }

//   join() {
//     if (this.user) {
//       if (this.user.match(/^[a-zA-Z0-9_.-]*$/)) {
//         this.pseudo = this.user;
//         this.connected_rooms.push(this.selectedRoom);
//         this.joinState = false;
//         this.messages.push({ user: 'You', message:'joined the room' });
//         this._apiService.sendMessage({
//           'content': 'joined the room',
//           'channelId': this.selectedRoom,
//           'userId': this.userId,
//           'pseudo': this.user,
//           'date': new Date().toISOString()
//         }).subscribe();
//         this.is_connected = true;
//         // this._chatService.joinRoom(this.user, this.selectedRoom);
//         this.messageInput.nativeElement.focus()
//       } else {
//         this.toastrService.warning('Please provide valide user name with letter, numbers, comma, point or dash');
//       }

//     } else {
//       this.toastrService.warning('You need a username to join');
//     }
//   }
//   leave() {
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
//   }
//   sendMessage() {
//     if (this.is_connected) {
//       if (this.message) {
//         this._chatService.sendMessage(this.message, this.selectedRoom);
//         console.log(this.user);
//         const persistDatas = {
//           'content': this.message,
//           'channelId': this.selectedRoom,
//           'userId': this.userId,
//           'pseudo': this.user,
//           'date': new Date().toISOString()
//         }
//         console.log(persistDatas);
//         this._apiService.sendMessage(persistDatas).subscribe((data) => console.log(data));
//         this.message = '';
//       }
//     } else {
//       this.toastrService.warning('You need a username and select a room to send messages');
//     }
//   }

//   renaming() {
//     this.oldName = this.user;
//     this.is_renaming = true;
//     this.is_connected = false;
//   }

//   rename() {
//     if (this.user) {
//       if (this.user.match(/^[a-z" "A-Z0-9_.-]*$/)) {
//         const datas = {
//           oldName: this.oldName,
//           newName: this.user,
//           room: this.selectedRoom
//         }
//         this._chatService.rename(datas);
//         for (const room of this.connected_rooms) {
//           const persistDatas = {
//             'content': 'renamed to ' + this.user,
//             'channelId': room,
//             'userId': this.userId,
//             'pseudo': this.oldName,
//             'date': new Date().toISOString()
//           };
//           this._apiService.sendMessage(persistDatas).subscribe((data) => console.log(data));
//         }

//         this.oldName = this.newName;
//       } else {
//         this.toastrService.warning('Please provide valide user name with letter, numbers, comma, point or dash');
//       }
//     }
//   }

  onLoginEvent(event) {
    console.log('LOGIN EVENT : ' + event);
    this.userId = event;
    this.isAuth = true;
  }

  onRegisterEvent(event) {
    console.log('REGISTER EVENT : ' + event);
    this.userId = event;
    localStorage.setItem('login', event);
    this.isAuth =true;
  }

  onGeneralDisconnectEvent(event) {
    this.isAuth = false;
  }
}

