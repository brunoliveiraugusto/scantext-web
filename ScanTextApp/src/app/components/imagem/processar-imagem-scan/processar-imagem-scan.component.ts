import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { QrCode } from 'src/app/models/qr-code';
import { BodyTypeEnum } from 'src/app/utils/enums/body-type-enum';
import { RouterComponentsEnum } from 'src/app/utils/enums/router-components-enum';
import { ModalScanComponent } from 'src/app/utils/modal/modal-scan/modal-scan.component';
import { isNullOrUndefined } from 'util';
import { Imagem } from '../../../models/imagem';
import { ImagemService } from '../../../services/imagem.service';
import { LinguagemService } from '../../../services/linguagem.service';
import { ScanService } from '../../../services/scan.service';
import { Utils } from '../../../utils/models/utils';

@Component({
  selector: 'app-processar-imagem-scan',
  templateUrl: './processar-imagem-scan.component.html',
  styleUrls: ['./processar-imagem-scan.component.css']
})
export class ProcessarImagemScanComponent implements OnInit {

  public linguagens: any;
  public modelos: any;
  public dropdownSettings = {};
  public linguagemSelecionada: any = {};
  public modeloSelecionado: any;
  public imagem: Imagem;

  qrCode: QrCode = new QrCode();
  public mensagemModal: string;
  public tituloModal: string;

  @ViewChild('modalScan', {static: false}) modalScan: ModalScanComponent;

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
      let base64;
      var reader = new FileReader();
      const file = event.target.files[0];
      this.preencherInformacoesImagem(file);
      reader.onloadend = (e) => {
        base64 = reader.result as string;
        this.setBase64(base64);
      }
      reader.readAsDataURL(file);
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

    const imagemTesseract = this.obterDadosParaLeitura(this.imagem);
    this.scanService.post('ler-imagem', imagemTesseract)
    .subscribe((res) => {
      this.processarRespostaLeituraImagem(res.data);
    }, (err) => {
      this.alertService.danger("Erro ao processar a imagem.");
    })
    this.scrollToBottom();
  }

  processarRespostaLeituraImagem(imagem: Imagem) {
    this.imagem.meanConfidence = imagem.meanConfidence;
    this.imagem.texto = imagem.texto;
    if(this.imagem.meanConfidence <= 0 || isNullOrUndefined(this.imagem.texto)) {
      this.alertService.warning("Erro ao processar a imagem.");
    } else {
      this.scrollToBottom();
    }
  }

  obterDadosParaLeitura(imagem: Imagem): any {
    return { base64: imagem.base64, siglaLinguagem: imagem.linguagem.sigla };
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
      if(divBtnGravar)
        window.scrollTo({ top: divBtnGravar.scrollWidth, behavior: 'smooth' });
    }, 200);
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
    this.imagemService.post('', this.imagem)
    .subscribe((res) => {
      this.alertService.success("A imagem e os dados processados foram salvos com sucesso.");
      this.redirectTo(RouterComponentsEnum.RouterConsultaImagem);
    }, (error) => {
      this.alertService.danger("Erro ao salvar a imagem.");
    })
  }

  atualizarImagem() {
    this.imagemService.put('', this.imagem, this.imagem.id)
    .subscribe((res) => {
      this.alertService.success("A imagem e os dados processados foram atualizados com sucesso.");
      this.redirectTo(RouterComponentsEnum.RouterConsultaImagem);
    },(err) => {
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
    this.imagemService.getById('', id)
    .subscribe((res) => {
      let imagem = res as any;
      this.imagem = imagem;
      this.definirLinguagemSelecionada(imagem.linguagem);
      this.router.navigate([], { queryParams: null});
    });
  }

  definirLinguagemSelecionada(linguagem) {
    this.linguagemSelecionada = [{ id: linguagem.id, idioma: linguagem.idioma }];
  }

  copyText() {
    var range = document.createRange();
    range.selectNode(document.getElementById("text-img"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  }

  transformText() {
    let texto = this.imagem.texto;
    if(texto === this.imagem.texto.toUpperCase())
      this.imagem.texto = texto.toLowerCase();
    else
      this.imagem.texto = texto.toUpperCase();
  }

  redirectTo(router: string) {
    this.router.navigate([router]);
  }

  getQrCode() {
    this.qrCode.text = this.imagem.texto;
    this.scanService.post("gerar-qr-code/", this.qrCode).subscribe(
    (res) => {
      const qrCode = res.data;
      this.openQrCode(qrCode.code);
    }, (err) => {
      this.alertService.danger("Não foi possível gerar o QR Code do texto da imagem selecionada, tente novamente.");
    });
  }

  openQrCode(base64: string) {
    this.modalScan.setContentBody(BodyTypeEnum.IsBase64);
    this.mensagemModal = base64;
    this.tituloModal = `Texto QR Code - ${this.imagem.nome}`;
    this.modalScan.open();
  }
}
