import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { LoginService, User } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user = new User('', '');
  public userCreate = new User('', '');
  public opened = true;
  public showError = false;
  public showNewUserModal = false;


  loginForm = new FormGroup({ user:
    new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  });

  newUserForm = new FormGroup({ userCreate:
    new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  });
  constructor(private _service:LoginService) { }

  ngOnInit() {
  }

  login() {
    this.user = new User(this.loginForm.value.user.username, this.loginForm.value.user.password);
    if (!this._service.login(this.user)){
        this.showError = true;
    }
  }

  newUser(){
    this.showNewUserModal = true;
    this.newUserForm.patchValue({
        userCreate: {
          username: this.loginForm.value.user.username
        }
    });
    return false;
  }
  createUser() {
    //Comprobar si existe el usuario, de ser asi emitir mensaje de usuario existente
    //Llamar a creacion de usuario si todo OK
    this.userCreate = new User(this.newUserForm.value.userCreate.username, this.newUserForm.value.userCreate.password);
    this._service.createUser(this.userCreate);
    //Si todo Ok hacer el login con el nuevo usuario
    this._service.login(this.userCreate);
  }
  cancelCreateUser() {
    this.userCreate = new User('', '');
    this.showNewUserModal = false;
  }
}
