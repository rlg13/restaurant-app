import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { map, flatMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

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
    }
    return user;
  }

  protected toJson(item: User) {
    return {
      id: item.id,
      name: item.name,
      password: item.password,
      sessionId: item.sessionId
    }
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



  checkCredentials() {
    if (localStorage.getItem('user') === null) {
      this.router.navigate(['login']);
    }
  }

  getUsername() {
    return localStorage.getItem('user');
  }

}
