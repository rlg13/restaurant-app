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
export class LoginService {

  public static USER_ENDPOINT = '/users';
  public static LOGIN_ENDPOINT = "/users/login";

  constructor(private http: HttpClient, private router: Router) { }

  protected fromJson(json: any): User {
    const user: User = {
      name: json.name,
      password: json.password
    }
    return user;
  }

  protected toJson(item: User) {
    return {
      name: item.name,
      password: item.password
    }
  }
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${environment.endpointURL}${environment.endpointApi}${LoginService.LOGIN_ENDPOINT}`, this.toJson(user))
      .pipe(
        map((jsonResponse: any) => this.fromJson(jsonResponse))
      );
  }

  createNewUser(userCreate: User): Observable<User> {
    return this.http.post<User>(`${environment.endpointURL}${environment.endpointApi}${LoginService.USER_ENDPOINT}`, this.toJson(userCreate))
      .pipe(
        map((jsonResponse: any) => this.fromJson(jsonResponse))
      );
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
