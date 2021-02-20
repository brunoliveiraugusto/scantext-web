import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-scan',
  templateUrl: './login-scan.component.html',
  styleUrls: ['./login-scan.component.css']
})
export class LoginScanComponent implements OnInit {

  loading: boolean = false;
  user = {
    username: null,
    password: null
  };

  constructor(private loginService: LoginService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
  }

  login() {
    this.Loading();
    const resp = this.loginService.login(this.user);    
    
    resp.then((data) => {
      if(data)
        this.router.navigate(['']);
      else 
        this.alertService.warning("Usuário ou senha incorreto.");
      this.Loading();
    });
  }

  Loading() {
    this.loading = !this.loading;
  }
}
