import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { isNullOrUndefined } from 'util';
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
  public loading: boolean = false;

  constructor(private linguagemService: LinguagemService, private scanService: ScanService,
      private alertService: AlertService) { 
    this.imagem = new Imagem();
    this.setSettingsDropdown();
    this.carregarLinguagens();
  }

  ngOnInit() {
  }

  private selecionarImagem(event) {
    if(event.target.files != null && event.target.files.length == 1) {
      this.Loading();
      let base64;
      var reader = new FileReader();
      this.preencherInformacoesImagem(event.target.files[0]);
      reader.onloadend = (e) => {
        base64 = reader.result as string;
        this.setBase64(base64);
        this.Loading();
      }
      reader.readAsDataURL(event.target.files[0]);
    } 
    else if(event.target.files.length > 1) {
      this.alertService.warning("Selecione uma imagem por vez.");
    }
  }

  preencherInformacoesImagem(imagem: any) {
    this.imagem.formato = this.formatarTipoImagem(imagem.type);
    this.imagem.size = imagem.size;
    this.imagem.nome = imagem.name;
  }

  formatarTipoImagem(tipo: string) {
    let splitTipo = tipo.split("/");
    return "imagem/".concat(splitTipo[1]);
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

  selecionarLinguagemDropdown(event: any) {
    this.imagem.linguagem = this.linguagens.filter((linguagem) => {
      return linguagem.id == event.id;
    })[0];
  }

  lerImagem() {
    if(!this.indicaItensObrigatoriosSelecionados()) 
      return false;
    
    this.Loading();
    this.scanService.post('', this.imagem)
    .subscribe((res) => {
      let imagem = res as any;
      this.imagem = imagem;
      this.scrollToBottom();
      this.Loading();
    }, (err) => {
      this.Loading();
    })
    this.scrollToBottom();
  }

  indicaItensObrigatoriosSelecionados() {
    if(isNullOrUndefined(this.imagem.base64)) {
      this.alertService.warning("Selecione a Imagem.");
      return false;
    }

    if(isNullOrUndefined(this.imagem.linguagem)) {
      this.alertService.warning("Selecione o Idioma da Linguagem.");
      return false;
    }

    return true;
  }

  scrollToBottom() {
    setTimeout (() => {
      let divBtnGravar = document.getElementById("btn-gravar");
      window.scrollTo({ top: divBtnGravar.scrollWidth, behavior: 'smooth' });
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

  Loading() {
    this.loading = !this.loading;
  }

}
