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

  constructor() { }

  ngOnInit() {
  }

  onChangeChannel(channel) {
    this.selectionnedChannel.emit(channel.id);
  }

  onChangePseudo(user) {
    this.userPseudo.emit(user);
  }

}
