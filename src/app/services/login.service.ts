import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from './../model/user';
import { ConstantsStorage } from './../utils/constants-storage';
import { ConstantsRouter } from '../utils/constants-router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public static USER_ENDPOINT = `${environment.endpointURL}${environment.endpointApi}/users`;
  public static LOGIN_ENDPOINT = `${environment.endpointURL}${environment.endpointApi}/users/login`;
  public static LOGOUT_ENDPOINT = `${environment.endpointURL}${environment.endpointApi}/users/logout`;

  constructor(private http: HttpClient, private router: Router) { }

  protected fromJson(json: any): User {
    const user: User = {
      id: json.id,
      name: json.name,
      password: json.password,
      sessionId: json.sessionId
    };
    return user;
  }

  protected toJson(item: User) {
    return {
      id: item.id,
      name: item.name,
      password: item.password,
      sessionId: item.sessionId
    };
  }

  logout(params: HttpParams): Observable<User> {
    return this.http.delete<User>(LoginService.LOGOUT_ENDPOINT, { params });
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(LoginService.LOGIN_ENDPOINT, this.toJson(user))
      .pipe(
        map((jsonResponse: any) => this.fromJson(jsonResponse))
      );
  }

  createNewUser(userCreate: User): Observable<User> {
    return this.http.post<User>(LoginService.USER_ENDPOINT, this.toJson(userCreate))
      .pipe(
        map((jsonResponse: any) => this.fromJson(jsonResponse))
      );
  }

  checkCredentials(): void {
    if (localStorage.getItem(ConstantsStorage.USER) === null) {
      this.router.navigate([ConstantsRouter.LOGIN]);
    }
  }

  getUsername(): string {
    return localStorage.getItem(ConstantsStorage.USER);
  }

}
