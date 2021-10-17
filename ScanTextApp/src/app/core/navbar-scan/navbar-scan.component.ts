import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformacoesUsuario } from '../../shared/models/informacoes-usuario';

@Component({
  selector: 'app-navbar-scan',
  templateUrl: './navbar-scan.component.html',
  styleUrls: ['./navbar-scan.component.css']
})
export class NavbarScanComponent implements OnInit {

  loading: boolean = false;
  nomeUsuarioLogado: string;
  isMobile: boolean = false;
  informacoesUsuario: InformacoesUsuario;

  constructor(private router: Router) {
    this.informacoesUsuario = new InformacoesUsuario();
  }

  ngOnInit() {
    this.getNomeUsuarioLogado();
    this.isMobile = this.getIsMobile();
  }

  navigateTo(rota: string) {
    this.router.navigate(['/'+rota]);
  }

  logout() {
    this.Loading();
    if(window.localStorage.getItem('token-scan'))
      window.localStorage.removeItem('token-scan');
    this.router.navigate(['login']);
    this.Loading();
  }

  Loading() {
    this.loading = !this.loading;
  }

  getNomeUsuarioLogado() {
    let token = JSON.parse(localStorage.getItem("token-scan"));
    this.nomeUsuarioLogado = token.nomeCompleto.split(" ")[0];
  }

  getIsMobile() {
    return (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
  }
}
