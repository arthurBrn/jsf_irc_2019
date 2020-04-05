import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() usr;
  @Output() userPseudo = new EventEmitter();
  @Output() userDisconnect = new EventEmitter();
  modalRef: BsModalRef;
  newPseudo: string;

  constructor(
    private _apiService: ApiService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this._apiService.getUser(localStorage.getItem('login')).subscribe((data) => {
      this.usr = data[0].first_name;
      this.userPseudo.emit({'id': localStorage.getItem('login'), 'pseudo': data[0].first_name });
    });
  }

  openChangeUserPseudoModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onChangePseudoEvent(template: TemplateRef<any>) {
    this.modalService.hide(1);
  }

  onUserDisconnect() {
    localStorage.removeItem('login');
    this.userDisconnect.emit(true);
  }
}
