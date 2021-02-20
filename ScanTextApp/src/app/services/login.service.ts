import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: Array<any>;

  constructor() { 
    this.users = [{username: 'bruno.augusto', password: '12345678'}];
  }

  async login(user: any) {
    return new Promise<boolean>((resolve) => {
      if(user) {
        let isUserValid = this.users.some(u => u.username == user.username && u.password == user.password);
        if(isUserValid) {
          window.localStorage.setItem('token-scan','token2934');
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  }
}
