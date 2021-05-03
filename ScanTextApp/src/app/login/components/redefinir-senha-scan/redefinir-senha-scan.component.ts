import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-redefinir-senha-scan',
  templateUrl: './redefinir-senha-scan.component.html',
  styleUrls: ['./redefinir-senha-scan.component.css']
})
export class RedefinirSenhaScanComponent implements OnInit {

  username: string;
  loading: boolean = false;
  contatos: Array<string>;
  
  mensagemModal: string;

  constructor(private usuarioService: UsuarioService, private alertService: AlertService, private router: Router) { }

  ngOnInit() {
  }

  redefinirSenha() {
    
  }

  verificarUsuarioExistente() {
    this.Loading();
    this.usuarioService.get(`obter-opcoes-contato-usuario-redefinicao-senha?username=${this.username}`).subscribe(
    (res) => {
      this.Loading();
      if(res.data == null) {
        this.alertService.warning("Não foi possível encontrar sua conta, verifique o usuário informado.");
      } else {
        this.atualizarListaContatosRedefinicaoSenha(res.data);
      }
    });
  }

  atualizarListaContatosRedefinicaoSenha(contatos: Array<string>) {
    this.contatos = contatos;
  }

  enviarEmailRedefinicaoSenha() {
    this.Loading();
    this.usuarioService.post(`enviar-email-redefinicao-senha?username=${this.username}`, null).subscribe(
    (res) => {
      this.Loading();
      this.alertService.success("E-mail enviado com sucesso.")
      this.navigateTo('login');
    }, 
    (err) => {
      this.Loading();
      this.alertService.danger(err.errors[0].valor);
    });
  }

  Loading() {
    this.loading = !this.loading;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
