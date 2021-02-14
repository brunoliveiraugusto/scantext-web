import { Component, OnInit } from '@angular/core';
import { ImagemService } from 'src/app/services/imagem.service';
import { PaginationFilter } from 'src/app/utils/models/pagination-filter';
import { DatePipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'app-imagem-processada-scan',
  templateUrl: './imagem-processada-scan.component.html',
  styleUrls: ['./imagem-processada-scan.component.css'],
  providers: [DatePipe, PercentPipe]
})
export class ImagemProcessadaScanComponent implements OnInit {

  imagens: Array<any>;
  paginationFilter: PaginationFilter;
  loading: boolean = false;
  configDataTable: any;
  columnsDataTable: any;
  rows: any;
  currentPage: number = 0;

  constructor(private imagemService: ImagemService, 
      private datePipe: DatePipe, private percentPipe: PercentPipe) { 
    this.paginationFilter = new PaginationFilter();
  }

  ngOnInit() {
    this.carregarImagensPaginacao();
  }

  carregarImagensPaginacao() {
    this.showLoading();
    this.imagemService.post('obter-imagens-paginacao', this.paginationFilter)
    .subscribe((res) => {
      this.paginationFilter = res as any;
      this.imagens = this.paginationFilter.pages;
      this.setRowsDatatable();
      this.showLoading();
    }, (err) => {
      this.showLoading();
    });
  }

  setRowsDatatable() {
    this.rows = this.imagens.map((imagem) => {
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

  setPage(event: any) {    
    if(event.offset > this.currentPage) {
      this.paginationFilter.skip += 5;
    } else if(event.offset < this.currentPage && this.currentPage > 0) {
      this.paginationFilter.skip -= 5;
    }
    this.currentPage = event.offset;
    this.carregarImagensPaginacao();
  }

  selectRow(event: any) {
    var teste = event;
  }
}
