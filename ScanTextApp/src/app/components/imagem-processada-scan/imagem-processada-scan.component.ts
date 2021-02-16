import { Component, OnInit } from '@angular/core';
import { ImagemService } from 'src/app/services/imagem.service';
import { PaginationFilter } from 'src/app/utils/models/pagination-filter';
import { DatePipe, PercentPipe } from '@angular/common';
import { Page } from 'src/app/utils/models/page';

@Component({
  selector: 'app-imagem-processada-scan',
  templateUrl: './imagem-processada-scan.component.html',
  styleUrls: ['./imagem-processada-scan.component.css'],
  providers: [DatePipe, PercentPipe]
})
export class ImagemProcessadaScanComponent implements OnInit {

  paginationFilter: PaginationFilter;
  loading: boolean = false;
  configDataTable: any;
  columnsDataTable: any;
  rows: any;
  page = new Page();

  constructor(private imagemService: ImagemService, 
      private datePipe: DatePipe, private percentPipe: PercentPipe) { 
    this.paginationFilter = new PaginationFilter();
    this.page.number = 1;
    this.page.limit = 5;
  }

  ngOnInit() {
    this.carregarImagensPaginacao(this.page);
  }

  carregarImagensPaginacao(page?: any) {
    this.showLoading();
    this.paginationFilter.page = page.offset + 1;
    this.imagemService.post('obter-imagens-paginacao', this.paginationFilter)
    .subscribe((res) => {
      this.paginationFilter = res as any;
      this.page.limit = this.paginationFilter.limit;
      this.page.number = this.paginationFilter.page - 1;
      this.page.total = this.paginationFilter.total;
      this.setRowsDatatable();
      this.showLoading();
    }, (err) => {
      this.showLoading();
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

  showLoading() {
    this.loading = !this.loading;
  }

  setColumnsDatatable() {
    return [
      { name: 'Nome Imagem' },
      { name: 'Formato' },
      { name: 'Tamanho' },
      { name: 'Assertividade' },
      { name: 'Idioma' },
      { name: 'Data Cadastro' }
    ];
  }
}
