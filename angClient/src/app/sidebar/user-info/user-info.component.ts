import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() usr;
  @Input() channel;
  @Output() userPseudo = new EventEmitter();
  @Output() userDisconnect = new EventEmitter();
  channelId;

  constructor(private _apiService: ApiService) { }

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

  changeUserInfo() {
    alert('Changing user info');
  }

  onUserDisconnect() {
    localStorage.removeItem('login');
    this.userDisconnect.emit(true);
  }
}
