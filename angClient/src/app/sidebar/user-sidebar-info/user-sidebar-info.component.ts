import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-sidebar-info',
  templateUrl: './user-sidebar-info.component.html',
  styleUrls: ['./user-sidebar-info.component.css']
})
export class UserSidebarInfoComponent implements OnInit {

  @Input() userName;

  constructor() { }

  ngOnInit() {
  }

}
