import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-scan',
  templateUrl: './navbar-scan.component.html',
  styleUrls: ['./navbar-scan.component.css']
})
export class NavbarScanComponent implements OnInit {

  loading: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTo(rota: string) {
    this.router.navigate(['/'+rota]);
  }

  logout() {
    this.Loading();
    if(window.localStorage.getItem('token-scan'))
      window.localStorage.removeItem('token-scan');
    this.router.navigate(['login']);
    this.Loading();
  }

  Loading() {
    this.loading = !this.loading;
  }
}
