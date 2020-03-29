import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../Model/User';

@Component({
  selector: 'app-user-sidebar-info',
  templateUrl: './user-sidebar-info.component.html',
  styleUrls: ['./user-sidebar-info.component.css']
})
export class UserSidebarInfoComponent implements OnInit {

  @Input() usr: User;

  constructor() { }

  ngOnInit() {
  }

  changeUserInfo() {
    alert('Changing user info');
  }
}
