import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { ArquivoIdioma } from 'src/app/models/arquivo-idioma';
import { LinguagemService } from 'src/app/services/linguagem.service';
import { ArquivoIdiomaService } from 'src/app/services/arquivo-idioma.service';
import { InformacoesUsuario } from 'src/app/models/informacoes-usuario';
import { isNullOrUndefined } from 'util';

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
        this.arquivoIdioma = new ArquivoIdioma();
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
}
