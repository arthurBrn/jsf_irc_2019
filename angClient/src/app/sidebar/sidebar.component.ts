import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() roomsList;
  myvar = [];
  try = this.logRoomList();

  constructor() { }

  ngOnInit() {
  }

  logRoomList() {
    console.log('ROOM LIST');
    this.myvar = this.roomsList;
    console.log(this.myvar);
    console.log(this.roomsList);
  }
}
