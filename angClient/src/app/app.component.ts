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
  rooms = [];
  connected_rooms = [];
  selectedRoom: String;
  roomForm: FormGroup;
  isAuth: boolean = false;
  regEmail: string;
  regPassword: string;
  regFirstName: string;
  regLastName: string;
  loginEmail: string;
  loginPassword: string;
  userId: String;

  constructor(
      private _chatService: ChatService, 
      private _apiService: ApiService,
      private toastrService: ToastrService,
      private fb: FormBuilder) {
      this._chatService.newUserJoined()
      .subscribe((data) => {
          this.messages.push(data);
          });

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
    this._apiService.getChannels().subscribe((data) => {
        let parsedDatas = data as any; 
        for (const line of parsedDatas) {
           this.rooms.push(line);
        }
        this.roomForm = this.fb.group({
            roomControl: [this.rooms[0]]
        });
        this.selectedRoom = parsedDatas[0].name;
    });

    // this.loginEmail = 'maxime@mail.com';
    // this.loginPassword = 'test';
    // this.login();
  }
  onChange(value) {
      this.selectedRoom = value;
      this.joinState = (this.connected_rooms.indexOf(value) >= 0) ? false : true;
      this._apiService.getMessages(value).subscribe((datas) => {
        //   $('.displayMsg').empty();
        this.messages = [];
        for (const line of datas as any) {
            this.messages.push({ user: line.pseudo, message: line.content })
        }
      })
  }

  join() {
    if (this.user) {
        if (this.user.match(/^[a-zA-Z0-9_.-]*$/)) {
            this.connected_rooms.push(this.selectedRoom);
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
  }
  sendMessage() {
      if (this.is_connected) {
        if (this.message) {
          this._chatService.sendMessage(this.message, this.selectedRoom);
          const persistDatas = {
            'content': this.message,
            'channelId': this.selectedRoom,
            'userId': this.userId,
            'pseudo': this.user,
            'date': new Date().toISOString()
          }
          console.log(persistDatas);
          this._apiService.sendMessage(persistDatas).subscribe((data) => console.log(data));
          this.message = '';
        }
      } else {
          this.toastrService.warning('You need a username and select a room to send messages');
      }
  }

  login() {
    if (this.loginEmail && this.loginPassword) {
        this._apiService.login(this.loginEmail, this.loginPassword).subscribe((data ) => {
            var parsedDatas = data as any;
            if(parsedDatas.code == 200) {
                this.userId = parsedDatas.userId;
                this.isAuth = true;
            } else {
                this.toastrService.warning(parsedDatas.success);
            }
        });    
    } else {
        this.toastrService.warning('Email or password can\'t be empty');
    }
  }

  register() {
    if (this.regEmail && this.regPassword && this.regFirstName && this.regLastName) {
        const today = new Date().toISOString();
        const user = {
            first_name: this.regFirstName,
            last_name: this.regLastName,
            email: this.regEmail,
            password: this.regPassword,
            createdAt: today
        }
        this._apiService.register(user).subscribe((data) => {
        var parsedDatas = data as any;
        if(parsedDatas.code == 200) {
            this.loginEmail = this.regEmail;
            this.loginPassword = this.regPassword;
            this.login();
        } else {
            this.toastrService.warning(parsedDatas.success);
        }
        });
    } else {
        this.toastrService.warning('Please fill all fields to register');
    }
  }
}

