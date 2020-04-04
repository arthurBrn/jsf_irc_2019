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

  allRooms = [];
  @Output() selectionnedChannel = new EventEmitter<String>();
  @Input() user;
  modalRef: BsModalRef;
  newChanel: string;
  connectedRooms = [];
  isAddingChannel = false;
  showModal = false;

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
         this._chatService.joinRoom({ 'pseudo': this.user.pseudo, 'room': datas[i].id, 'display': false});
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

  changeChannel(channel) {
    this.selectionnedChannel.emit(channel);
  }
  
  openModal(template: TemplateRef<any>) {
    this.showModal = true;
    this.modalRef = this.modalService.show(template);
  }

  onAddChanel() {
    if (this.newChanel) {
      this._apiService.insertChannel({ name: this.newChanel }).subscribe((data) => {
        let datas = data as any;
        this.joinNewChannel(datas.insertId, this.newChanel).then(() => {
          this.isAddingChannel = false;
          this.showModal = false;
          $('.modal-backdrop').remove();
          this.newChanel = '';
        });
      });
    }
    
  }

  searchChannel() {
    this.isAddingChannel = true;
    this._apiService.getChannels(this.user.id).subscribe((datas) => {
      let promise = new Promise((resolve, reject) => {
      let size = 0;
      for (let id in datas) {
        if(datas.hasOwnProperty(id)) size++;
      }
      resolve(size);
      });
      promise.then((size) => {
        for (let i = 0; i < size; i++) {
          this.allRooms.push({
            'id': datas[i].id,
            'name': datas[i].name,
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  joinChannel(room) {
    this.joinNewChannel(room.id, room.name).then(() => {
        this.isAddingChannel = false;
    });
  }

  joinNewChannel = (channelId, channelName) => {
    return new Promise((resolve, reject) => {
      const message = {
        'content': 'has joined the room',
        'channelId': channelId,
        'userId': this.user.id,
        'pseudo': this.user.pseudo,
        'date': new Date().toISOString()
      }
      this._apiService.sendMessage(message).subscribe();
      this.connectedRooms.push({ 'id': channelId, 'name': channelName, 'stared': 0 });
      this._chatService.joinRoom({ 'pseudo': this.user.pseudo, 'room': channelId, 'display': true });
      this._apiService.addJoinedChannel({ 'userId': this.user.id, 'channelId': channelId, 'stared': 0 }).subscribe((datas) => resolve());
    });
      
  }
}
