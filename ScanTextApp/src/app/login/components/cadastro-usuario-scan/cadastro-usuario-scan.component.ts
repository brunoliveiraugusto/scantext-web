import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-cadastro-usuario-scan',
  templateUrl: './cadastro-usuario-scan.component.html',
  styleUrls: ['./cadastro-usuario-scan.component.css']
})
export class CadastroUsuarioScanComponent implements OnInit {

  usuario: Usuario;
  loading: boolean = false;
  indicaUsuarioExistente: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService, private alertService: AlertService) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  indicaUsuarioValido() {
    if(isNullOrUndefined(this.usuario.username)) {
      this.alertService.warning("O campo Usuário é obrigatório.");
      return false;
    }

    if(isNullOrUndefined(this.usuario.password)) {
      this.alertService.warning("O campo Senha é obrigatório.");
      return false;
    }

    if(this.usuario.password.length < 8) {
      this.alertService.warning("O campo Senha deve conter no mínimo 8 caracteres.");
      return false;
    }

    if(isNullOrUndefined(this.usuario.email)) {
      this.alertService.warning("O campo E-mail é obrigatório.");
      return false;
    }

    if(isNullOrUndefined(this.usuario.dataNascimento)) {
      this.alertService.warning("O campo Data de Nascimento é obrigatório.");
      return false;
    }

    return true;
  }

  criarUsuario() {
    if(this.indicaUsuarioValido()) {
      this.Loading();
      this.usuarioService.post('', this.usuario) 
      .subscribe((res) => {
        this.alertService.success("Usuário criado com sucesso.");
        this.Loading();
        this.navigateTo('login');
      }, (err) => {
        this.alertService.danger("Erro ao tentar criar um novo usuário.");
        this.Loading();
      });
    }
  }

  verificarUsuarioExistente() {
    if(isNullOrUndefined(this.usuario.username) || this.usuario.username == "") {
      this.indicaUsuarioExistente = false;
      return;
    }

    const query = this.getQuery();
    this.usuarioService.get(`verificar-usuario-existente${query}`)
    .subscribe((res) => {
      let indicaUsuarioExistente = res as any;
      this.indicaUsuarioExistente = indicaUsuarioExistente;
    });
  }

  getQuery() {
    return '?username='.concat(this.usuario.username);
  }

  public Loading() {
    this.loading = !this.loading;
  }

}
