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
<<<<<<< HEAD
=======
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
          this.rooms.push({
            'id': datas[i].id,
            'name': datas[i].name,
           'stared': datas[i].stared
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    });
>>>>>>> 2ac36d23... [Add] Display channels
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
      this.connectedRooms.push(channel.id);
      this._chatService.joinRoom(this.user.pseudo, channel.id);
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
