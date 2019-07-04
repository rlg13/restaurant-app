import { Router } from '@angular/router';
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

  public user = new User({});
  public userCreate = new User({});
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
  constructor(private service: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    const passwordCypher = sha256(this.loginForm.value.user.password);
    this.user = new User({name: this.loginForm.value.user.username, password: passwordCypher});
    this.service.login(this.user).subscribe(data => {
      localStorage.setItem('user', data.name);
      this.router.navigate(['search']);
    },
      error => {
        this.showError = true;
      });
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
    this.userCreate = new User({name: this.newUserForm.value.userCreate.username, password: passwordCypher});


    this.service.createNewUser(this.userCreate).subscribe(data => {
      this.loginForm.patchValue({
        user: {
          username: this.newUserForm.value.userCreate.username,
          password: this.newUserForm.value.userCreate.password
        }
      });
      //Si todo Ok hacer el login con el nuevo usuario
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
      this.errorCreateUser = true;
    }
  }
  cancelCreateUser() {
    this.userCreate = new User({});
    this.showNewUserModal = false;
  }
}
