import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-chanels',
  templateUrl: './user-chanels.component.html',
  styleUrls: ['./user-chanels.component.css']
})
export class UserChanelsComponent implements OnInit {

  @Input() rooms;

  constructor() { }

  ngOnInit() {
  }

  addChannelEvent() {
    console.log(this.rooms);
    this.renderAddChannelPopUp();
  }

  renderAddChannelPopUp() {
    alert('Adding a channel');
  }
}
