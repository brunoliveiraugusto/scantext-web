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
  @Input("btn-yes") btnYes: string;
  @Input("btn-no") btnNo: string;
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

  sendResponse(response: boolean) {
    this.response.emit(response);
  }

}
