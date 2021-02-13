import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-scan',
  templateUrl: './navbar-scan.component.html',
  styleUrls: ['./navbar-scan.component.css']
})
export class NavbarScanComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTo(rota: string) {
    this.router.navigate(['/'+rota]);
  }

}
