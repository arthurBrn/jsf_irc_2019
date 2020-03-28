import { Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import { ChatService } from './services/chat.service';
import { ApiService } from './services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from "@angular/forms";
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChatService]
})
export class AppComponent implements OnInit{
  
  @ViewChild("messageInput") messageInput: ElementRef;
  joinState = true;
  user: String;
  message: String;
  messages: Array<{user: String, message: String}> = [];
  is_connected: boolean = false;
  rooms = [
   //'-- Choose a room --' ,
   'General',
   'Room 2' ,
   'Room 3' ,
   'Room 4' 
  ];
  connected_rooms = [];
  selectedRoom: String = 'General';
  roomForm: FormGroup;

  constructor(
      private _chatService: ChatService, 
      private _apiService: ApiService,
      private toastrService: ToastrService,
      private fb: FormBuilder) {
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

  ngOnInit() {
    this.roomForm = this.fb.group({
        roomControl: [this.rooms[0]]
    });
    const message = {
        content: 'first test from angular',
        channelId: '1',
        userId: '1',
        pseudo: 'Jean lpb'
    }
    this._apiService.sendMessage(message).subscribe(data => {
        console.log(data);
    });
  }
  onChange(value) {
      this.selectedRoom = value;
      this.joinState = (this.connected_rooms.indexOf(value) >= 0) ? false : true;
  }

  join() {
    if (this.user) {
        if (this.user.match(/^[a-zA-Z0-9_.-]*$/)) {
            this.connected_rooms.push(this.selectedRoom);
            console.log(this.connected_rooms);
            this.joinState = false;
            this.messages.push({ user: 'You', message:'joined the room' });
            this.is_connected = true;
            this._chatService.joinRoom(this.user, this.selectedRoom);
            this.messageInput.nativeElement.focus()
        } else {
            this.toastrService.warning('Please provide valide user name with letter, numbers, comma, point or dash');
        }
        
    } else {
        this.toastrService.warning('You need a username to join');
    }
  }
  leave() {
    const index = this.connected_rooms.indexOf(this.selectedRoom);
    this.connected_rooms.splice(index);
    this.joinState = true;
    this._chatService.leaveRoom(this.selectedRoom);
    $('.displayMsg').empty();
  }
  sendMessage() {
      if (this.is_connected) {
        if (this.message) {
          this._chatService.sendMessage(this.message, this.selectedRoom);
          this.message = '';
        }
      } else {
          this.toastrService.warning('You need a username and select a room to send messages');
      }
  }
}

