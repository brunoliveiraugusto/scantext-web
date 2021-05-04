import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { AtualizaSenha } from 'src/app/models/atualiza-senha';
import { UsuarioService } from 'src/app/services/usuario.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-atualizar-senha-scan',
  templateUrl: './atualizar-senha-scan.component.html',
  styleUrls: ['./atualizar-senha-scan.component.css']
})
export class AtualizarSenhaScanComponent implements OnInit {

  private atualizaSenha: AtualizaSenha = new AtualizaSenha();
  loading: boolean = false;

  constructor(private usuarioService: UsuarioService, private alertService: AlertService, 
    private router: Router, private activatedRouter: ActivatedRoute) { 
      this.activatedRouter.params.subscribe((params) => {
        this.atualizaSenha.token = params.token;
      });
  }

  ngOnInit() {
  }

  private atualizarSenha() {
    if(this.formularioPreenchido()) {
      this.Loading();
      this.usuarioService.post('atualizar-senha', this.atualizaSenha).subscribe((res) => {
        this.Loading();
        this.alertService.success("Senha atualizada com sucesso.");
        this.navigateTo('login');
      }, 
      (err) => {
        this.Loading();
        this.alertService.warning(err.error.errors[0].valor);
      });
    }
  }

  private formularioPreenchido(): boolean {
    if(isNullOrUndefined(this.atualizaSenha.username) || this.atualizaSenha.username == "") {
      this.alertService.warning("Por favor, informe o usuário.");
      return false;
    }

    if(isNullOrUndefined(this.atualizaSenha.senha) || this.atualizaSenha.senha == "") {
      this.alertService.warning("Por favor, informe a nova senha.");
      return false;
    }

    if(this.atualizaSenha.senha.length < 8) {
      this.alertService.warning("O campo Nova Senha deve conter no mínimo 8 caracteres.");
      return false;
    }

    if(isNullOrUndefined(this.atualizaSenha.confirmaSenha) || this.atualizaSenha.confirmaSenha == "") {
      this.alertService.warning("Por favor, confirme a senha.");
      return false;
    }

    if(this.atualizaSenha.confirmaSenha.length < 8) {
      this.alertService.warning("O campo Confirme a Senha deve conter no mínimo 8 caracteres.");
      return false;
    }

    if(this.atualizaSenha.senha !== this.atualizaSenha.confirmaSenha){
      this.alertService.warning("As senhas não correspondem.");
      return false;
    }

    return true;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  Loading() {
    this.loading = !this.loading;
  }
}
