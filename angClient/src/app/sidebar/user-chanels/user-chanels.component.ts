import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, TemplateRef } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { ChatService } from '../../services/chat.service'
import * as $ from 'jquery';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-chanels',
  templateUrl: './user-chanels.component.html',
  styleUrls: ['./user-chanels.component.css']
})
export class UserChanelsComponent implements OnInit {

  allRooms = [];
  @Output() selectionnedChannel = new EventEmitter<String>();
  @Output() outputConnectedRoomsEvent = new EventEmitter();
  @Input() user;
  @Input() leaveChannelId;
  modalRef: BsModalRef;
  newChanel: string;
  connectedRooms = [];
  isAddingChannel = false;
  showModal = false;
  nameOfChannelToRename;
  idOfChannelToRename;
  newChannelNameInput: string;

  constructor(
    private modalService: BsModalService,
    private _apiService: ApiService,
    private _chatService: ChatService,
    private toastrServcie: ToastrService,
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
        this.outputConnectedRoomsEvent.emit(this.connectedRooms);
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  ngOnChanges(changes: SimpleChange) {
    for (let propName in changes) {
      let change = changes[propName];
      if (propName == 'leaveChannelId' && change.currentValue !== undefined) {
          this.refreshChannelList();
        }
    }
  }

  onChangePseudo(user) {
    this.user.emit(user);
  }

  changeChannel(channel) {
    this.selectionnedChannel.emit(channel.id);
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

  onFavChannel(channel, stared) {
    this._apiService.favChannel({channelId: channel.id, userId: this.user.id, staredValue: stared}).subscribe();
    this.refreshChannelList();
  }

  onOpenModalChannelRemaining(template: TemplateRef<any>, channel) {
    this.modalService.show(template);
    this.idOfChannelToRename = channel.id;
    this.nameOfChannelToRename = channel.name;
  }

  onRenameChannel() {
    if (this.newChannelNameInput.match(/^[a-z" "A-Z0-9_.-]*$/)) {
      this.modalService.hide(1);
      this._apiService.renameChannel({channelName: this.newChannelNameInput, channelId: this.idOfChannelToRename}).subscribe();
    } else {
      this.toastrServcie.warning('Please provide valide channel name with letter, numbers, comma, point or dash');
    }
    this.refreshChannelList();
  }

  refreshChannelList() {
    this.connectedRooms = [];
    this._apiService.getJoinedChannel(localStorage.getItem('login')).subscribe((datas) => {
      let promise = new Promise((resolve, reject) => {
      let size = 0;
      for (let id in datas) {
        if(datas.hasOwnProperty(id)) size++;
      }
      resolve(size);
      });
      promise.then((result) => {
        for (let i = 0; i < result; i++) {
          this.connectedRooms.push({
            'id': datas[i].id,
            'name': datas[i].name,
            'stared': datas[i].stared
          });
        }
      });
    });
  }
}
