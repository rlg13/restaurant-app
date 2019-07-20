import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './../../../services/login.service';
import { User } from './../../../model/user';
import { ConstantsRouter } from './../../../utils/constants-router';
import { ConstantsStorage } from './../../../utils/constants-storage';
import { CreateUserComponent } from './../create-user/create-user.component';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.scss']
})
export class MainLoginComponent implements OnInit {

  @ViewChild('createUser', { static: true }) createUser: CreateUserComponent;

  public user = new User({});
  public opened = true;
  public showError = false;
  public errorCreateUser = false;
  public textError: string;

  loginForm = new FormGroup({
    user:
      new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      })
  });

  constructor(private service: LoginService, private router: Router) { }

  ngOnInit(): void { }

  login(): void {
    this.user = new User({ name: this.loginForm.value.user.username, password: this.loginForm.value.user.password });
    this.service.login(this.user).subscribe(data => {
      localStorage.setItem(ConstantsStorage.USER, data.name);
      localStorage.setItem(ConstantsStorage.USER_ID, data.id);
      localStorage.setItem(ConstantsStorage.AUTHORIZATION, data.sessionId);
      this.router.navigate([ConstantsRouter.SEARCH]);
    },
      error => {
        this.textError = 'LOGIN.ERROR';
        this.showError = true;
      });
  }

  newUserOpen(): boolean {
    this.createUser.showNewUserModal = true;
    this.createUser.newUserForm.patchValue({
      userCreate: {
        username: this.loginForm.value.user.username,
        password: ''
      }
    });
    return false;
  }

  userToCreate(user: User): void {
    this.service.createNewUser(user).subscribe(data => {
      this.loginForm.patchValue({
        user: {
          username: user.name,
          password: user.password
        }
      });
      this.login();
    },
      error => {
        if (error.status === 409) {
          this.textError = 'LOGIN.DUPLICATE';
        } else {
          this.textError = 'LOGIN.OTHER_ERRORS';
        }
      });
    if (this.textError !== '') {
      this.showError = true;
    }
  }
}
