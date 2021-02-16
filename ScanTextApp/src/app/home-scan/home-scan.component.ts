import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { isNullOrUndefined } from 'util';
import { Imagem } from '../models/imagem';
import { ImagemService } from '../services/imagem.service';
import { LinguagemService } from '../services/linguagem.service';
import { ScanService } from '../services/scan.service';
import { Utils } from '../utils/models/utils';

@Component({
  selector: 'app-home-scan',
  templateUrl: './home-scan.component.html',
  styleUrls: ['./home-scan.component.css']
})
export class HomeScanComponent implements OnInit {

  public linguagens: any;
  public modelos: any;
  public dropdownSettings = {};
  public linguagemSelecionada: any = {};
  public modeloSelecionado: any;
  public imagem: Imagem;
  public loading: boolean = false;

  constructor(private linguagemService: LinguagemService, 
      private scanService: ScanService,
      private alertService: AlertService,
      private imagemService: ImagemService,
      private router: Router,
      private activatedRoute: ActivatedRoute) { 
    this.imagem = new Imagem();
    this.obterIdImagem();
  }

  ngOnInit() {
    this.carregarLinguagens();
    this.preencherModelos();
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



  setSettingsDropdown(textField: string) {
    return {
      singleSelection: true,
      idField: 'id',
      textField: textField,
      searchPlaceholderText: 'Pesquise',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: 'Não há dados disponíveis',
      closeDropDownOnSelection: true
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
      if(this.imagem.meanConfidence <= 0 || isNullOrUndefined(this.imagem.texto)) {
        this.alertService.warning("Erro ao processar a imagem.");
      } else {
        this.scrollToBottom();
      }
      this.Loading();
    }, (err) => {
      this.Loading();
      this.alertService.danger("Erro ao processar a imagem.");
    })
    this.scrollToBottom();
  }

  indicaItensObrigatoriosSelecionados() {
    if(isNullOrUndefined(this.imagem.linguagem)) {
      this.alertService.warning("Selecione o Idioma da Imagem.");
      return false;
    }
    
    if(isNullOrUndefined(this.imagem.base64)) {
      this.alertService.warning("Selecione a Imagem.");
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

  preencherModelos() {
    this.modelos = [
      {id: 1, modelo: "Título de eleitor"},
      {id: 2, modelo: "CNH"},
      {id: 3, modelo: "Identidade"},
    ]
  }

  removerLinguagemSelecionada() {
    this.imagem.linguagem = null;
  }

  salvarImagem() {
    if(!this.indicaImagemValida()) {
      return false;
    }
    
    if(isNullOrUndefined(this.imagem.id) || Utils.idInvalido(this.imagem.id)) {
      this.gravarImagem();
    } 
    else {
      this.atualizarImagem();
    }
  }

  gravarImagem() {
    this.Loading();
    this.imagemService.post('', this.imagem)
    .subscribe((res) => {
      this.alertService.success("A imagem e os dados processados foram salvos com sucesso.");
      this.Loading();
    }, (error) => {
      this.alertService.danger("Erro ao salvar a imagem.");
      this.Loading();
    })
  }

  atualizarImagem() {
    this.Loading();
    this.imagemService.put('', this.imagem, this.imagem.id)
    .subscribe((res) => {
      this.alertService.success("A imagem e os dados processados foram atualizados com sucesso.");
      this.Loading();
    },(err) => {
      this.Loading();
      this.alertService.danger("Erro ao atualizar a imagem.");
    });
  }

  indicaImagemValida() {
    if(isNullOrUndefined(this.imagem.texto) || isNullOrUndefined(this.imagem.base64)) {
      this.alertService.warning("Selecione uma Imagem.");
      return false;
    }

    if(isNullOrUndefined(this.imagem.linguagem.id)) {
      this.alertService.warning("Selecione o Idioma da Imagem.");
      return false;
    }

    return true;
  }

  obterIdImagem() {
    this.activatedRoute.queryParams
    .subscribe((params) => {
        let idImagem = params['id'];
        if(idImagem)
          this.carregarImagemPorId(idImagem);
    });
  }

  carregarImagemPorId(id: string) {
    this.Loading();
    this.imagemService.getById('', id)
    .subscribe((res) => {
      let imagem = res as any;
      this.imagem = imagem;
      this.definirLinguagemSelecionada(imagem.linguagem);
      this.router.navigate([], { queryParams: null});
      this.Loading();
    });
  }

  definirLinguagemSelecionada(linguagem) {
    this.linguagemSelecionada = [{ id: linguagem.id, idioma: linguagem.idioma }];
  }
}
