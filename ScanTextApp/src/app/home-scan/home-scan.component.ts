import { Component, OnInit } from '@angular/core';
import { Imagem } from '../models/imagem';
import { LinguagemService } from '../services/linguagem.service';
import { ScanService } from '../services/scan.service';

@Component({
  selector: 'app-home-scan',
  templateUrl: './home-scan.component.html',
  styleUrls: ['./home-scan.component.css']
})
export class HomeScanComponent implements OnInit {

  public linguagens: any;
  public dropdownSettings = {};
  public linguagemSelecionada: any;
  public imagem: Imagem;

  constructor(private linguagemService: LinguagemService, private scanService: ScanService) { 
    this.imagem = new Imagem();
    this.setSettingsDropdown();
    this.carregarLinguagens();
  }

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
    this.imagem.base64 = base64;
  }

  carregarLinguagens() {
    this.linguagemService.getAll('').subscribe((res) => {
      this.linguagens = res;
    }, (err) => {});
  }

  setSettingsDropdown() {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'idioma',
      searchPlaceholderText: 'Pesquise',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }

  selecionarLinguagemDropdown() {
    
  }

  lerImagem() {
    this.scanService.post('', this.imagem)
    .subscribe((res) => {
      let imagem = res as any;
      this.imagem = imagem;
      this.scrollToBottom();
    }, (err) => {
      console.log(err);
    })
  }

  scrollToBottom() {
    setTimeout (() => {
      window.scrollTo({ top: 5000, behavior: 'smooth' });
    }, 200);
  }

  base64ToBuffer(base64: string) {
    let x = base64.split(",");
    let binary_string = window.atob(x[1]);
    let len = binary_string.length;
    let bytes = new ArrayBuffer(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    //this.imagem.buffer = bytes;
  }

}
