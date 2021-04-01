import { Component, OnInit, ViewChild } from '@angular/core';
import { ImagemService } from 'src/app/services/imagem.service';
import { PaginationFilter } from 'src/app/utils/models/pagination-filter';
import { DatePipe, PercentPipe } from '@angular/common';
import { Page } from 'src/app/utils/models/page';
import { SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ModalScanComponent } from '../../../utils/modal/modal-scan/modal-scan.component';

declare let $: any;

@Component({
  selector: 'app-consulta-imagem-processada-scan',
  templateUrl: './consulta-imagem-processada-scan.component.html',
  styleUrls: ['./consulta-imagem-processada-scan.component.css'],
  providers: [DatePipe, PercentPipe]
})
export class ConsultaImagemProcessadaScanComponent implements OnInit {

  @ViewChild('modal', {static: false}) modal: ModalScanComponent;

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

  constructor(private imagemService: ImagemService, 
      private datePipe: DatePipe, private percentPipe: PercentPipe,
      private router: Router, private alertService: AlertService) { 
    this.paginationFilter = new PaginationFilter();
    this.page.number = 1;
    this.page.limit = 5;
  }

  ngOnInit() {
    $('.dropdown-toggle').dropdown();
    this.carregarImagensPaginacao(this.page);
  }

  ngAfterViewInit() {
    this.modal = new ModalScanComponent();
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

  validarExclusaoImagem(response: boolean) {
    if(response) {
      this.modal.close();
      this.excluirImagem();
    }
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
    this.modal.open();
  }
}
