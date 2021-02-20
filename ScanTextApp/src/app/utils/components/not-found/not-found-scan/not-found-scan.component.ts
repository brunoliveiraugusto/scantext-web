import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-scan',
  templateUrl: './not-found-scan.component.html',
  styleUrls: ['./not-found-scan.component.css']
})
export class NotFoundScanComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTo(router: string) {
    this.router.navigate([router]);
  }
}
