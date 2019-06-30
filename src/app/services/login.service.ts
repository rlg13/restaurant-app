import { HttpClient } from '@angular/common/http';
import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { AbstractBaseService } from './abstract-base.service';
import { environment } from 'src/environments/environment';



// Eliminar en la conexion con Back
/*export class User {
  constructor(public username: string, public password: string) { }
}
const users = [
  new User('movidas', '1234'),
  new User('pepe', '1234')
];*/
// Seria valido.
@Injectable({
  providedIn: 'root'
})
export class LoginService extends AbstractBaseService<User> {

  public static USER_ENDPOINT = '/users';
  public static LOGIN_ENDPOINT = "/users/login";

  constructor(private _http: HttpClient, private _router: Router) {
    super(_http, environment.endpointURL + environment.endpointApi);
  }

  protected fromJson(json: any): User {
    const user: User = {
      id: json.id,
      name: json.name,
      password: json.password
    }
    return user;
  }

  protected toJson(item: User) {
    return {
      id: item.id,
      name: item.name,
      password: item.password
    }
  }
  logout(): void {
    localStorage.removeItem('user');
    this._router.navigate(['login']);
  }

  login(user: User): boolean {
    this._http.post<User>(`${this.endpointResource}${LoginService.LOGIN_ENDPOINT}`, this.toJson(user), { headers: this.headersHttp })
      .pipe(
        map((jsonResponse: any) => this.fromJson(jsonResponse))
      ).subscribe(data => {
        localStorage.setItem('user', data.name);
        this._router.navigate(['search']);
      });
    return false;
  }

  createNewUser(userCreate: User): string {
    let valueResponse = '';
    this.create(LoginService.USER_ENDPOINT, userCreate).subscribe(data => {
      userCreate = data;
      //Si todo Ok hacer el login con el nuevo usuario
      this.login(userCreate);
    },
      error => {
        if (error.status === 409) {
          valueResponse = 'login.DUPLICATE';
        } else {
          valueResponse = 'login.OTHER_ERRORS';
        }

      });
    return valueResponse;
  }



  checkCredentials() {
    if (localStorage.getItem('user') === null) {
      this._router.navigate(['login']);
    }
  }

  getUsername() {
    return localStorage.getItem('user');

  }

}
