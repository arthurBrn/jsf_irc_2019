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

  rooms = [];
  @Output() selectionnedChannel = new EventEmitter<String>();
  @Input() user;
  modalRef: BsModalRef;
  newChanel: string;
  connectedRooms = [];
  isAddingChannel = false;

  constructor(
    private modalService: BsModalService,
    private _apiService: ApiService,
    private _chatService: ChatService
  ) { }

  ngOnInit() {
    this._apiService.getJoinedChannel(localStorage.getItem('login')).subscribe((datas) => {
      let promise = new Promise((resolve, reject) => {
      let size = 0;
      for (let id in datas) {
        if(datas.hasOwnProperty(id)) size++; 
      }
      resolve(size);
      });
      promise.then((size) => {
        for (let i = 0; i < size; i++) {
          this.connectedRooms.push({
            'id': datas[i].id,
            'name': datas[i].name,
           'stared': datas[i].stared
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  onChangePseudo(user) {
    this.user.emit(user);
  }

  addChannelEvent() {
    this.renderAddChannelPopUp();
  }

  changeChannel(channel) {
    this.selectionnedChannel.emit(channel);
  }

  renderAddChannelPopUp() {
    //this._apiService.insertChannel({'name': 'Millionaire', 'stared': '0'}).subscribe();
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onAddChanel() {
    this._apiService.insertChannel({ name: this.newChanel }).subscribe((data) => {
      let datas = data as any;
      this._chatService.joinRoom(this.user.pseudo, datas.insertId);
      this._apiService.addJoinedChannel({ 'userId': this.user.id, 'channelId': datas.insertId, 'stared': 0 }).subscribe();
      this.connectedRooms.push({ 'id': datas.insertId, 'name': this.newChanel, 'stared': 0 });
    });
    this.isAddingChannel = false;
  }

  searchChannel() {
    this.isAddingChannel = true;
  }
}
