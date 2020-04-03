import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() loginEventEmitter = new EventEmitter();
  loginData;
  loginEmail: string;
  loginPassword: string;
  constructor(
    private _apiService: ApiService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
  }

  login() {
    if (this.loginEmail && this.loginPassword) {
      this._apiService.login(this.loginEmail, this.loginPassword).subscribe((data ) => {
        var parsedDatas = data as any;
        if (parsedDatas.code === 200) {
          this.loginData = parsedDatas.userId;
          this.loginEventEmitter.emit(this.loginData);
        } else {
          this.toastrService.warning(parsedDatas.success);
        }
      });
    } else {
      this.toastrService.warning('Email or password can\'t be empty');
    }
  }

}
