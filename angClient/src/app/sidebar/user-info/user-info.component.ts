import {Component, OnInit, Input, Output, EventEmitter, SimpleChange, TemplateRef} from '@angular/core';
import { ApiService } from '../../services/api.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ToastrService} from 'ngx-toastr';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() usr;
  @Input() channel;
  @Input() idUser;
  @Input() connectedRooms = [];
  @Output() userPseudo = new EventEmitter();
  @Output() userDisconnect = new EventEmitter();
  channelId = 0;
  modalRef: BsModalRef;
  oldPseudo: string;
  newPseudo: string;

  constructor(
    private _apiService: ApiService,
    private modalService: BsModalService,
    private toastrService: ToastrService,
    private _chatService: ChatService,
    ) { }

  ngOnInit() {
    this._apiService.getUser(localStorage.getItem('login')).subscribe((data) => {
      this.usr = data[0].first_name;
      this.userPseudo.emit({'id': localStorage.getItem('login'), 'pseudo': data[0].first_name });
    });
  }

  ngOnChanges(changes: SimpleChange) {
      for (let propName in changes) {
        let change = changes[propName];
        if (propName == 'channel' && change.currentValue !== undefined) {
          this.channelId = change.currentValue;
        }
      }
  }

  onUserDisconnect() {
    localStorage.removeItem('login');
    this.userDisconnect.emit(true);
  }

  /*rename() {
    if (this.user.match(/^[a-z" "A-Z0-9_.-]*$/)) {
      const datas = {
        oldName: this.oldName,
        newName: this.user,
        room: this.selectedRoom
      }
      this._chatService.rename(datas);
      for (const room of this.connected_rooms) {
        const persistDatas = {
          'content': 'renamed to ' + this.user,
          'channelId': room,
          'userId': this.userId,
          'pseudo': this.oldName,
          'date': new Date().toISOString()
        };
        this._apiService.sendMessage(persistDatas).subscribe((data) => console.log(data));
      }
      this.oldName = this.newName;
    } else {
      this.toastrService.warning('Please provide valide user name with letter, numbers, comma, point or dash');
    }
  }*/


  openChangeUserPseudoModal(template: TemplateRef<any>, pseudo) {
    this.modalRef = this.modalService.show(template);
    this.oldPseudo = pseudo;
  }

  onChangePseudoEvent() {
    if (this.newPseudo.match(/^[a-z" "A-Z0-9_.-]*$/)) {
      for (const room of this.connectedRooms) {
        const datas = {
          oldName: this.oldPseudo,
          newName: this.newPseudo,
          room: room.id
        }
        this._chatService.rename(datas);
        const persistDatas = {
          'content': 'renamed to ' + this.newPseudo,
          'channelId': room.id,
          'userId': localStorage.getItem('login'),
          'pseudo': this.oldPseudo,
          'date': new Date().toISOString()
        };
        this._apiService.sendMessage(persistDatas).subscribe((data) => console.log(data));
      }
      this.userPseudo.emit(this.newPseudo);
      this.usr = this.newPseudo;
    } else {
      this.toastrService.warning('Please provide valide user name with letter, numbers, comma, point or dash');
    }
  }
}
