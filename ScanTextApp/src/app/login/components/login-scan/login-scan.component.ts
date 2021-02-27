import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { AlertService } from 'ngx-alerts';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';
import { Role } from '../../shared/role';

declare let $: any;

@Component({
  selector: 'app-login-scan',
  templateUrl: './login-scan.component.html',
  styleUrls: ['./login-scan.component.css']
})
export class LoginScanComponent implements OnInit {

  loading: boolean = false;
  dadosLogin: Login;

  constructor(private loginService: LoginService, private router: Router, private alertService: AlertService) { 
    this.dadosLogin = new Login();
  }

  ngOnInit() {
    //this.slideDown();
  }

  login() {
    if(this.indicaDadosLoginPreenchido()) {
      this.Loading();
      const resp = this.loginService.login(this.dadosLogin);

      resp.then((loginRealizado) => {
        if(loginRealizado) {
          this.router.navigate(['']);
        } else {
          this.alertService.warning("Usuário ou senha incorreto.");
          this.Loading();
        }
      });
    }  
  }

  Loading() {
    this.loading = !this.loading;
  }

  indicaDadosLoginPreenchido() {
    if(isNullOrUndefined(this.dadosLogin.username)) {
      this.alertService.warning("Informe o usuário.");
      return false;
    }

    if(isNullOrUndefined(this.dadosLogin.password)) {
      this.alertService.warning("Informe a senha.");
      return false;
    }

    return true;
  }

  slideDown() {
    $('.form-login').slideToggle(400);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
