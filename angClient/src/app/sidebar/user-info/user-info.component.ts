import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() usr;

  constructor() { }

  ngOnInit() {
  }



  changeUserInfo() {
    alert('Changing user info');
  }

}
