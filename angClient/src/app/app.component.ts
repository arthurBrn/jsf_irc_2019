import { Component, ViewChild, ElementRef, OnInit} from '@angular/core';
// import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter, TemplateRef} from '@angular/core';
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
    ) {  }

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

  onLoginEvent(event) {
    console.log('LOGIN EVENT : ' + event);
    this.userId = event;
    this.isAuth = true;
  }

  onRegisterEvent(event) {
    this.userId = event;
    localStorage.setItem('login', event);
    this.isAuth = true;
  }

  onGeneralDisconnectEvent(event) {
    this.isAuth = false;
  }
}

