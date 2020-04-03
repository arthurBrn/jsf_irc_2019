import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { ChatService } from '../../services/chat.service'
import * as $ from 'jquery';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-user-chanels',
  templateUrl: './user-chanels.component.html',
  styleUrls: ['./user-chanels.component.css']
})
export class UserChanelsComponent implements OnInit {

  @Input() rooms;
  @Output() selectionnedChannel = new EventEmitter<String>();
  @Output() newChanelEvent = new EventEmitter();
  @Input() user;
  modalRef: BsModalRef;
  newChanel: string;
  connectedRooms = [];

  constructor(
    private modalService: BsModalService,
    private _apiService: ApiService,
    private _chatService: ChatService
  ) { }

  ngOnInit() {
  }

  onChangePseudo(user) {
    this.user.emit(user);
  }

  addChannelEvent() {
    this.renderAddChannelPopUp();
  }

  changeChannel(channel) {
    this.selectionnedChannel.emit(channel);
    if (!this.connectedRooms.includes(channel.id)) {
        console.log(this.connectedRooms)
      this.connectedRooms.push(channel.id);
      //this._chatService.joinRoom(this.user.id, this.selectionnedChannel);
    }
  }

  renderAddChannelPopUp() {
    this._apiService.insertChannel({'name': 'Millionaire', 'stared': '0'}).subscribe();
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onAddChanel() {
    this.newChanelEvent.emit(this.newChanel);
  }
}
