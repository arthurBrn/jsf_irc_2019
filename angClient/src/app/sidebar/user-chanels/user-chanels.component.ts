import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service'
import * as $ from 'jquery';

@Component({
  selector: 'app-user-chanels',
  templateUrl: './user-chanels.component.html',
  styleUrls: ['./user-chanels.component.css']
})
export class UserChanelsComponent implements OnInit {

  @Input() rooms;
  @Output() selectionnedChannel = new EventEmitter<String>();
  

  constructor( private _apiService: ApiService) { }

  ngOnInit() {
  }

  addChannelEvent() {
    this.renderAddChannelPopUp();
  }

  changeChannel(channel) {
    this.selectionnedChannel.emit(channel);
  }

  renderAddChannelPopUp() {
    this._apiService.insertChannel({'name': 'Millionaire', 'stared': '0'}).subscribe();
  }

  
}
