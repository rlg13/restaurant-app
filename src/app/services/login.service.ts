import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Eliminar en la conexion con Back
export class User {
  constructor(public username: string, public password: string) { }
}
const users = [
  new User('movidas', '1234'),
  new User('pepe', '1234')
];
// Seria valido.
@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor(private _router: Router) { }

  logout(): void {
    localStorage.removeItem('user');
    this._router.navigate(['login']);
  }

  login(user: User): boolean {
    const authenticatedUser = users.find(u => u.username === user.username); // subscricion al backend
    if (authenticatedUser && authenticatedUser.password === user.password) {
      localStorage.setItem('user', authenticatedUser.username);
      this._router.navigate(['search']);
    }
    return false;
  }

   checkCredentials() {
    if (localStorage.getItem('user') === null) {
        this._router.navigate(['login']);
    }
  }

  getUsername() {
    return localStorage.getItem('user');

  }
  createUser(newUser: User) {
    users.push(newUser);// Llamada Backend para creacion del nuevo usuario
  }

}
