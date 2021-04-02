import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-perfil-usuario-scan',
  templateUrl: './perfil-usuario-scan.component.html',
  styleUrls: ['./perfil-usuario-scan.component.css']
})
export class PerfilUsuarioScanComponent implements OnInit {

  usuario: Usuario;

  constructor() { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

}
