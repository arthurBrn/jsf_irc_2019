import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() chanels;
  @Input() pseudo;
  @Output() selectionnedChannel = new EventEmitter<String>();
  @Output() userPseudo = new EventEmitter();
  user;
  @Output() newChannelEventFromSidebarToApp = new EventEmitter();
  @Output() generalDisconnectEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChangeChannel(channel) {
    this.selectionnedChannel.emit(channel.id);
  }

  onChangePseudo(user) {
    this.userPseudo.emit(user);
    this.user = user;
  }

  onNewChanel(ev) {
    console.log('New name : ' + ev + ' from sidebar component');
    this.newChannelEventFromSidebarToApp.emit(ev);
  }

  onDisconnectEvent(event) {
    if (event === true) {
      this.generalDisconnectEvent.emit(true);
    }
  }

}
