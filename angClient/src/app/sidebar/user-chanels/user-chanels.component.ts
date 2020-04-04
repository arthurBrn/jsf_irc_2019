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
    this.modalRef = this.modalService.show(template);
  }

  onAddChanel() {
    this._apiService.insertChannel({ name: this.newChanel }).subscribe((data) => {
      let datas = data as any;
      this._chatService.joinRoom({ 'pseudo': this.user.pseudo, 'room': datas.insertId, 'display': true });
      const message = {
        'content': 'has joined the room',
        'channelId': datas.insertId,
        'userId': this.user.id,
        'pseudo': this.user.pseudo,
        'date': new Date().toISOString()
      }
      this._apiService.sendMessage(message).subscribe();
      this._apiService.addJoinedChannel({ 'userId': this.user.id, 'channelId': datas.insertId, 'stared': 0 }).subscribe();
      this.connectedRooms.push({ 'id': datas.insertId, 'name': this.newChanel, 'stared': 0 });
    });
    this.isAddingChannel = false;
  }

  searchChannel() {
    this.isAddingChannel = true;
  }
}
