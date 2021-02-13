import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-title-scan',
  templateUrl: './page-title-scan.component.html',
  styleUrls: ['./page-title-scan.component.css']
})
export class PageTitleScanComponent implements OnInit {

  @Input("page-name") pageName: string;
  @Input("icon") icon: string;

  constructor() { }

  ngOnInit() {
  }

}
