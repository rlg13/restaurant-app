import { Component, OnInit } from '@angular/core';
import { LoginService, User } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user = new User('','');
  public opened = true;
  public errorMsg = '';

  constructor(private _service:LoginService) { }

  ngOnInit() {
  }

  login() {
    if(!this._service.login(this.user)){
        this.errorMsg = 'Failed to login';
    }
  }

 
}
