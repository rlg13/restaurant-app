import { HttpClient } from '@angular/common/http';
import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { AbstractBaseService } from './abstract-base.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends AbstractBaseService<User> {

  public static USER_ENDPOINT = '/users';
  public static LOGIN_ENDPOINT = "/users/login";

  constructor(private http: HttpClient, private router: Router) {
    super(http, environment.endpointURL + environment.endpointApi);
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
    this.router.navigate(['login']);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.endpointResource}${LoginService.LOGIN_ENDPOINT}`, this.toJson(user), { headers: this.headersHttp })
      .pipe(
        map((jsonResponse: any) => this.fromJson(jsonResponse))
      );
  }

  createNewUser(userCreate: User): Observable<User> {
    return this.create(LoginService.USER_ENDPOINT, userCreate);
  }



  checkCredentials() {
    if (localStorage.getItem('user') === null) {
      this.router.navigate(['login']);
    }
  }

  getUsername() {
    return localStorage.getItem('user');

  }

}
