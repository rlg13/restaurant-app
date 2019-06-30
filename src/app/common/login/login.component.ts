import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-login',
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user = new User(0, '', '');
  public userCreate = new User(0, '', '');
  public opened = true;
  public showError = false;
  public showNewUserModal = false;

  public errorCreateUser = false;
  public textError: string;

  loginForm = new FormGroup({
    user:
      new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      })
  });

  newUserForm = new FormGroup({
    userCreate:
      new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      })
  });
  constructor(private _service: LoginService) { }

  ngOnInit() {
  }

  login() {
    let passwordCypher = sha256(this.loginForm.value.user.password);
    this.user = new User(0, this.loginForm.value.user.username, passwordCypher);
    if (!this._service.login(this.user)) {
      this.showError = true;
    }
  }

  newUser() {
    this.showNewUserModal = true;
    this.newUserForm.patchValue({
      userCreate: {
        username: this.loginForm.value.user.username
      }
    });
    return false;
  }
  createUser() {
    const passwordCypher = sha256(this.newUserForm.value.userCreate.password);
    this.userCreate = new User(0, this.newUserForm.value.userCreate.username, passwordCypher);
    this.textError = this._service.createNewUser(this.userCreate);
    if (this.textError !== '') {
      this.errorCreateUser = true;
    }
  }
  cancelCreateUser() {
    this.userCreate = new User(0, '', '');
    this.showNewUserModal = false;
  }
}
