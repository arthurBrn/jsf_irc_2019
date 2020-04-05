import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() chanels;
  @Input() pseudo;
  @Input() userId;
  @Output() selectionnedChannel = new EventEmitter<String>();
  channelId;
  @Output() userPseudo = new EventEmitter();
  user;
  @Output() newChannelEventFromSidebarToApp = new EventEmitter();
  @Output() generalDisconnectEvent = new EventEmitter();
  @Input() leaveChannelId;
  connectedRooms = [];

  constructor() { }

  ngOnInit() {
  }

  onChangeChannel(channel) {
    this.channelId = channel;
    this.selectionnedChannel.emit(channel);
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

  recoverConnectedRooms(event) {
    this.connectedRooms = event;
  }

}
