import { LoginService } from './../../../services/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateUserComponent } from './../create-user/create-user.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';

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

  ngOnInit() {
  }

  login() {
    const passwordCypher = this.loginForm.value.user.password;
    this.user = new User({ name: this.loginForm.value.user.username, password: passwordCypher });
    this.service.login(this.user).subscribe(data => {

      localStorage.setItem('user', data.name);
      localStorage.setItem('userId', data.id);
      localStorage.setItem('Authorization', data.sessionId);
      this.router.navigate(['search']);
    },
      error => {
        this.textError = 'login.ERROR';
        this.showError = true;
      });
  }

  newUserOpen() {
    this.createUser.showNewUserModal = true;
    this.createUser.newUserForm.patchValue({
      userCreate: {
        username: this.loginForm.value.user.username
      }
    });
    return false;
  }

  userToCreate(user: User) {


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
          this.textError = 'login.DUPLICATE';
        } else {
          this.textError = 'login.OTHER_ERRORS';
        }

      });

    if (this.textError !== '') {
      this.showError = true;
    }
  }
}
