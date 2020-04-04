import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() usr;
  @Output() userPseudo = new EventEmitter();
  @Output() userDisconnect = new EventEmitter();

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this._apiService.getUser(localStorage.getItem('login')).subscribe((data) => {
      console.log(localStorage.getItem('login'));
      this.usr = data[0].first_name;
      this.userPseudo.emit({'id': localStorage.getItem('login'), 'pseudo': data[0].first_name });
    });
  }

  changeUserInfo() {
    alert('Changing user info');
  }

  onUserDisconnect() {
    this.userDisconnect.emit(true);
  }
}
