import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Channels } from '../../Model/Channels';

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
    this.renderAddChannelPopUp();
  }

  renderAddChannelPopUp() {
    alert('Adding a channel');
  }
}
