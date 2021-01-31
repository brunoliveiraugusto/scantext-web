import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-scan',
  templateUrl: './home-scan.component.html',
  styleUrls: ['./home-scan.component.css']
})
export class HomeScanComponent implements OnInit {

  public base64: string;

  constructor() { }

  ngOnInit() {
  }

  private selecionarImagem(event) {
    if(event.target.files != null && event.target.files.length > 0) {
      let base64;
      var reader = new FileReader();
      reader.onloadend = (e) => {
        base64 = reader.result as string;
        this.setBase64(base64);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  public setBase64(base64: string) {
    this.base64 = base64;
  }

}
