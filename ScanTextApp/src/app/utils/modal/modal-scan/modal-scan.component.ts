import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-modal-scan',
  templateUrl: './modal-scan.component.html',
  styleUrls: ['./modal-scan.component.css']
})
export class ModalScanComponent implements OnInit {

  @Input("title") title: string;
  @Input("text-body") textBody: string;
  @Input("text-body-is-base64") textBodyIsBase64: boolean = false;
  @Input("btn-yes") btnYes: string;
  @Input("btn-no") btnNo: string;
  @Input("show-btn-yes") showBtnYes: boolean = true;
  @Input("show-btn-no") ShowBtnNo: boolean = true;
  @Output("response") response = new EventEmitter<boolean>();

  constructor() { 
  }

  ngOnInit() {
  }

  open() {
    $('#myModal').modal('show');
  }

  close() {
    $('#myModal').modal('hide');
  }

  sendResponseBtnPrimary() {
    this.response.emit(true);
  }

  sendResponseBtnSecond() {
    this.response.emit(false);
  }

}
