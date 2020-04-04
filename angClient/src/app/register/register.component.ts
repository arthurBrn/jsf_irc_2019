import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() registerEmittedValue = new EventEmitter();
  regFirstName: string;
  regLastName: string;
  regEmail: string;
  regPassword: string;


  constructor(
    private _apiService: ApiService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
  }

  register() {
    if (this.regEmail && this.regPassword && this.regFirstName && this.regLastName) {
      const today = new Date().toISOString();
      const user = {
        first_name: this.regFirstName,
        last_name: this.regLastName,
        email: this.regEmail,
        password: this.regPassword,
        createdAt: today
      }
      this._apiService.register(user).subscribe((data) => {
        var parsedDatas = data as any;
        if(parsedDatas.code == 200) {
          // this.loginEmail = this.regEmail;
          // this.loginPassword = this.regPassword;
          // this.login();
          this.registerEmittedValue.emit(parsedDatas.userId);
        } else {
          this.toastrService.warning(parsedDatas.success);
        }
      });
    } else {
      this.toastrService.warning('Please fill all fields to register');
    }
  }
}
