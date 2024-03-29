import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ImagemService } from 'src/app/services/imagem.service';
import { PaginationFilter } from 'src/app/shared/models/pagination-filter';
import { DatePipe, PercentPipe } from '@angular/common';
import { Page } from 'src/app/shared/models/page';
import { SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ModalScanComponent } from '../../../shared/modal/modal-scan/modal-scan.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { BodyTypeEnum } from 'src/app/shared/enums/body-type-enum';

declare let $: any;

@Component({
  selector: 'app-consulta-imagem-processada-scan',
  templateUrl: './consulta-imagem-processada-scan.component.html',
  styleUrls: ['./consulta-imagem-processada-scan.component.css'],
  providers: [DatePipe, PercentPipe]
})
export class ConsultaImagemProcessadaScanComponent implements OnInit {

  @ViewChild('modal', { static: false }) modal: ModalScanComponent;
  @ViewChild('modalBodyTemplate', { static: false }) modalBodyTemplate: TemplateRef<any>;

  paginationFilter: PaginationFilter;
  loading: boolean = false;
  configDataTable: any;
  columnsDataTable: any;
  rows: any;
  page = new Page();
  SelectionType = SelectionType;
  rowSelected: any;
  columns: any[] = [
    { prop: 'nomeImagem' },
    { name: 'Formato' },
    { name: 'Tamanho' },
    { name: 'Assertividade' },
    { name: 'Idioma' },
    { name: 'Data Cadastro' }
  ];

  mensagemModal: string;
  tituloModal: string;
  btnPrimary: string;
  btnSecond: string;
  indicaEnvioEmail: boolean = false;

  public emailUsuario: string;

  constructor(private imagemService: ImagemService,
      private datePipe: DatePipe, private percentPipe: PercentPipe,
      private router: Router, private alertService: AlertService,
      private usuarioService: UsuarioService) {
    this.paginationFilter = new PaginationFilter();
    this.page.number = 1;
    this.page.limit = 5;
  }

  ngOnInit() {
    $('.dropdown-toggle').dropdown();
    this.carregarImagensPaginacao(this.page);
    this.carregarEmailUsuarioLogado();
  }

  sort(event) {
    this.page.sort = event.sorts[0].prop;
    this.page.ascendant = event.sorts[0].dir == "asc" ? true : false;
    this.carregarImagensPaginacao(this.page);
  }

  setFieldsSort() {
    this.paginationFilter.ascendant = this.page.ascendant;
    this.paginationFilter.sort = this.page.sort;
  }

  carregarImagensPaginacao(page?: any) {
    this.Loading();
    this.paginationFilter.page = page.offset + 1;
    this.setFieldsSort();
    this.imagemService.post('obter-imagens-paginacao-por-usuario', this.paginationFilter)
    .subscribe((res) => {
      this.paginationFilter = res as any;
      this.page.limit = this.paginationFilter.limit;
      this.page.number = this.paginationFilter.page - 1;
      this.page.total = this.paginationFilter.total;
      this.rowSelected = null;
      this.setRowsDatatable();
      this.Loading();
    }, (err) => {
      this.Loading();
    });
  }

  setRowsDatatable() {
    this.rows = this.paginationFilter.pages.map((imagem) => {
      return {
        nomeImagem: imagem.nome,
        formato: imagem.formato,
        tamanho: imagem.size + " KB",
        assertividade: this.percentPipe.transform(imagem.meanConfidence, "2.2-5"),
        idioma: imagem.linguagem.idioma,
        dataCadastro: this.datePipe.transform(imagem.dataCadastro, "dd-MM-yyyy"),
        id: imagem.id
      }
    });
  }

  Loading() {
    this.loading = !this.loading;
  }

  onSelect(event: any) {
    this.rowSelected = event.selected[0];
  }

  editarImagem() {
    this.router.navigate(['/processar-imagem'], { queryParams: { id: this.rowSelected.id }});
  }

  navigateTo(rota: string): void {
    this.router.navigate([rota]);
  }

  processReponseModal(response: any) {
    if(!this.indicaEnvioEmail && response) {
      this.excluirImagem();
    } else if(this.indicaEnvioEmail && response) {
      this.enviarDadosImagemEmail();
    }

    this.modal.close();
  }

  excluirImagem() {
    this.Loading();
    this.imagemService.delete("", this.rowSelected.id)
    .subscribe((res) => {
      this.alertService.success("A imagem foi removida com sucesso.");
      this.Loading();
      this.carregarImagensPaginacao(this.page);
      this.rowSelected = {};
    });
  }

  abrirModalExclusao() {
    this.modal.setContentBody(BodyTypeEnum.IsText);
    this.mensagemModal = "Confirma a exclusão da imagem selecionada?";
    this.tituloModal = "Excluir Imagem";
    this.btnPrimary = "Sim";
    this.btnSecond = "Não";
    this.indicaEnvioEmail = false;
    this.modal.open();
  }

  abrirModalEnvioEmail() {
    this.modal.setContentBody(BodyTypeEnum.IsTemplate);
    this.modal.modalBodyTemplate = this.modalBodyTemplate;
    this.tituloModal = "Enviar E-mail";
    this.btnPrimary = "Enviar";
    this.btnSecond = "Cancelar";
    this.indicaEnvioEmail = true;
    this.modal.open();
  }

  enviarDadosImagemEmail() {
    const idImagem = this.rowSelected.id;
    this.imagemService.post("enviar-email-imagem-processada/",  '"' + idImagem + '"')
    .subscribe((res) => {
      this.alertService.success("E-mail enviado com sucesso.");
    }, (err) => {
      this.alertService.danger("Erro ao enviar o e-mail, tente novamente.");
    });
  }

  carregarEmailUsuarioLogado() {
    this.usuarioService.getReponseString("obter-email-usuario-logado")
    .subscribe((res) => {
      this.emailUsuario = res as any;
    });
  }

  downloadImagem() {
    const imagem = this.paginationFilter.pages.find(x => x.id == this.rowSelected.id);
    if(imagem == null) {
      this.alertService.warning("Imagem não disponível para download.");
      return;
    }

    window.open(imagem.urlImagemBlob, "_blank");
  }
}
