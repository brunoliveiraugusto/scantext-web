import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-perfil-usuario-scan',
  templateUrl: './perfil-usuario-scan.component.html',
  styleUrls: ['./perfil-usuario-scan.component.css'],
  providers: [DatePipe]
})
export class PerfilUsuarioScanComponent implements OnInit {

  usuario: Usuario;
  usuarioInfo = { perfilUsuario: null, idUsuario: null };
  indicaUsuarioExistente: boolean = false;
  loading: boolean = false;

  constructor(private usuarioService: UsuarioService, private datePipe: DatePipe, private alertService: AlertService) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.obterPerfilUsuario();
    this.obterIdUsuario();
    this.carregarDadosCadastroUsuario();
  }

  carregarDadosCadastroUsuario() {
    this.Loading();
    this.usuarioService.get("obter-dados-cadastro-usuario")
    .subscribe((res) => {
      this.usuario = res as any;
      this.formatarDataNascimento();
      this.Loading();
    });
  }

  formatarDataNascimento() {
    this.usuario.dataNascimento = this.datePipe.transform(this.usuario.dataNascimento, "yyyy-MM-dd") as any;
  }

  obterPerfilUsuario() {
    this.usuarioInfo.perfilUsuario = JSON.parse(localStorage.getItem("token-scan")).role;
  }

  obterIdUsuario() {
    this.usuarioInfo.idUsuario = JSON.parse(localStorage.getItem("token-scan")).id;
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
    return '?username='.concat(this.usuario.username).concat('&idUsuario=').concat(this.usuarioInfo.idUsuario);
  }

  indicaUsuarioValido() {
    if(isNullOrUndefined(this.usuario.username)) {
      this.alertService.warning("O campo Usuário é obrigatório.");
      return false;
    }

    if(isNullOrUndefined(this.usuario.nomeCompleto)) {
      this.alertService.warning("O campo Nome Completo é obrigatório.");
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

  atualizarDadosCadastroUsuario() {
    if(this.indicaUsuarioValido()) {
      this.Loading();
      this.usuarioService.put("atualizar-dados-cadastro-usuario/", this.usuario, this.usuarioInfo.idUsuario)
      .subscribe((res) => {
        this.alertService.success("Seus dados foram atualizados com sucesso.");
        this.Loading();
      }, (err) => {
        this.alertService.danger("Não foi possível atualizar seus dados, tente novamente.");
        this.Loading();
      });
    }
  }

  Loading() {
    this.loading = !this.loading;
  }
}
