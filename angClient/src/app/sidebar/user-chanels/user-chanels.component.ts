import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { ApiService } from '../../services/api.service'
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
  modalRef: BsModalRef;
  newChanel: string;

  constructor(
    private modalService: BsModalService,
    private _apiService: ApiService
  ) { }

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
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onAddChanel() {
    this.newChanelEvent.emit(this.newChanel);
  }
}
