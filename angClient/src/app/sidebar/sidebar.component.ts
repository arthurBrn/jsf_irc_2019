import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() chanels;
  @Input() pseudo;
  @Output() newChannelEventFromSidebarToApp = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onNewChanel(ev) {
    console.log('New name : ' + ev + ' from sidebar component');
    this.newChannelEventFromSidebarToApp.emit(ev);
  }

}
