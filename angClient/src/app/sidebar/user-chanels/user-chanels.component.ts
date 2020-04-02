import {Component, OnInit, Input, TemplateRef, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-user-chanels',
  templateUrl: './user-chanels.component.html',
  styleUrls: ['./user-chanels.component.css']
})
export class UserChanelsComponent implements OnInit {

  @Input() rooms;
  @Output() newChanelEvent = new EventEmitter();
  modalRef: BsModalRef;
  newChanel: string;

  constructor(
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
  }

  addChannelEvent() {
    console.log(this.rooms);
    this.renderAddChannelPopUp();
  }

  renderAddChannelPopUp() {
    alert('Adding a channel');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onAddChanel() {
    this.newChanelEvent.emit(this.newChanel);
  }
}
