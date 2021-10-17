import { Component, OnInit, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { BodyTypeEnum } from '../../../shared/enums/body-type-enum';

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
  @Input("show-btn-yes") showBtnYes: boolean = true;
  @Input("show-btn-no") ShowBtnNo: boolean = true;
  @Output("response") response = new EventEmitter<boolean>();
  @ContentChild('modalBodyTemplate', { static: false }) modalBodyTemplate: TemplateRef<any>;

  bodyIsBase64: boolean = false;
  bodyIsText: boolean = false;
  bodyIsTemplate: boolean = false;

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

  setContentBody(bodyType: BodyTypeEnum) {
    switch(bodyType) {
      case BodyTypeEnum.IsText:
        this.bodyIsBase64 = false;
        this.bodyIsTemplate = false;
        this.bodyIsText = true;
        break;
      case BodyTypeEnum.IsBase64:
        this.bodyIsBase64 = true;
        this.bodyIsTemplate = false;
        this.bodyIsText = false;
        break;
      case BodyTypeEnum.IsTemplate:
        this.bodyIsBase64 = false;
        this.bodyIsTemplate = true;
        this.bodyIsText = false;
        break;
    }
  }

}
