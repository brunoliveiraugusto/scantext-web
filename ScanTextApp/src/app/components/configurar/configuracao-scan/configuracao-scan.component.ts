import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { ArquivoIdioma } from 'src/app/models/arquivo-idioma';
import { LinguagemService } from 'src/app/services/linguagem.service';
import { ArquivoIdiomaService } from 'src/app/services/arquivo-idioma.service';
import { InformacoesUsuario } from 'src/app/models/informacoes-usuario';
import { isNullOrUndefined } from 'util';
import { ModalScanComponent } from 'src/app/utils/modal/modal-scan/modal-scan.component';
import { BodyTypeEnum } from 'src/app/utils/enums/body-type-enum';

@Component({
  selector: 'app-configuracao-scan',
  templateUrl: './configuracao-scan.component.html',
  styleUrls: ['./configuracao-scan.component.css']
})
export class ConfiguracaoScanComponent implements OnInit {

  arquivoIdioma: ArquivoIdioma;
  idiomaSelecionado: any;
  idiomas: any;
  loading: boolean = false;
  informacoesUsuario: InformacoesUsuario;
  arquivosIdioma: Array<ArquivoIdioma>;

  @ViewChild('modal', { static: false }) modal: ModalScanComponent;
  @ViewChild('modalBodyTemplate', { static: false }) modalBodyTemplate: TemplateRef<any>;
  nomeArquivoSelecionadoExclusao: string;
  idExclusaoArquivoIdioma: string;
  tituloModal: string = "Apagar Arquivo de Idioma";
  btnPrimary: string = "Sim";
  btnSecond: string = "Não";

  constructor(
    private linguagemService: LinguagemService, 
    private alertService: AlertService,
    private arquivoIdiomaService: ArquivoIdiomaService
  ) 
  { 
    this.arquivoIdioma = new ArquivoIdioma();
    this.informacoesUsuario = new InformacoesUsuario();
    this.arquivosIdioma = new Array<ArquivoIdioma>();
  }

  ngOnInit() {
    this.carregarIdiomas();
    this.carregarArquivosIdiomaCadastrados();
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
    this.arquivoIdioma.idIdioma = this.idiomas.filter((linguagem) => {
      return linguagem.id == event.id;
    })[0].id;
  }

  removerLinguagemSelecionada() {
    this.arquivoIdioma.idIdioma = null;
  }

  carregarIdiomas() {
    this.Loading();
    this.linguagemService.getAll('carregar-linguagens-sem-arquivos-associados').subscribe((res) => {
      this.idiomas = res.data;
      this.Loading();
    }, (err) => {
      this.Loading();
    });
  }

  selecionarArquivoIdioma(event: any) {
    if(event.target.files != null && event.target.files.length == 1) {
      var reader = new FileReader();
      reader.onloadend = (e) => {
        this.arquivoIdioma.arquivo = reader.result as string;
      }
      reader.readAsDataURL(event.target.files[0]);
    } 
    else if(event.target.files.length > 1) {
      this.alertService.warning("Selecione um arquivo por vez.");
    }
  }

  cadastrarArquivoIdioma() {
    if(this.indicaDadosArquivosIdiomaPreenchido()) {
      this.Loading();
      this.arquivoIdioma.idUsuario = this.informacoesUsuario.idUsuario;
      this.arquivoIdiomaService.post('', this.arquivoIdioma).subscribe(
      (res) => {
        this.alertService.success("O Arquivo de Idioma foi salvo com sucesso.");
        this.Loading();
        this.limparSelecaoIdiomaArquivo();
        this.carregarArquivosIdiomaCadastrados();
        this.carregarIdiomas();
      }, 
      (err) => {
        this.alertService.danger("Erro ao tentar salvar o Arquivo de Idioma, tente novamente.");
        this.Loading();
      });
    }
  }

  indicaDadosArquivosIdiomaPreenchido() {
    if(this.arquivoIdioma.idIdioma == null || this.arquivoIdioma.idIdioma == undefined) {
      this.alertService.warning("O campo Idioma é obrigatório.");
      return false;
    }

    if(isNullOrUndefined(this.arquivoIdioma.arquivo) || this.arquivoIdioma.arquivo == "") {
      this.alertService.warning("Por favor, selecione um arquivo.");
      return false;
    }

    return true;
  }

  Loading() {
    this.loading = !this.loading;
  }

  carregarArquivosIdiomaCadastrados() {
    this.arquivoIdiomaService.getAll().subscribe(
    (res) => {
      this.arquivosIdioma = res.data as Array<ArquivoIdioma>;
    });
  }

  apagarArquivoIdioma(id: string) {
    this.arquivoIdiomaService.delete("", id).subscribe(
    (res) => {
      this.alertService.success("O Arquivo de Idioma foi removido com sucesso.");
      this.carregarArquivosIdiomaCadastrados();
      this.carregarIdiomas();
    });
  }

  abrirModalRemocaoArquivoIdioma(id: string) {
    this.nomeArquivoSelecionadoExclusao = this.arquivosIdioma.find(x => x.id == id).idioma;
    this.modal.setContentBody(BodyTypeEnum.IsTemplate);
    this.modal.modalBodyTemplate = this.modalBodyTemplate;
    this.idExclusaoArquivoIdioma = id;
    this.modal.open();
  }

  processReponseModal(response: boolean) {
    this.modal.close();
    if(response) {
      this.apagarArquivoIdioma(this.idExclusaoArquivoIdioma);
    }
    else {
      this.idExclusaoArquivoIdioma = null;
      this.nomeArquivoSelecionadoExclusao = null;
    }
  }

  limparSelecaoIdiomaArquivo() {
    this.idiomaSelecionado = null;
    (<HTMLInputElement>document.getElementById("inputFileIdioma")).value = "";
  }
}
