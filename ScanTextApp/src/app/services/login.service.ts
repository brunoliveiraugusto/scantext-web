import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseHttpService<any> {

  constructor(http: HttpClient) { 
    super(http, 'login')
  }

  async login(dadosLogin: Login) {
    return new Promise<boolean>((resolve) => {
      this.post('login', dadosLogin)
      .subscribe((res) => {
        this.setTokenLocalStorage(res);
        resolve(true);
      }, (err) => {
        resolve(false);
      });
    })
  }

  setTokenLocalStorage(token: any) {
    localStorage.setItem("token-scan", JSON.stringify(token));
  }
}
