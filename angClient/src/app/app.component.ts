import { Component, ViewChild, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit{

  selectionnedChannel;
  userPseudo;
  isAuth: boolean = false;
  userId: String;
  leaveChannelId;

  constructor( ) { }

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
  }4

  onLoginEvent(event) {
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

